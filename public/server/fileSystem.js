const fs = require('fs').promises; // Use fs.promises for async file operations
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
    optionsSuccessStatus: 204
  })
);

app.use(bodyParser.json());

async function saveData(filename, data) {
  try {
    const jsonData = JSON.stringify(data);
    const base64Data = Buffer.from(jsonData).toString('base64');
    await fs.writeFile(filename, base64Data);
  } catch (error) {
    console.error(`Error saving data to ${filename}: ${error.message}`);
  }
}

async function readData(filename) {
  try {
    // Log the file path
    console.log(`Attempting to read data from ${filename}`);

    const doesExist = await fs.stat(filename); // Check if the file exists
    if (!doesExist) {
      saveData(filename, {});
      throw new Error('File does not exist.');
    }

    const base64Data = await fs.readFile(filename, 'utf-8');
    const jsonData = Buffer.from(base64Data, 'base64').toString('utf-8');

    // Log the file content
    console.log(`Content of ${filename}:`, jsonData);

    return JSON.parse(jsonData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`File ${filename} not found.`);
    } else {
      console.error(`Error reading data from ${filename}: ${error.message}`);
    }
    return {}; // or handle the absence of the file appropriately
  }
}

app.get('/', (req, res) => {
  res.send(
    '<span style="text-align: center;">There is nothing here. Go to <a style="color: black;"  href="http://localhost:3000">port 300</a> for app, or see the following: <br /> <a style="color: black;"  href="http://localhost:3001/getData">getData</a> <br /> <a style="color: black;"  href="http://localhost:3001/getWorldData">getWorldData</a> <br /> <a style="color: black;"  href="http://localhost:3001/saveData">saveData</a> <br /> <a style="color: black;"  href="http://localhost:3001/updateData">updateData</a></span>'
  );
});

app.get('/getData', async (req, res) => {
  try {
    const data = await readData('data.airsave');
    console.log('Data: ', data);
    res.json(data);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getWorldData', async (req, res) => {
  try {
    if (!fs.stat('../world.airsaveinit')) {
      saveData('../world.airsaveinit', {
        airports: [
          'EPWA',
          'EPKK',
          'EPKT',
          'EDDM',
          'EDDF',
          'LSZH',
          'EGLL',
          'EGKK'
        ]
      });
      const data = await fs.readFile('../world.airsaveinit', 'utf-8');
      res.json(data);
    }

    const data = await fs.readFile('../world.airsaveinit', 'utf-8');
    //  check if file exists

    console.log('World Data: ', data);
    if (JSON.stringify(data) === '{}') {
      return;
    }
    res.json(data);
  } catch (error) {
    res.status(500).send('Internal Server Error' + error.message);
  }
});

app.post('/saveData', (req, res) => {
  const data = req.body;
  saveData('data.airsave', data);
  res.send('Data saved successfully');
});

app.post('/updateData', async (req, res) => {
  const { key, data } = req.body;
  try {
    let orig_data = await readData('../data.airsave');

    if (!orig_data.hasOwnProperty(key)) {
      orig_data[key] = {};
    }

    orig_data[key] = data;

    await saveData('../data.airsave', orig_data);

    res.send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addData', async (req, res) => {
  const { key, value } = req.body;
  try {
    let orig_data = await readData('../data.airsave');
    orig_data[key] = orig_data[key] || [];
    orig_data[key].push(value);

    await saveData('../data.airsave', orig_data);

    res.send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

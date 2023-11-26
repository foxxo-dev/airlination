const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Change the port as needed

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(
    '<span style="text-align: center;">There is nothing here. Go to <a style="color: black;"  href="http://localhost:3000">port 300</a> for app, or see the following: <br /> <a style="color: black;"  href="http://localhost:3001/getData">getData</a> <br /> <a style="color: black;"  href="http://localhost:3001/getWorldData">getWorldData</a> <br /> <a style="color: black;"  href="http://localhost:3001/saveData">saveData</a> <br /> <a style="color: black;"  href="http://localhost:3001/updateData">updateData</a></span>'
  );
});

app.get('/getData', (req, res) => {
  let data = {};
  if (fs.existsSync('data.airsave')) {
    const fileContent = fs.readFileSync('data.airsave', 'utf-8');
    console.log('GET DATA' + fileContent);
    if (fileContent.trim() !== '') {
      data = JSON.parse(fileContent);
    }
  }
  console.log(data);
  res.json(data);
});

app.get('/getWorldData', (req, res) => {
  let data = {};
  if (fs.existsSync('world.airsaveinit')) {
    const fileContent = fs.readFileSync('world.airsaveinit', 'utf-8');
    console.log('GET DATA' + fileContent);
    if (fileContent.trim() !== '') {
      data = JSON.parse(fileContent);
    }
  }
  console.log(data);
  res.json(data);
});

app.post('/saveData', (req, res) => {
  const data = req.body;
  console.log('SERVER' + data);
  fs.writeFileSync('data.airsave', JSON.stringify(data));
  console.log(data);
  res.send('Data saved successfully');
});

app.post('/updateData', (req, res) => {
  const { key, data } = req.body;
  console.log('SERVER', key, data);

  // Check the contents of the original data
  let orig_data = JSON.parse(fs.readFileSync('data.airsave', 'utf-8'));
  console.log('SERVER - Original Data:', orig_data);

  // Check if the key exists in the original data
  if (!orig_data.hasOwnProperty(key)) {
    orig_data[key] = {}; // Initialize key if it doesn't exist
  }

  // Update the data and log the result
  orig_data[key] = data;
  console.log('SERVER - Updated Data:', orig_data);

  // Write the updated data back to the file
  fs.writeFileSync('data.airsave', JSON.stringify(orig_data));

  res.send('Data saved successfully');
});

app.post('/addData', (req, res) => {
  const { key, value } = req.body;
  console.log('SERVER', key, value);

  // Read the contents of the original data
  let orig_data = {};
  if (fs.existsSync('data.airsave')) {
    const fileContent = fs.readFileSync('data.airsave', 'utf-8');
    console.log('SERVER - Original Data:', fileContent);
    if (fileContent.trim() !== '') {
      orig_data = JSON.parse(fileContent);
    }
  }

  // Ensure that the key is an array in the original data
  orig_data[key] = orig_data[key] || [];

  console.log(value);

  // Push the new data to the array
  orig_data[key].push(value);

  console.log('SERVER - Updated Data:', orig_data);

  // Write the updated data back to the file
  fs.writeFileSync('data.airsave', JSON.stringify(orig_data));

  res.send('Data saved successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

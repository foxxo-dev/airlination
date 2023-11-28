const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);
app.use(bodyParser.json());

function saveData(filename, data) {
  const jsonData = JSON.stringify(data);
  const base64Data = Buffer.from(jsonData).toString('base64');
  fs.writeFileSync(filename, base64Data);
}

function readData(filename) {
  if (fs.existsSync(filename)) {
    const base64Data = fs.readFileSync(filename, 'utf-8');
    const jsonData = Buffer.from(base64Data, 'base64').toString('utf-8');
    console.log('----------------- \n \n');
    console.log(JSON.parse(jsonData)); // Unexpected token this dosent work
    console.log('----------------- \n \n');
    return JSON.parse(jsonData);
  }
  return {};
}

app.get('/', (req, res) => {
  res.send(
    '<span style="text-align: center;">There is nothing here. Go to <a style="color: black;"  href="http://localhost:3000">port 300</a> for app, or see the following: <br /> <a style="color: black;"  href="http://localhost:3001/getData">getData</a> <br /> <a style="color: black;"  href="http://localhost:3001/getWorldData">getWorldData</a> <br /> <a style="color: black;"  href="http://localhost:3001/saveData">saveData</a> <br /> <a style="color: black;"  href="http://localhost:3001/updateData">updateData</a></span>'
  );
});

app.get('/getData', (req, res) => {
  const data = readData('data.airsave');
  console.log(data);
  res.json(data);
});

app.get('/getWorldData', (req, res) => {
  const data = readData('world.airsaveinit');
  console.log(data);
  res.json(data);
});

app.post('/saveData', (req, res) => {
  const data = req.body;
  console.log('SERVER', data);
  saveData('data.airsave', data);
  res.send('Data saved successfully');
});

app.post('/updateData', (req, res) => {
  const { key, data } = req.body;
  console.log('SERVER', key, data);

  let orig_data = readData('data.airsave');

  if (!orig_data.hasOwnProperty(key)) {
    orig_data[key] = {};
  }

  orig_data[key] = data;

  saveData('data.airsave', orig_data);

  res.send('Data saved successfully');
});

app.post('/addData', (req, res) => {
  const { key, value } = req.body;
  console.log('SERVER', key, value);

  let orig_data = readData('data.airsave');
  orig_data[key] = orig_data[key] || [];
  orig_data[key].push(value);

  saveData('data.airsave', orig_data);

  res.send('Data saved successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

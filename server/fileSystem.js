const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001; // Change the port as needed

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  })
);

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
  console.log('GOT REQUEST');
  const { key, value } = req.body;
  console.log({ key, value });
  let data = JSON.parse(fs.readFileSync('./data.airsave'));
  console.log('GOT DATA, keys current value is: ' + data[key]);
  data[key] = value;
  fs.writeFileSync('./data.airsave', JSON.stringify(data));
  data = JSON.parse(fs.readFileSync('./data.airsave'));
  console.log('GOT DATA, keys updated value is: ' + data[key]);
  res.send('Data updated successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

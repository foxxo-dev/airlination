const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3001; // Change the port as needed

app.use(express.json());
app.use(cors());

app.get('/getData', (req, res) => {
  if (!fs.existsSync('./data.json')) {
    fs.writeFileSync('./data.json', JSON.stringify({}));
  }
  const data = JSON.parse(fs.readFileSync('./data.json'));
  console.log(data);
  res.json(data);
});

app.post('/saveData', (req, res) => {
  const data = req.body;
  fs.writeFileSync('data.json', JSON.stringify(data));
  console.log(data);
  res.send('Data saved successfully');
});

app.post('/updateData', (req, res) => {
  const { key, value } = req.body;
  const data = JSON.parse(fs.readFileSync('./data.json'));
  data[key] = value;
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.send('Data updated successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

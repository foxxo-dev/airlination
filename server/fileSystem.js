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

app.get('/getData', (req, res) => {
  let data = {};
  if (fs.existsSync('data.json')) {
    const fileContent = fs.readFileSync('./data.json', 'utf-8');
    if (fileContent.trim() !== '') {
      data = JSON.parse(fileContent);
    }
  }
  console.log(data);
  res.json(data);
});

app.get('/saveData', async (req, res) => {
  const data = req.body;
  await fs.writeFileSync('data.json', JSON.stringify(data));
  console.log(data);
  res.send('Data saved successfully');
});

app.get('/updateData', (req, res) => {
  const { key, value } = req.body;
  const data = JSON.parse(fs.readFileSync('./data.json'));
  data[key] = value;
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.send('Data updated successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side...', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// Make it 1)sync (To be read once at the beginning) 2)Top-level code
// JSON.parse() => Converts json into JS object

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

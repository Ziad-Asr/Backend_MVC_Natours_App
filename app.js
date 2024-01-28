const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // A middleware (Make data sent from the user {body} be available in the {req} paramater)

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

app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    // Must be (async) here because it is inside a callback function (Event loop lecture)
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // Convert it into json before writing it
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

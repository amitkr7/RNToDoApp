import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>Initial Setup<h1>');
});

app.listen(8000, () => {
  console.log('Listening on Port 8000');
});

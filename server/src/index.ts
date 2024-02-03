import express from 'express';
import './db';
import Note from './models/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>Initial Setup<h1>');
});

app.post('/create', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    description: req.body.description,
  });

  await newNote.save();

  res.json({ message: 'Created Notes' });
});

app.listen(8000, () => {
  console.log('Listening on Port 8000');
});

import express from 'express';
import './db';
import Note, { NoteDocument } from './models/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<h1>Initial Setup<h1>');
});

interface IncomingBody {
  title: string;
  description?: string;
}

app.post('/create', async (req, res) => {
  //   const newNote = new Note<NoteDocument>({
  //     title: (req.body as IncomingBody).title,
  //     description: (req.body as IncomingBody).description,
  //   });

  //   await newNote.save();

  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.json({ message: 'Created Notes' });
});

app.listen(8000, () => {
  console.log('Listening on Port 8000');
});

import express from 'express';
import './db';
import Note, { NoteDocument } from './models/note';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.patch('/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const { title, description } = req.body as IncomingBody;

  //   const note = await Note.findById(noteId);
  //   title && (note.title = title);
  //   description && (note.description = description);

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: 'No Note found' });

  await note.save();

  res.json({ note });
});

app.delete('/:noteId', async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await Note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: 'No Note found for this Id' });

  return res.json({ message: 'Note removed Successfully' });
});

app.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json({ notes });
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: 'No  Not found for this Id' });
  res.json({ note });
});

app.listen(8000, () => {
  console.log('Listening on Port 8000');
});

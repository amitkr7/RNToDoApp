import { RequestHandler } from 'express';
import Note, { NoteDocument } from '../models/note';

interface IncomingBody {
  title: string;
  description?: string;
}

export const addNote: RequestHandler = async (req, res) => {
  //   const newNote = new Note<NoteDocument>({
  //     title: (req.body as IncomingBody).title,
  //     description: (req.body as IncomingBody).description,
  //   });

  //   await newNote.save();

  const newNote = await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
};

export const updateNote: RequestHandler = async (req, res) => {
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
};

export const deleteSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await Note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: 'No Note found for this Id' });

  return res.json({ message: 'Note removed Successfully' });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({
    notes: notes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        description: note.description,
      };
    }),
  });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: 'No  Not found for this Id' });
  res.json({ note });
};

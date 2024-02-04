import { Router } from 'express';
import {
  addNote,
  deleteSingleNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from '../controllers/note';

const router = Router();

router.post('/create', addNote);

router.patch('/:noteId', updateNote);

router.delete('/:noteId', deleteSingleNote);

router.get('/', getAllNotes);

router.get('/:id', getSingleNote);

export default router;

import axios from 'axios';
import {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from 'react';
import NoteItem from './components/NoteItem';

const App = () => {
  const [notes, setNotes] = useState<
    { id: string; title: string; description?: string }[]
  >([]);
  const [values, setValues] = useState({ title: '', description: '' });
  const [selectedId, setSelectedId] = useState('');

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (selectedId) {
      const { data } = await axios.patch(
        'http://localhost:8000/note/' + selectedId,
        {
          title: values.title,
          description: values.description,
        }
      );

      const updatedNotes = notes.map((note) => {
        if (note.id === selectedId) {
          (note.title = data.note.title),
            (note.description = data.note.description);
        }
        return note;
      });
      setNotes([...updatedNotes]);
      setValues({ title: '', description: '' });
      return;
    }
    const { data } = await axios.post('http://localhost:8000/note/create', {
      title: values.title,
      description: values.description,
    });
    setNotes([data.note, ...notes]);
    setValues({ title: '', description: '' });
  };

  const handleNoteDelete = async (note: {
    id: string;
    title?: string;
    description?: string | undefined;
  }) => {
    const result = confirm('Are You Sure?');
    if (result) {
      await axios.delete('http://localhost:8000/note/' + note.id);
    }
    const updatedNotes = notes.filter(({ id }) => id !== note.id);
    setNotes([...updatedNotes]);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios('http://localhost:8000/note');
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);
  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      <form
        onSubmit={handleSubmit}
        className='shadow-md rounded p-5 space-y-6 bg-white'>
        <h1 className='font-semibold text-2xl text-center'>Note Application</h1>
        <div>
          <input
            type='text'
            className='w-full border-b-2 border-gray-700 outline-none '
            placeholder='Title'
            name='title'
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            name='description'
            className='w-full border-b-2 border-gray-700 outline-none resize-none h-36'
            placeholder='Description'
            value={values.description}
            onChange={handleChange}></textarea>
        </div>
        <div className='text-right'>
          <button className='bg-blue-500 text-white px-5 py-2 rounded'>
            Submit
          </button>
        </div>
      </form>
      {notes.map((note) => {
        return (
          <NoteItem
            onEditClick={() => {
              setValues({
                title: note.title,
                description: note.description || '',
              });
              setSelectedId(note.id);
            }}
            title={note.title}
            key={note.id}
            onDeleteClick={() => handleNoteDelete(note)}
          />
        );
      })}
    </div>
  );
};

export default App;

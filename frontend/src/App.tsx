import axios from 'axios';
import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import NoteItem from './components/NoteItem';

const App = () => {
  const [values, setValues] = useState({ title: '', description: '' });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/note/create', {
      title: values.title,
      description: values.description,
    });
  };
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

      <NoteItem title='Note Title' />
    </div>
  );
};

export default App;

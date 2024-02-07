import { FC } from 'react';

interface Props {
  title?: string;
}

const NoteItem: FC<Props> = ({ title }) => {
  return (
    <div className='shadow-md rounded p-5 space-y-4'>
      <div className='font-semibold text-gray-700 text-lg mb-4'>{title}</div>
      <div className='space-x-4'>
        <button className='bg-blue-500 text-white p-2 rounded'>View</button>
        <button className='bg-gray-700 text-white p-2 rounded'>Edit</button>
        <button className='bg-red-500 text-white p-2 rounded'>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;

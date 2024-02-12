import { FC } from 'react';
import Button from './Button';

interface Props {
  title?: string;
  onEditClick?(): void;
  onDeleteClick?(): void;
}

const NoteItem: FC<Props> = ({ title, onEditClick, onDeleteClick }) => {
  return (
    <div className='shadow-md rounded p-5 space-y-4'>
      <div className='font-semibold text-gray-700 text-lg mb-4'>{title}</div>
      <div className='space-x-4'>
        <Button
          name='View'
          type='primary'
          onClick={() => {
            console.log('View');
          }}
        />
        <Button name='Edit' type='secondary' onClick={onEditClick} />
        <Button name='Delete' type='danger' onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;

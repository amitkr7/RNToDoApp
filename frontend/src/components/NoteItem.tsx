import { FC } from 'react';
import Button from './Button';

interface Props {
  title?: string;
  description?: string;
  onEditClick?(): void;
  onDeleteClick?(): void;
  onViewClick?(): void;
}

const NoteItem: FC<Props> = ({
  title,
  description,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) => {
  return (
    <div className='shadow-md rounded p-5 space-y-4'>
      <div className='font-semibold text-gray-700 text-lg mb-4'>{title}</div>
      {description ? <div className='ml-2 mt-2'>{description}</div> : null}
      <div className='space-x-4'>
        <Button
          name={description ? 'Hide' : 'View'}
          type='primary'
          onClick={onViewClick}
        />
        <Button name='Edit' type='secondary' onClick={onEditClick} />
        <Button name='Delete' type='danger' onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;

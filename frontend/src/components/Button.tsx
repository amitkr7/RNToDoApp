import { FC } from 'react';

interface Props {
  name?: string;
  type?: 'primary' | 'secondary' | 'danger';
  onClick?(): void;
}
const Button: FC<Props> = ({ name, type, onClick }) => {
  let color = '';
  switch (type) {
    case 'primary':
      color = 'bg-blue-500';
      break;
    case 'secondary':
      color = 'bg-gray-700';
      break;
    case 'danger':
      color = 'bg-red-500';
      break;
    default:
      break;
  }

  return (
    <button
      className={`${color} text-white p-2 rounded w-20`}
      onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;

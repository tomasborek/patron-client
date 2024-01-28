import { type FC } from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'black' | 'ghost';
}

const Button: FC<IProps> = ({
  children,
  variant = 'primary',
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-md p-4 font-bold
      ${loading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''} ${
        variant === 'black' ? 'bg-black' : ''
      } ${
        variant === 'primary'
          ? 'bg-primary text-white shadow-sm hover:bg-primary-200'
          : ''
      } ${
        variant === 'ghost' ? 'text-text bg-transparent hover:bg-gray-200' : ''
      }`}
      {...props}
    >
      {loading ? 'Pracujeme na tom...' : children}
    </button>
  );
};

export default Button;

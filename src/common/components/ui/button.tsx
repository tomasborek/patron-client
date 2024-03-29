import { type FC } from 'react';
import Loading from './loading';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'black' | 'ghost' | 'neutral';
  small?: boolean;
}

const buttonStyles = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-200',
  black: 'bg-black text-white',
  ghost: 'text-text bg-transparent hover:bg-gray-200',
  neutral: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
};

const Button: FC<IProps> = ({
  children,
  variant = 'primary',
  loading = false,
  small = false,
  className,
  ...props
}) => {
  return (
    <button
      disabled={props.disabled ?? loading}
      className={`flex items-center justify-center gap-2 rounded-md transition ${
        buttonStyles[variant]
      } ${
        props.disabled ?? loading
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : ''
      } font-bold ${small ? 'px-4 py-2' : 'p-4'} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-4">
          <Loading color="#fff" size={28} />
          <p>Pracujeme na tom...</p>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

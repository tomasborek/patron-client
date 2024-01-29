import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: React.ReactNode | React.ReactNode[];
  error?: string;
}

const InputItem: FC<IProps> = ({ label, children, error, ...props }) => {
  return (
    <div className="flex w-full flex-col gap-2" {...props}>
      <p className="text-sm text-gray-600">{label}</p>
      {children}
      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-200 p-2 text-sm text-red-500">
          <FontAwesomeIcon icon="exclamation-circle" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default InputItem;

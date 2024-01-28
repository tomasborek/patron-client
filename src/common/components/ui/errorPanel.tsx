import { type FC } from 'react';
interface IProps {
  error?: string;
}
const ErrorPanel: FC<IProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="rounded-md bg-red-200 p-4">
      <p className="text-sm font-bold text-red-500">{error}</p>
    </div>
  );
};

export default ErrorPanel;

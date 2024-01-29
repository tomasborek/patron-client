import { type FC } from 'react';

interface IProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const DashboardWrapper: FC<IProps> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-600">{title}</h2>
      {children}
    </div>
  );
};

export default DashboardWrapper;

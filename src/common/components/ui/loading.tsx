'use client';
import { PuffLoader } from 'react-spinners';
import type { FC } from 'react';

interface IProps {
  centered?: boolean;
  color?: string;
  size?: number;
}
const Loading: FC<IProps> = ({
  centered = false,
  color = '#000',
  size = 48,
}) => {
  return (
    <div className={centered ? 'flex w-full items-center justify-center' : ''}>
      <PuffLoader color={color} size={size} />
    </div>
  );
};

export default Loading;

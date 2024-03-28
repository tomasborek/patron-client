import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Drawer from './drawer';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Dialog: FC<Props> = ({ open, setOpen, title, children }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [drawerMode, setDrawerMode] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDrawerMode(true);
    }
  }, []);
  if (drawerMode) {
    return (
      <Drawer open={open} setOpen={setOpen} title={title}>
        {children}
      </Drawer>
    );
  }
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ${
        open
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        ref={dialogRef}
        className={`max-h-700px w-full max-w-[750px] rounded-md bg-white shadow-md transition duration-300 ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3>{title}</h3>
          <div onClick={() => setOpen(false)} className="action sm">
            <FontAwesomeIcon icon="times" />
          </div>
        </header>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;

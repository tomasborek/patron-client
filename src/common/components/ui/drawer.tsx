import { useRef, type FC, useEffect } from 'react';
interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

const Drawer: FC<IProps> = ({ open, setOpen, children, title }) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (headerRef.current && headerRef.current.contains(e.target as Node)) ||
        (drawerRef.current && !drawerRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-50 bg-black bg-opacity-50 transition-all duration-300 ${
        open
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        ref={drawerRef}
        className={`absolute bottom-0 min-h-[500px] w-full rounded-t-md bg-white shadow-xl transition-all duration-300 ${
          open ? 'top-[200px]' : 'top-full'
        }`}
      >
        <div className="absolute left-1/2 top-4 h-[3px] w-[30px] -translate-x-1/2 rounded-full bg-gray-300"></div>
        <header ref={headerRef} className="border-b border-gray-200 p-4 pt-8">
          {title}
        </header>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

import { useGetMe } from '@/common/hooks/api/useGetMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type FC, useEffect, useRef } from 'react';
import { useInstitution } from '../contexts/InstitutionContext';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SelectInstitutionDialog from '@/modules/dashboard/components/SelectInstitutionDialog';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
interface ILink {
  title: string;
  href: string;
  icon: IconProp;
  restricted?: {
    user?: boolean;
    admin?: boolean;
    dev?: boolean;
  };
}

const LINKS: ILink[] = [
  {
    title: 'Domov',
    href: '/dashboard',
    icon: 'home',
  },
  {
    title: 'Historie',
    href: '/dashboard/logs',
    icon: 'clock',
  },
  {
    title: 'Instituce',
    href: '/dashboard/institution',
    icon: 'building',
    restricted: {
      user: true,
    },
  },
];

const BottomPanel: FC = () => {
  const pathname = usePathname();
  const { me } = useGetMe();
  const router = useRouter();
  const { logout } = useAuth();
  const { institution } = useInstitution();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const [institutionDialogOpen, setInstitutionDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target === bgRef.current) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <>
      <SelectInstitutionDialog
        open={institutionDialogOpen}
        setOpen={setInstitutionDialogOpen}
      />
      <div
        ref={bgRef}
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 bg-black bg-opacity-50 transition-all duration-300 ${
          sidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`duration-400 absolute bottom-0 right-[-250px] top-0 w-[250px] rounded-l-md bg-white shadow-xl transition-all ${
            sidebarOpen ? 'translate-x-[-250px]' : 'translate-x-0'
          }`}
        >
          <header className="flex items-center gap-4 border-b border-gray-200 p-4">
            <img src="/img/logo/logo.svg" className="w-[15px]" alt="logo" />
            <h3>PatronBox</h3>
          </header>
          <nav className="mt-4">
            <ul className="flex flex-col gap-2 px-2">
              {LINKS.filter(link => {
                if (me?.role === 'DEVELOPER' && link.restricted?.dev) {
                  return false;
                }
                if (institution?.role === 'ADMIN' && link.restricted?.admin) {
                  return false;
                }
                if (
                  me?.role === 'USER' &&
                  institution?.role !== 'ADMIN' &&
                  link.restricted?.user
                ) {
                  return false;
                }
                return true;
              }).map(link => (
                <Link key={link.href} href={link.href}>
                  <li
                    className={`flex w-full  cursor-pointer items-center gap-4 rounded-xl p-4 text-gray-600 transition-all  hover:bg-gray-200 ${
                      pathname === link.href ? 'bg-gray-200' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={link.icon as IconProp} />
                    <p>{link.title}</p>
                  </li>
                </Link>
              ))}
              <li
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-4 text-red-600 transition-all hover:bg-gray-200"
              >
                <FontAwesomeIcon icon="sign-out" />
                <p>Odhlásit se</p>
              </li>
            </ul>
          </nav>
          <div className="p-4">
            <button
              onClick={() => {
                setInstitutionDialogOpen(true);
                setSidebarOpen(false);
              }}
              className="flex w-full items-center gap-4 rounded-md border border-gray-200 bg-bg p-4 text-gray-600"
            >
              <FontAwesomeIcon icon={'building'} />
              {institution?.name ?? 'Vybrat institutci'}
              {institution?.role === 'ADMIN' ? (
                <FontAwesomeIcon icon="crown" />
              ) : null}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-4 left-4 right-4 rounded-xl bg-white  p-4 shadow-lg transition-all duration-300 md:hidden ${
          sidebarOpen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary text-white">
              <p className="font-bold uppercase">T</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {me?.email.slice(0, 20)}
                {me!.email.length > 20 && '...'}
              </p>
              <div className="flex items-center  gap-4 text-sm font-light text-gray-400">
                <p>{institution?.name ?? 'Žádná instituce'}</p>
              </div>
            </div>
            {me?.role === 'DEVELOPER' ? <FontAwesomeIcon icon="crown" /> : null}
          </div>
          <div onClick={() => setSidebarOpen(true)} className="action">
            <FontAwesomeIcon icon={'bars'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomPanel;

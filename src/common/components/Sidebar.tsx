import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState, type FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/common/components/ui/popover';
import { useGetMe } from '../hooks/api/useGetMe';
import Button from '@/common/components/ui/button';
import { useInstitution } from '../contexts/InstitutionContext';
import SelectInstitutionDialog from '@/modules/dashboard/components/SelectInstitutionDialog';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Sidebar: FC = () => {
  const { me } = useGetMe();
  const { logout } = useAuth();
  const router = useRouter();
  const { institution } = useInstitution();
  const [institutionDialogOpen, setInstitutionDialogOpen] =
    useState<boolean>(false);
  return (
    <>
      <SelectInstitutionDialog
        open={institutionDialogOpen}
        setOpen={setInstitutionDialogOpen}
      />
      <div className="flex min-h-screen min-w-[300px] flex-col justify-between border-r-[1px] border-gray-200 bg-gray-100 pt-8 shadow-sm">
        <div>
          <header className="border-b-[1px] border-gray-200 pb-8 pl-8">
            <img
              className="w-[40px] drop-shadow-xl"
              src="/img/logo/logo.svg"
              alt="logo"
            />
          </header>
          <nav className="pt-8">
            <ul className="flex flex-col gap-2 px-2">
              <li className="w-full cursor-pointer rounded-xl p-4 text-gray-600 transition-all  hover:bg-gray-200">
                <Link
                  href="/dashboard"
                  className="flex w-full items-center gap-4"
                >
                  <FontAwesomeIcon icon={'home'} />
                  <p>Domov</p>
                </Link>
              </li>
              <li className="w-full cursor-pointer rounded-xl p-4 text-gray-600 transition-all  hover:bg-gray-200">
                <Link
                  href="/dashboard/logs"
                  className="flex w-full items-center gap-4"
                >
                  <FontAwesomeIcon icon={'clock'} />
                  <p>Historie</p>
                </Link>
              </li>
              {me!.role === 'DEVELOPER' ? (
                <li className="w-full cursor-pointer rounded-xl p-4 text-gray-600 transition-all  hover:bg-gray-200">
                  <Link href="/" className="flex w-full items-center gap-4">
                    <FontAwesomeIcon icon={'building'} />
                    <p>Instituce</p>
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
        <div>
          <div className="p-4">
            <button
              onClick={() => setInstitutionDialogOpen(true)}
              className="flex w-full items-center gap-4 rounded-md border border-gray-200 bg-bg p-4 text-gray-600"
            >
              <FontAwesomeIcon icon={'building'} />
              {institution?.name ?? 'Vybrat institutci'}
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 border-t-[1px] border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary text-white">
                <p className="font-bold uppercase">T</p>
              </div>
              <p className="text-sm text-gray-600">
                {me?.email.slice(0, 20)}
                {me!.email.length > 20 && '...'}
              </p>
            </div>
            <Popover>
              <PopoverTrigger>
                <div className="rounded-md p-4 hover:bg-gray-200">
                  <FontAwesomeIcon icon="chevron-down" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="rounded-xl bg-white shadow-xl">
                <ul className="font-sm flex flex-col gap-2">
                  <li className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-2 text-gray-600 transition-all duration-500 hover:bg-gray-100">
                    <FontAwesomeIcon icon={'cogs'} />
                    <p>Nastavení</p>
                  </li>
                  <li
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                    className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-2 text-red-800 transition-all duration-500 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={'sign-out'} />
                    <p>Odhlásit se</p>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

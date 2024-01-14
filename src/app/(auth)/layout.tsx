import { FC } from "react";
interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <main className="mt-12 flex h-screen flex-col items-center">
      <img src="/img/logo/logo.svg" className="mb-12 w-[50px]" alt="logo" />
      <div className="mx-auto flex w-full max-w-[500px]  items-stretch rounded-md bg-white p-4 shadow-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;

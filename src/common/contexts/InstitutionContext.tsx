import { useContext, createContext, useState, type FC, useEffect } from 'react';
import type { SelectedInstitution } from '../interfaces/client';
import { useGetMe } from '../hooks/api/useGetMe';

type InstitutionContextType = {
  institution: SelectedInstitution;
  setInstitution: React.Dispatch<React.SetStateAction<SelectedInstitution>>;
};

const InstitutionContext = createContext<InstitutionContextType>({
  institution: null,
  setInstitution: () => {},
});

export const useInstitution = () => {
  if (!InstitutionContext) {
    throw new Error('useInstitution must be used within InstitutionProvider');
  }
  return useContext(InstitutionContext);
};

const InstitutionProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { me } = useGetMe();
  const [institution, setInstitution] = useState<SelectedInstitution>(null);
  useEffect(() => {
    if (me) {
      setInstitution(me.institutions[0] ?? null);
    }
  }, [me]);
  return (
    <InstitutionContext.Provider value={{ institution, setInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
};

export default InstitutionProvider;

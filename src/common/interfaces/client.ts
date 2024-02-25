export type CurrentUser = {
  id: string;
  token: string;
};

export type SelectedInstitution = {
  id: string;
  name: string;
  role: 'ADMIN' | 'USER';
  code: string;
} | null;

export type InstitutionsFilter = {
  name: string | undefined;
};

export interface ILogFilters {
  institution: {
    id: string;
    name: string;
  } | null;
  user: {
    id: string;
    email: string;
  } | null;
  page: number;
}

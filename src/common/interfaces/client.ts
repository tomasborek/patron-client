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

import type { UserInstitutionRole, UserRole } from '../enums';

export interface IMe {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutions: IMeInsitution[];
}

export interface IMeInsitution {
  id: string;
  name: string;
  role: UserInstitutionRole;
  code: string;
}

export interface IUserReservationDTO {
  id: string;
  createdAt: Date;
  institution: {
    id: string;
    name: string;
  };
  station: {
    id: string;
    name: string;
    box: {
      id: string;
      localId: number;
    };
  };
}

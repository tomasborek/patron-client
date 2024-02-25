import type { UserInstitutionRole, UserRole } from '../enums';
import { IDevSimpleInstitution } from './institution';

export interface IMe {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutions: IMeInsitution[];
  devInstitutions?: IDevSimpleInstitution[];
}

export interface IInstitutionUserDTO {
  id: string;
  name: string | null;
  institutionRole: UserInstitutionRole;
  role: UserRole;
  email: string;
  createdAt: Date;
  active: boolean;
  verified: boolean;
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

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  token: string;
}

export interface IActivateDTO {
  email: string;
  name: string;
  password: string;
}

export interface IActivateResponseDTO {
  tokenId: string;
}

export interface IVerifyDTO {
  code: number;
}

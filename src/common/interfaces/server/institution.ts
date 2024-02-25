import { UserInstitutionRole } from '../enums';
import { IBoxDTO } from './box';

export interface IStationDTO {
  id: string;
  name: string;
  createdAt: Date;
  institutionId: string;
  deleted: boolean;
  boxes: IBoxDTO[];
}

export interface ISimpleInstitution {
  id: string;
  name: string;
  role: UserInstitutionRole;
  code: string;
}
[];

export interface IDevSimpleInstitution {
  id: string;
  name: string;
}

export interface IAddUserDTO {
  email: string;
  role: UserInstitutionRole;
}

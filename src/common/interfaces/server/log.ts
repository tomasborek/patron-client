import { LogAction, UserRole } from '../enums';

export interface ILogQuery {
  userId?: string;
  institutionId?: string;
}

export interface ILogDTO {
  id: string;
  createdAt: Date;
  box: {
    id: string;
    localId: number;
  } | null;
  station: {
    id: string;
    name: string;
  } | null;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  } | null;
  institution: {
    id: string;
    name: string;
  } | null;
  action: LogAction;
}

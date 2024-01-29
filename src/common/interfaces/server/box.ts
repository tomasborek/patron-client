import { BoxState } from '../enums';

export interface IBoxDTO {
  id: string;
  localId: number;
  stationId: string;
  deleted: boolean;
  createdAt: Date;
  state: BoxState;
  reserved: boolean;
}

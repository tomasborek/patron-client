import { IBoxDTO } from './box';

export interface IStationDTO {
  id: string;
  name: string;
  createdAt: Date;
  institutionId: string;
  deleted: boolean;
  boxes: IBoxDTO[];
}

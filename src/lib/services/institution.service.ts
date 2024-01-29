import axios from 'axios';
import { ApiService } from './api.service';
import type { InstitutionsFilter } from '@/common/interfaces/client';
import { IStationDTO } from '@/common/interfaces/server/institution';

export class InstitutionService extends ApiService {
  constructor(token?: string) {
    super(token, '/institution');
  }
  createInstitution(name: string) {
    return axios({
      method: 'POST',
      url: this.url(),
      data: {
        name,
      },
      headers: {
        Authorization: this.getBearer(this.token),
      },
    });
  }
  getStations(institutionId: string) {
    return this.sendRequest<{ stations: IStationDTO[] }>(
      'GET',
      this.url(`/${institutionId}/station`),
      {
        withCredentials: true,
      },
    );
  }
}

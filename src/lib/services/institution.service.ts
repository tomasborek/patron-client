import axios from 'axios';
import { ApiService } from './api.service';
import type { InstitutionsFilter } from '@/common/interfaces/client';
import {
  IAddUserDTO,
  IStationDTO,
} from '@/common/interfaces/server/institution';
import { IInstitutionUserDTO } from '@/common/interfaces/server/user';

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
  getUsers(institutionId: string, page?: number) {
    return this.sendRequest<{ users: IInstitutionUserDTO[]; count: number }>(
      'GET',
      this.url(`/${institutionId}/user`),
      {
        withCredentials: true,
        params: {
          page: page ?? 1,
        },
      },
    );
  }
  addUser(institutionId: string, data: IAddUserDTO) {
    return this.sendRequest('POST', this.url(`/${institutionId}/user`), {
      data,
      withCredentials: true,
    });
  }
}

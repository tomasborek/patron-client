import axios from 'axios';
import { ApiService } from './api.service';
import type { InstitutionsFilter } from '@/common/interfaces/client';

export class InstitutionService extends ApiService {
  createInstitution(name: string) {
    return axios({
      method: 'POST',
      url: this.url('/institution'),
      data: {
        name,
      },
      headers: {
        Authorization: this.getBearer(this.token),
      },
    });
  }
  getInstitutions(filters: InstitutionsFilter) {
    return axios({
      method: 'GET',
      url: this.url('/institution'),
      params: filters,
      headers: {
        Authorization: this.getBearer(this.token),
      },
    });
  }
}

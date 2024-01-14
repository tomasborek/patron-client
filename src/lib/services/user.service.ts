import axios from 'axios';
import { ApiService } from './api.service';
import type { IMe, IUserReservationDTO } from '@/common/interfaces/server/user';

export class UserService extends ApiService {
  constructor(token?: string) {
    super(token, '/user');
  }
  getMe() {
    return this.sendRequest<{ me: IMe }>('GET', this.url('/me'), {
      withCredentials: true,
    });
  }

  auth(email: string, password: string) {
    return axios({
      method: 'POST',
      url: this.url('/auth'),
      data: {
        email,
        password,
      },
    });
  }

  getReservations() {
    return this.sendRequest<{ reservations: IUserReservationDTO[] }>(
      'GET',
      this.url('/reservation'),
      {
        withCredentials: true,
      },
    );
  }
}

import { ApiService } from './api.service';

export class ReservationService extends ApiService {
  constructor(token?: string) {
    super(token, '/reservation');
  }

  public cancel(id: string) {
    return this.sendRequest('POST', this.url(`/${id}/cancel`), {
      withCredentials: true,
    });
  }
}

import { ApiService } from './api.service';

export class BoxService extends ApiService {
  constructor(token?: string) {
    super(token, '/box');
  }

  public createReservation(boxId: string) {
    return this.sendRequest('POST', this.url(`/${boxId}/reservation`), {
      withCredentials: true,
    });
  }
}

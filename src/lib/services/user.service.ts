import axios from 'axios';
import { ApiService } from './api.service';
import type {
  IActivateDTO,
  IActivateResponseDTO,
  ILoginDTO,
  ILoginResponseDTO,
  IMe,
  IUserReservationDTO,
  IVerifyDTO,
} from '@/common/interfaces/server/user';

export class UserService extends ApiService {
  constructor(token?: string) {
    super(token, '/user');
  }

  public getMe() {
    return this.sendRequest<{ me: IMe }>('GET', this.url('/me'), {
      withCredentials: true,
    });
  }

  public auth(data: ILoginDTO) {
    return this.sendRequest<ILoginResponseDTO>('POST', this.url('/auth'), {
      data,
    });
  }

  public activate(data: IActivateDTO) {
    return this.sendRequest<IActivateResponseDTO>(
      'POST',
      this.url('/activate'),
      {
        data,
      },
    );
  }

  public verify(tokenId: string, data: IVerifyDTO) {
    return this.sendRequest<{ verified: boolean }>(
      'POST',
      this.url(`/verify/${tokenId}`),
      {
        data,
      },
    );
  }

  public getReservations() {
    return this.sendRequest<{ reservations: IUserReservationDTO[] }>(
      'GET',
      this.url('/reservation'),
      {
        withCredentials: true,
      },
    );
  }
}

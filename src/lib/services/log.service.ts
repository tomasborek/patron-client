import { ILogQuery, ILogsDTO } from '@/common/interfaces/server/log';
import { ApiService } from './api.service';

export default class LogService extends ApiService {
  constructor(token?: string) {
    super(token, '/log');
  }

  get(data: ILogQuery) {
    return this.sendRequest<ILogsDTO>('GET', this.url(), {
      params: data,
      withCredentials: true,
    });
  }
}

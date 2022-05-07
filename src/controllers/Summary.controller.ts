import api from '../services/api';
import { AxiosResponse } from 'axios';

interface GetSummaryParameters {
  month: string;
  dispositivo: string;
  type: string;
}

class SummaryController {
  async getSummary({ month, type, dispositivo }: GetSummaryParameters) {
    const { data } = await api.get<
      GetSummaryParameters
    >(`/meterings/${type}-humidity`, {
      params: {
        month,
        device_id: dispositivo
      }
    });

    return data;
  }
}

export default new SummaryController();

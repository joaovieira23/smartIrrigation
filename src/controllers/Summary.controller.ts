import api from '../services/api';
import { AxiosResponse } from 'axios';

interface GetSummaryParameters {
<<<<<<< HEAD
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
=======
	budgetId: string | undefined;
	date: string;
}

interface AuthenticationResponse {
	id: string;
	owner: string;
	name: string;
	created_at: string;
	updated_at: string;
	salary: number;
	goal: number;
	month: string;
	result: number;
	expenses: number;
	incomes: number;
	categories: [
		{
			id: string;
			budget: string;
			name: string;
			goal: number;
			created_at: string;
			updated_at: string;
			month: string;
			result: number;
			expenses: number;
			incomes: number;
			icon: string;
			budgetPercentageRaw: number | null;
			budgetPercentage: number;
		},
	];
}

class SummaryController {
	async getSummary({ budgetId, date }: GetSummaryParameters) {
		const { data } = await api.get<AuthenticationResponse, AxiosResponse<AuthenticationResponse>, GetSummaryParameters>(
			`/v1/budgets/${budgetId}/summary/${date}`,
		);
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1

		return data;
	}
}

export default new SummaryController();

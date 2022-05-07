import api from '../services/api';

interface CreateTransactionParameters {
<<<<<<< HEAD
  device_id: string,
  description: string,
  name: string,
}


class TransactionsController {
  async createTransaction({ name, description, device_id }: CreateTransactionParameters) {
    try {
      const data = await api.post<
        CreateTransactionParameters
      >(`/device`, { name, device_id, description });

      console.warn('data', data)
      return data;
    } catch (e) {
      console.warn('e', e)
    }
  };
=======
	budget?: string;
	category?: string;
	name: string;
	value: number;
	date: string;
	type: string;
}

interface AuthenticationResponse {
	id: string;
	budget: string;
	name: string;
	goal: number;
	created_at: string;
	updated_at: string;
}

class TransactionsController {
	async createTransaction({ category, name, value, date, type, budget }: CreateTransactionParameters) {
		try {
			const { data } = await api.post<
				AuthenticationResponse,
				AxiosResponse<AuthenticationResponse>,
				CreateTransactionParameters
			>(`/v1/budgets/${budget}/categories/${category}/transactions`, { category, name, value, date, type });

			return data;
		} catch (e) {
			console.warn('e', e);
		}
	}

	async getAllTransaction({ budgetId }: { budgetId: string }) {
		const { data } = await api.get(`/v1/budgets/${budgetId}/transactions`);
		return data;
	}
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
}

export default new TransactionsController();

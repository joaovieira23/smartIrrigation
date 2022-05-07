import api from '../services/api';

interface CreateTransactionParameters {
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
	}
}

export default new TransactionsController();

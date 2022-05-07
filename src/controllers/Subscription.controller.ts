import api from '../services/api';
import { AxiosError, AxiosResponse } from 'axios';
import { RevenueCatApiResponse } from '../@types/Subscription';

class SubscriptionController {
	async getSubscription() {
		try {
			const { data } = await api.get<RevenueCatApiResponse | null, AxiosResponse<RevenueCatApiResponse | null>>(
				`/v1/revenuecat/subscriptions`,
			);

			return data;
		} catch (err: Error | AxiosError | unknown) {
			if (err?.response.statusCode === 404) {
				return null;
			}

			throw err;
		}
	}
}

export default new SubscriptionController();

import api from '../services/api';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { isDate } from 'date-fns/esm';

interface CreateBudgetParameters {
	name: string;
	goal: number;
	salary: number;
}

export interface Budget {
	id: string;
	owner: string;
	name: string;
	goal: number;
	salary: number;
	created_at: string;
	updated_at: string;
}

class BudgetController {
	async createBudget({ name, goal, salary }: CreateBudgetParameters) {
		const { data } = await api.post<Budget, AxiosResponse<Budget>, CreateBudgetParameters>('/v1/budgets', {
			name,
			goal,
			salary,
		});

		return data;
	}

	async getDevices() {
		try {
			const data = await api.get('/device');
			return data;
		} catch (e) {
			console.warn('e', e)
		}

	}

	async getBudgets() {
		return api.get<Budget[], AxiosResponse<Budget[]>>('/v1/budgets').then(({ data }) => data);
	}

	async getBudget({ budget_id }: { budget_id: string }) {
		return api.get<Budget, AxiosResponse<Budget>>(`/v1/budgets/${budget_id}`).then(({ data }) => data);
	}

	async getDeviceId({ id }: { id: string }) {
		try {
			const { data } = await api.get(`/device/${id}`);
			console.warn('data', data)
			return data
		} catch (e) {
			console.warn('error', e)
		}
	}
}

export default new BudgetController();

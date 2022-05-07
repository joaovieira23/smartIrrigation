import api from '../services/api';
import { AxiosResponse } from 'axios';

interface CreateCategorieParameters {
	budget: string | undefined;
	goal: number;
	name: string;
	icon: string | undefined;
}

interface EditCategorieParameters {
	goal?: number;
}

export interface Category {
	id: string;
	owner: string;
	name: string;
	goal: number;
	budget: string;
	icon: string;
	created_at: string;
	updated_at: string;
}

class CategoriesController {
	async createCategory({ budget, name, goal, icon }: CreateCategorieParameters) {
		const { data } = await api.post<Category, AxiosResponse<Category>, CreateCategorieParameters>(
			`/v1/budgets/${budget}/categories`,
			{
				name,
				icon,
				goal,
				budget,
			},
		);

		return data;
	}

	async getBudgetCategories({ budget_id }: { budget_id: string }) {
		return api
			.get<Category[], AxiosResponse<Category[]>>(`/v1/budgets/${budget_id}/categories`)
			.then(({ data }) => data);
	}

	async getCategory({ budget_id, category_id }: { budget_id: string; category_id: string }) {
		const data = await api
			.get<Category, AxiosResponse<Category>>(`/v1/budgets/${budget_id}/categories/${category_id}`)
			.then(({ data }) => data);

		return data;
	}

	async editCategory({ budget_id, category_id, goal }: { budget_id: string; category_id: Category; goal: number }) {
		const data = await api
			.patch<Category, AxiosResponse<Category>, EditCategorieParameters>(
				`/v1/budgets/${budget_id}/categories/${category_id}`,
				{
					goal,
				},
			)
			.then(({ data }) => data);

		return data;
	}
}

export default new CategoriesController();

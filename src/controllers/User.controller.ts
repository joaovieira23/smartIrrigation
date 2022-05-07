import api from '../services/api';
import { AxiosResponse } from 'axios';

interface AuthenticationResponse {
	id: string;
	name: string;
	email: string;
	password: string;
	email_verified: boolean;
	created_at: string;
	updated_at: string;
}

interface ResetPasswordParameters {
	email: string;
}

class UserController {
	async getUser() {
		const { data } = await api.get<AuthenticationResponse, AxiosResponse<AuthenticationResponse>>('/v1/user');

		return data;
	}

	async deleteUser() {
		const data = await api.delete<AuthenticationResponse, AxiosResponse<AuthenticationResponse>>('/v1/user');

		return data;
	}

	async editUser({
		name,
		email,
		password,
	}: {
		name: string | undefined;
		email: string | undefined;
		password?: string;
	}) {
		const { data } = await api.patch<AuthenticationResponse, AxiosResponse<AuthenticationResponse>>('/v1/user', {
			name,
			email,
			password,
		});

		return data;
	}

	async resetPassword({ email }: { email: string }) {
		const { data } = await api.post<
			AuthenticationResponse,
			AxiosResponse<AuthenticationResponse>,
			ResetPasswordParameters
		>('/v1/auth/send-password-reset', {
			email,
		});

		return data;
	}
}

export default new UserController();

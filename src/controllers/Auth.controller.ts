import api, { getSource } from '../services/api';
import * as SecureStore from 'expo-secure-store';
import { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../@types/User';

interface CreateAccountParameters {
	name: string
	email: string;
	password: string;
}

export interface AuthenticationResponse {
	user: {
		id: string,
		name: string,
		email: string,
		password: string
	},
	token: string
}

export interface AuthenticationResponseLogin {
	user: {
		id: string;
		name: string;
		email: string;
		password: string;
	},
	token: string
}

interface LoginParameters {
	email: string;
	password: string;
}

interface RefreshTokenRequestBody {
	token: string;
}

interface RefreshTokenResponse {
	expiresIn: number;
	idToken: string;
}
class AuthController {
	user: AuthenticationResponse | null;
	listeners: Array<(user: AuthenticationResponse | null) => any>;
	loaded: boolean;


	constructor() {
		this.loaded = false;
		this.user = null;
		this.listeners = [];

		this.initializeAuthentication();
	}

	updateLoggedStatus(value: AuthenticationResponse | null = null) {
		this.user = value;
		this.listeners.forEach((listenerFunction) => {
			listenerFunction(value);
		});
		this.loaded = true;
	}

	addListener(listener: (user: AuthenticationResponse | null) => any) {
		this.listeners.push(listener);
		if (this.loaded) {
			listener(this.user);
		}
	}

	async createAccount({ email, password, name }: CreateAccountParameters) {
		try {
			const { data } = await api.post<
				AuthenticationResponse,
				AxiosResponse<AuthenticationResponse>,
				CreateAccountParameters
			>('/user', {
				name,
				email,
				password,
			});

			if (data.token) {
				const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
				const setInStorage = isSecureStoreAvailable ? SecureStore.setItemAsync : AsyncStorage.setItem;

				await setInStorage('id-token', data.token);

				await setInStorage('refresh-token', data.refreshToken);
				await setInStorage('id-token', data.idToken);

				await this.updateApiInstance();

			}

			return data;
		} catch (e) {
			console.warn(e);
		}

	}

	async getIdToken() {
		const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
		const getFromStorage = isSecureStoreAvailable ? SecureStore.getItemAsync : AsyncStorage.getItem;

		return getFromStorage('id-token');
	}

	async getRefreshToken() {
		const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
		const getFromStorage = isSecureStoreAvailable ? SecureStore.getItemAsync : AsyncStorage.getItem;

		return getFromStorage('refresh-token');
	}

	async signIn({ email, password }: LoginParameters) {
		const { data } = await api.post<AuthenticationResponseLogin, AxiosResponse<AuthenticationResponseLogin>, LoginParameters>(
			'/auth',
			{
				email,
				password,
			},
		);

		if (data.token) {
			const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
			const setInStorage = isSecureStoreAvailable ? SecureStore.setItemAsync : AsyncStorage.setItem;

			await setInStorage('refresh-token', data.token);
			await setInStorage('id-token', data.token);

			await this.updateApiInstance();

			this.updateLoggedStatus(data);

		}

		return data;
	}

	async logout() {
		const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
		const deleteStorage = isSecureStoreAvailable ? SecureStore.deleteItemAsync : AsyncStorage.removeItem;

		await deleteStorage('refresh-token');
		await deleteStorage('id-token');

		await getSource().cancel();

		this.updateLoggedStatus();


		return;
	}

	async updateIdToken() {
		const refreshToken = await this.getRefreshToken();

		if (!refreshToken) {
			throw new Error('unable to get refresh token');
		}

		const { data } = await api
			.post<RefreshTokenResponse, AxiosResponse<RefreshTokenResponse>, RefreshTokenRequestBody>(
				'/v1/auth/refresh-token',
				{
					token: refreshToken,
				},
			)
			.catch((err) => {
				this.logout();

				throw err;
			});

		const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
		const setInStorage = isSecureStoreAvailable ? SecureStore.setItemAsync : AsyncStorage.setItem;

		await setInStorage('id-token', data.idToken);

		await this.updateApiInstance();

		return data;
	}

	async updateApiInstance() {
		const isSecureStoreAvailable = await SecureStore.isAvailableAsync();
		const getFromStorage = isSecureStoreAvailable ? SecureStore.getItemAsync : AsyncStorage.getItem;

		api.interceptors.request.use(async (config) => {
			const token = await getFromStorage('id-token');
			if (!config.headers) {
				config.headers = {};
			}

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		});

		api.interceptors.response.use(
			(response) => response,
			async (err: AxiosError) => {
				if (err.response?.status === 403) {
					await this.updateIdToken().catch(() => null);

					throw err;
				}
			},
		);
	}

	private async initializeAuthentication() {
		try {
			const refreshToken = await this.getRefreshToken();

			if (refreshToken) {
				const refreshTokenResponse = await this.updateIdToken();

				const { data: userResponse } = await api.get<User>('/v1/user');

				this.updateLoggedStatus({
					displayName: userResponse.name,
					email: userResponse.email,
					localId: userResponse.id,
					registered: true,
					expiresIn: refreshTokenResponse.expiresIn,
					idToken: refreshTokenResponse.idToken,
					refreshToken,
				});
			} else {
				this.updateLoggedStatus(null);
			}
		} catch (err) {
			console.error(err);
			this.updateLoggedStatus(null);
		}
	}
}

export default new AuthController();

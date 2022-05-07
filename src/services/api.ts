import axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

let source = axios.CancelToken.source();

export function getSource(refresh = false) {
	if (source && !refresh) {
		return source;
	}

	source = axios.CancelToken.source();

	return source;
}

const api = axios.create({
	baseURL: 'https://smart-irrigation-api.herokuapp.com',
});

export default api;

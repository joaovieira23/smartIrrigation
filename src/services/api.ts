import axios from 'axios';
import { Platform } from 'react-native';
<<<<<<< HEAD
=======
import { API_URL, API_KEY_ANDROID, ANDROID_FINGERPRINT } from 'react-native-dotenv';
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
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
<<<<<<< HEAD
	baseURL: 'https://smart-irrigation-api.herokuapp.com',
=======
	baseURL: API_URL,
	headers: {
		'x-api-key': API_KEY_ANDROID,
		'junt-platform-id': Platform.OS,
		...extraConfiguration,
	},
	cancelToken: getSource().token,
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
});

export default api;

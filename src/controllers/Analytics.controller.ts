import analytics from '@react-native-firebase/analytics';
import MoEngage from '../NativesAPIs/MoEngage';

class AnalyticsController {
	logEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
		if (eventName.length > 39) {
			throw 'nome do evento nao pode ter mais de 40 caracteres';
		}

		return Promise.all([
			MoEngage.trackEvent(eventName),
			analytics().logEvent(eventName, parameters),
		]);
	}

	setUserId(id: string) {
		return analytics().setUserId(id);
	}

	logLogin() {
		return analytics().logLogin({ method: 'email' });
	}
}

export default new AnalyticsController();

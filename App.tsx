import React, { useEffect } from 'react';

import MonthProvider from './src/context/MonthSelected'
import AccountProvider from './src/context/Account'
import AppNavigator from './src/navigators/App.navigator';
import AppProvider from './src/hooks';
import AsyncStorage from './src/NativesAPIs/AsyncStorage';
import DeviceInfo from './src/NativesAPIs/DeviceInfo';
import * as SplashScreen from 'expo-splash-screen';

function App() {
	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, [])

	return (
		<MonthProvider>
			<AccountProvider>
				<AppProvider>
					<AppNavigator />
				</AppProvider>
			</AccountProvider>
		</MonthProvider>
	);
}


export default App;

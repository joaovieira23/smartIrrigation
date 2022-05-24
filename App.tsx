import React, { useEffect } from 'react';

import MonthProvider from './src/context/MonthSelected'
import AccountProvider from './src/context/Account'
import AppNavigator from './src/navigators/App.navigator';
import AppProvider from './src/hooks';
import AsyncStorage from './src/NativesAPIs/AsyncStorage';
import { LogBox } from 'react-native';
import DeviceInfo from './src/NativesAPIs/DeviceInfo';

function App() {
	LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
	LogBox.ignoreAllLogs();//Ignore all log notifications
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

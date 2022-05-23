import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '../pages/Login/Onboarding';
import Welcome from '../pages/Login/Welcome';
import Cadastro from '../pages/Login/Cadastro';
import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ResetPasswordSucess from '../pages/ResetPassword/ResetPasswordSucess';
import AdesaoInicial from '../pages/AdesaoInicial';
import Adesao from '../pages/Adesao';
import { useQuery } from 'react-query';
import AdesaoExpirou from '../pages/AdesaoExpirou';
import AsyncStorage from '../NativesAPIs/AsyncStorage';
import InputData from '../pages/Start/InputData';
import Loading from '../components/Loading';
import BudgetController from '../controllers/Budget.controller';
import Limits from '../pages/Start/Limits';
import Perfil from '../pages/Perfil';
import SubscriptionController from '../controllers/Subscription.controller';
import PerfilInterno from '../pages/Perfil/Perfil'
import AdicionarCategoria from '../pages/Categorias/AdicionarCategoria'
import EditarCategoria from '../pages/Categorias/EditarCategoria'
import TabsNavigator from './Tabs.navigator';
import { useAuth } from '../hooks/auth';
import CategoriesController from '../controllers/Categories.controller';
import { AppNavigatorScreens } from './@types/App.navigator.types';
import { useAccountCreate } from '../context/Account';
import { RevenueCatApiResponse } from '../@types/Subscription';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator<AppNavigatorScreens>();

export default function AppNavigator() {
	const [user, { isLoading }] = useAuth();
	const [isLoadingOnboarding, setIsLoadingOnboarding] = useState<boolean>(true);
	const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

	const { data: budgets, isFetching: isFetchingBudgets } = useQuery('budgets', BudgetController.getBudgets, {
		enabled: Boolean(user),
	});
	const currentBudget = budgets?.length ? budgets[0] : null;

	const { data: categories, isFetching: isFetchingCategories } = useQuery(
		['categories', { budget: currentBudget?.id }],
		() => (currentBudget ? CategoriesController.getBudgetCategories({ budget_id: currentBudget?.id }) : []),
		{
			enabled: Boolean(currentBudget?.id),
		},
	);

	async function verifyOboardingExterno() {
		return AsyncStorage.getItem('showOnboarding')
			.then((isShow: any) => {
				if (isShow === 'false') {
					setShowOnboarding(false);
				} else {
					setShowOnboarding(true);
				}
			})
			.finally(() => setIsLoadingOnboarding(false));
	}

	useEffect(() => {
		verifyOboardingExterno();
	}, []);

	useEffect(() => {
		if (!isLoading && !isFetchingBudgets && !isFetchingCategories && !isLoadingOnboarding) {
			Updates.checkForUpdateAsync().then((result) => {
				if (result.isAvailable) {
					Updates.fetchUpdateAsync().then(() => {
						Alert.alert(
							'Atenção',
							'Uma nova atualizacao esta disponivel. Deseja reiniciar o app para instala-la agora?',
							[
								{
									text: 'Não',
									onPress: () => null,
									style: 'destructive',
								},
								{
									text: 'Sim',
									onPress: Updates.reloadAsync,
									style: 'default',
								},
							],
						);
					});
				}
			});
		}
	}, [isLoading, isFetchingBudgets, isFetchingCategories, isLoadingOnboarding]);

	if (isLoading) {
		return <Loading />;
	}


	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{!user && (
					<>
						<Stack.Screen
							options={() => ({
								headerShown: false,
								headerBackTitleVisible: false,
							})}
							name="Welcome"
							component={Welcome}
						/>
						<Stack.Screen
							options={() => ({
								headerShown: false,
								headerBackTitleVisible: false,
							})}
							name="Cadastro"
							component={Cadastro}
						/>
						<Stack.Screen
							options={() => ({
								headerShown: false,
								headerBackTitleVisible: false,
							})}
							name="Login"
							component={Login}
						/>
						<Stack.Screen
							options={() => ({
								headerShown: false,
								headerBackVisible: false
							})}
							name="Reset Password"
							component={ResetPassword}
						/>
						<Stack.Screen
							options={() => ({
								headerShown: false,
								headerBackVisible: false
							})}
							name="Reset Password Success"
							component={ResetPasswordSucess}
						/>
					</>
				)}



				<>
					<Stack.Screen name="Tabs" component={TabsNavigator} />
					<Stack.Screen
						options={() => ({
							headerShown: false,
							headerBackTitleVisible: false,
						})}
						name="Perfil"
						component={Perfil}
					/>
					<Stack.Screen
						options={() => ({
							headerShown: false,
							headerBackTitleVisible: false,
						})}
						name="Perfil Interno"
						component={PerfilInterno}
					/>

					<Stack.Screen
						options={() => ({
							headerShown: false,
							headerBackTitleVisible: false,
						})}
						name="Adicionar Categoria"
						component={AdicionarCategoria}
					/>

					<Stack.Screen
						options={() => ({
							headerShown: false,
							headerBackTitleVisible: false,
						})}
						name="Editar Categoria"
						component={EditarCategoria}
					/>
				</>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

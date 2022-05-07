import React, { useState } from 'react';
import { Platform, View, Alert } from 'react-native'
import useTheme from '../../hooks/useTheme';
import Text from '../../components/Text';
import TextInput from '../../components/Input';
import Touchable from '../../components/Touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import BudgetController, { Budget } from '../../controllers/Budget.controller';
<<<<<<< HEAD
=======
import Analytics from '../../controllers/Analytics.controller';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
import { StackNavigationProp } from '@react-navigation/stack';
import { InputBudgetSkeleton } from './Skeleton';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from '../../hooks';

export type IPropsScreensInputData = {
	Orcamento: { id_budget: string };
	'Onboarding Categoria': { id_budget: string };
};

export default function InputData() {
	const {
		cores: { destaque100 },
	} = useTheme();

	const { data: budgets, isLoading } = useQuery('budgets', BudgetController.getBudgets);
	const currentBudget = budgets?.length ? budgets[0] : null;

	const [salary, setSalary] = useState(currentBudget?.salary);
	const [goal, setGoal] = useState(currentBudget?.goal);
	const route = useRoute();
	//@ts-ignore
	const budgetId = route.params?.editar;
	const editar = Boolean(budgetId);

	const navigation = useNavigation<StackNavigationProp<IPropsScreensInputData>>();

	async function handleClickBudget(): Promise<Budget> {
		if (Boolean(salary) && Boolean(goal) && typeof salary === 'number' && typeof goal === 'number') {
			if (salary < goal) {
				throw new Error('limit cannot be greater than income');
			}
			const data = await BudgetController.createBudget({ name: 'Principal', goal, salary });

			if (data.id) {
				if (editar) {
					navigation.navigate('Orcamento', {
						id_budget: data.id,
					});
				} else {
					navigation.navigate('Onboarding Categoria', {
						id_budget: data.id,
					});
				}

				return data;
			}

			throw new Error('invalid parameters');
		}

		throw new Error('invalid parameters');
	}

	const mutation = useMutation<Budget>(handleClickBudget, {
		onSuccess: (data: Budget) => {
			if (data) {
				queryClient.setQueryData<Budget[]>('budgets', (prevData) => {
					return [...(prevData || []), data];
				});
			}
		},
		onError: (err) => {
			if (err instanceof Error) {
				if (err?.message.includes('limit cannot be greater than income')) {
					Alert.alert('Erro', 'Sua renda não pode ser menor que a quantidade que deseja juntar.');
				} else {
					Alert.alert('Erro', 'Não foi possível definir seus limites no momento. Tente novamente mais tarde');
				}
			}
		},
	});

	return (
		<>
			{isLoading && <InputBudgetSkeleton />}

			<KeyboardAwareScrollView contentContainerStyle={{
				display: 'flex',
				flexGrow: 1,
				padding: 24,
				marginVertical: 64,
				justifyContent: 'space-between',
			}}
			>
				<View>
					<View style={editar && { display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						{editar && (
							<Touchable onPress={() => navigation.goBack()}>
								<Icon
									style={{ display: 'flex', marginRight: 8, marginVertical: 16, alignSelf: 'flex-start' }}
									name="arrow-left"
									size={32}
								/>
							</Touchable>
						)}
						<View>
							<Text h2 fonte={'Montserrat-Bold'} style={{ marginHorizontal: 8 }}>
								{editar ? 'Editar' : 'Vamos começar!'}
							</Text>
						</View>
					</View>

					<Text h3 style={{ margin: 8 }} fonte={'Poppins-Medium'}>
						{editar
							? 'Atualize sempre os seus dados principais para ter melhor controle sobre o quanto pode gastar.'
							: 'O primeiro passo para organizar suas finanças e juntar dinheiro é planejar seu orçamento.'}
					</Text>
				</View>

				<View style={{ marginVertical: 50, marginHorizontal: 8 }}>
					<Text h3 style={{ color: destaque100, marginBottom: 16 }} fonte="Montserrat-Bold">
						Quanto você ganha por mês?
					</Text>
					<TextInput
						placeholderTextColor={'white'}
						mask={{
							type: 'money',
						}}
						placeholder="R$ 0,00"
						autoCapitalize="none"
						keyboardType="default"
						// @ts-ignore
						onChangeRawValue={setSalary}
						value={salary}
					/>

					<Text h3 style={{ color: destaque100, marginBottom: 16 }} fonte="Montserrat-Bold">
						Quanto você quer juntar por mês?
					</Text>
					<TextInput
						placeholderTextColor={'white'}
						autoCapitalize="none"
						placeholder="R$ 0,00"
						mask={{
							type: 'money',
						}}
						value={goal}
						//@ts-ignore
						onChangeRawValue={setGoal}
						caretHidden={Platform.OS === 'android'}
					/>
				</View>

				<View style={{ alignItems: 'center' }}>
					<Button
						loading={mutation.isLoading}
						disable={!(salary && goal)}
						onPress={mutation.mutate}
						label="Salvar"
					/>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}

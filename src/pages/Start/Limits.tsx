import React, { useState } from 'react';
import { Platform, View, SafeAreaView, Alert } from 'react-native'
import useTheme from '../../hooks/useTheme';
import { useMutation } from 'react-query';
import Text from '../../components/Text';
import TextInput from '../../components/Input';
import Button from '../../components/Button';
import Categories, { Category } from '../../controllers/Categories.controller';
import BudgetController from '../../controllers/Budget.controller';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { queryClient } from '../../hooks';
import { useQuery } from 'react-query';

export default function Adesao() {
	const {
		cores: { destaquePrimaria, destaque100 },
	} = useTheme();

	const { data: budgets } = useQuery('budgetsId', BudgetController.getBudgets);
	const currentBudget = budgets?.length ? budgets[0] : null;
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [goal, setGoal] = useState(0);
	const [items, setItems] = useState([
		{
			value: {
				label: 'Alimentação',
				icon: 'food-fork-drink',
			},
			icon: () => <Icon color={destaquePrimaria} name='food-fork-drink' size={24} />,
			label: "Alimentação",
		},
		{
			value: {
				label: 'Imprevistos',
				icon: 'alert-rhombus',
			},
			icon: () => <Icon color={destaquePrimaria} name='alert-rhombus' size={24} />,
			label: "Imprevistos",

		},
		{
			value: {
				label: 'Contas',
				icon: 'newspaper-variant-outline'
			},
			icon: () => <Icon color={destaquePrimaria} name='newspaper-variant-outline' size={24} />,
			label: "Contas",

		},
		{
			value: {
				label: 'Lazer',
				icon: 'palm-tree'
			},
			label: "Lazer",
			icon: () => <Icon color={destaquePrimaria} name='palm-tree' size={24} />,
		},
		{
			value: {
				label: 'Academia',
				icon: 'weight-lifter',
			},
			icon: () => <Icon color={destaquePrimaria} name='weight-lifter' size={24} />,
			label: "Academia",

		},
		{
			value: {
				label: 'Bares e Restaurantes',
				icon: 'glass-mug-variant',
			},
			icon: () => <Icon color={destaquePrimaria} name='glass-mug-variant' size={24} />,
			label: "Bares e Restaurantes",
		},
		{
			value: {
				label: 'Casa',
				icon: 'warehouse',
			},
			icon: () => <Icon color={destaquePrimaria} name='warehouse' size={24} />,
			label: "Casa",
		},
		{
			value: {
				label: 'Lazer/Assinaturas',
				icon: 'movie-open',
			},
			icon: () => <Icon color={destaquePrimaria} name='movie-open' size={24} />,
			label: "Lazer/Assinaturas",

		},
		{
			value: {
				label: 'Compras',
				icon: 'bag-personal',
			},
			icon: () => <Icon color={destaquePrimaria} name='bag-personal' size={24} />,
			label: "Compras",

		},
		{
			value: {
				label: 'Saúde',
				icon: 'doctor',
			},
			icon: () => <Icon color={destaquePrimaria} name='doctor' size={24} />,
			label: "Saúde",
		},
		{
			value: {
				label: 'Educação',
				icon: 'book-open-page-variant'
			},
			icon: () => <Icon color={destaquePrimaria} name='book-open-page-variant' size={24} />,
			label: "Educação",
		},
		{
			value: {
				label: 'Eletrônicos',
				icon: 'google-controller',
			},
			icon: () => <Icon color={destaquePrimaria} name='google-controller' size={24} />,
			label: "Eletrônicos",
		},
		{
			value: {
				label: 'Hobbies',
				icon: 'emoticon',
			},
			icon: () => <Icon color={destaquePrimaria} name='emoticon' size={24} />,
			label: "Hobbies",
		},
		{
			value: {
				label: 'Mercado',
				icon: 'cart-outline',
			},
			icon: () => <Icon color={destaquePrimaria} name='cart-outline' size={24} />,
			label: "Mercado",
		},
		{
			value: {
				label: 'Pets',
				icon: 'dog',
			},
			icon: () => <Icon color={destaquePrimaria} name='dog' size={24} />,
			label: "Pets",
		},
		{
			value: {
				label: 'Transporte',
				icon: 'bus',
			},
			icon: () => <Icon color={destaquePrimaria} name='bus' size={24} />,
			label: "Transporte",
		},
		{
			value: {
				label: 'Vestuário',
				icon: 'tshirt-v-outline',
			},
			icon: () => <Icon color={destaquePrimaria} name='tshirt-v-outline' size={24} />,
			label: "Vestuário",
		},
		{
			value: {
				label: 'Viagens',
				icon: 'wallet-travel',
			},
			icon: () => <Icon color={destaquePrimaria} name='wallet-travel' size={24} />,
			label: "Viagens",
		},

	]);

	const { mutate } = useMutation(
		async (): Promise<any> => {
			if (!currentBudget) {
				throw new Error('budget not found');
			}
			setLoading(true);

			const categorie = await Categories.createCategory({
				budget: currentBudget.id,
				//@ts-ignore
				name: value.label,
				//@ts-ignore
				icon: value.icon,
				goal,
			});

			setLoading(false);

			if (categorie.id) {
				Alert.alert('Sucesso', 'Categoria adicionada com sucesso.');
			}

			return categorie;
		},
		{
			onSuccess: async (newCategory: Category) => {
				try {
					await queryClient.cancelQueries(['categories', { budget: currentBudget?.id }]);

					await queryClient.setQueryData<Category[]>(['categories', { budget: currentBudget?.id }], (oldCategories) => {
						const oldCategoriesWithoutNew = oldCategories?.filter((cat) => cat.id !== newCategory.id) || [];

						return [...oldCategoriesWithoutNew, newCategory];
					});
				} catch (err) {
					await queryClient.refetchQueries(['categories', { budget: currentBudget?.id }]);
				}
			},
		},
	);

	return (
		<SafeAreaView>
			<View
				style={{
					display: 'flex',
					flexGrow: 1,
					padding: 24,
					marginVertical: 64,
					justifyContent: 'space-between',
				}}
			>
				<View>
					<Text h2 fonte={'Montserrat-Bold'} style={{ marginHorizontal: 8 }}>
						Defina seus limites
					</Text>

					<Text h3 style={{ margin: 8 }} fonte={'Poppins-Medium'}>
						O segundo passo é definir limites de gastos para acompanhar de perto o seu orçamento.
					</Text>
				</View>

				<View style={{ marginVertical: 50, marginHorizontal: 8 }}>
					<Text h3 style={{ color: destaque100, marginBottom: 16 }} fonte="Montserrat-Bold">
						Selecione a categoria
					</Text>
					<DropDownPicker
						placeholder={'Selecione uma categoria'}
						textStyle={{
							fontFamily: 'Poppins-Medium',
							zIndex: 99
						}}
						open={open}
						value={value}
						//@ts-ignore
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
					/>
					<Text h3 style={{ color: destaque100, marginVertical: 16 }} fonte="Montserrat-Bold">
						Defina o valor limite
					</Text>
					<TextInput
						placeholderTextColor={'white'}
						autoCapitalize="none"
						mask={{
							type: 'money',
						}}
						// @ts-ignore
						onChangeRawValue={setGoal}
						value={goal}
						caretHidden={Platform.OS === 'android'}
					/>
				</View>

				<View style={{ alignItems: 'center' }}>
					<Button loading={loading} disable={!Boolean(goal)} onPress={() => mutate()} label="Adicionar" />
				</View>
			</View>
		</SafeAreaView>
	);
}

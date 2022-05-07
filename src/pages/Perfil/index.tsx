import React from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, Switch, TouchableOpacity } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import { useQuery } from 'react-query';
import AuthController from '../../controllers/Auth.controller';
import { useNavigation } from '@react-navigation/native';
import UserController from '../../controllers/User.controller';
import Screen from '../../components/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ItemMenu(props: {
	children: string;
	icon?: string;
	ultimoItem?: boolean;
	onPress: () => void;
	switch?: boolean;
	ativo?: boolean;
	editar?: boolean;
	negativo?: boolean;
}) {
	const {
		cores: {
			primaria,
			borda,
			texto: { subtexto },
		},
	} = useTheme();

	return (
		<ScrollView>
			<Touchable onPress={props.onPress}>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'space-between',
						flexDirection: 'row',
						borderBottomWidth: props.ultimoItem ? 0 : StyleSheet.hairlineWidth,
						borderBottomColor: borda,
						height: 60,
						paddingHorizontal: 15,
					}}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon
							color={props.negativo ? '#E40C0A' : primaria}
							//@ts-ignore
							name={props.icon}
							style={{ paddingRight: 11 }}
							size={24}
						/>
						<Text fonte="Poppins-Medium" style={{ color: props.negativo ? '#E40C0A' : subtexto, fontSize: 16 }}>{props.children}</Text>
					</View>

					{props.switch ? (
						<Switch value={props.ativo} onValueChange={props.onPress} />
					) : (
						<Icon
							color={props.negativo ? '#E40C0A' : primaria}
							name={props.editar ? 'pencil-outline' : 'chevron-right'}
							style={{ alignItems: 'flex-start' }}
							size={props.editar ? 26 : 32}
							onPress={props.onPress}
						/>
					)}
				</View>
			</Touchable>
		</ScrollView>
	);
}

export default function Perfil({ goBack }: { goBack: () => void }) {
	const {
		cores: { secundaria, surface },
	} = useTheme();
	const { top } = useSafeAreaInsets();

	const { data: user } = useQuery(
		['user'],
		() => (UserController.getUser()),
	);

	const navigation = useNavigation();

	function logoutUser() {
		Alert.alert('Tem certeza?', 'Tem certeza que deseja sair?', [
			{
				text: 'Não',
			},
			{
				text: 'Sim',
				onPress: () => {
					AuthController.logout()
				},
			},
		]);
	}

	return (
		<Screen forceContrast>
			<View
				style={{
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					flex: 1,
					backgroundColor: 'transparent',
				}}
			>
				<View
					style={{
						minHeight: 290,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}
				>

					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: top,
						}}
					>
						<View
							style={{
								marginTop: 32,
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<Touchable onPress={() => navigation.goBack()}>
								<Icon style={{ display: 'flex', marginRight: 8, alignSelf: 'flex-end' }} name="close" size={32} />
							</Touchable>
							<View style={{ display: 'flex', flexDirection: 'row', marginTop: 32, alignItems: 'center', justifyContent: 'center' }}>
								<Image source={require('../../assets/Imagens/Vector.png')} />
								<View style={{ marginLeft: 24 }}>
									<Text h2 fonte='Poppins-Medium' style={{ color: secundaria }} >{user?.name}</Text>
									<Text h3 fonte='Poppins-Medium'>{user?.email}</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<ScrollView style={{ flex: 1 }}>
					<ItemMenu icon="account-outline" onPress={() => navigation.navigate('Perfil Interno' as never, {} as never)}>
						Perfil
					</ItemMenu>
					<ItemMenu negativo icon="exit-to-app" onPress={() => logoutUser()}>
						Sair
					</ItemMenu>
				</ScrollView>
			</View>
		</Screen>
	);
}


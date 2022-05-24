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
					navigation.navigate('Welcome' as never);
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
				<View>
					<Text fonte='Poppins-Bold' >App desenvolvido por:</Text>
					<Text fonte='Montserrat-Medium'>João Victor Vieira de Andrade - RA: 082170018	</Text>
					<Text fonte='Montserrat-Medium'>Eduardo Alves Leonardo - RA: 082170006</Text>
					<Text fonte='Montserrat-Medium'>Jonathan Citolino - RA: 082170019</Text>
					<Text fonte='Montserrat-Medium'>William Stófel da Mota - RA: 082170033</Text>
					</View>


				</View>

			</View>
			<View style={{ marginTop: 324 }}>
			<ItemMenu negativo icon="exit-to-app" onPress={() => logoutUser()}>
						Sair
					</ItemMenu>
					</View>
		</Screen>
	);
}


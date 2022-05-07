import React from 'react';
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button';
import Text from '../../components/Text';

export default function Welcome() {
	const navigation = useNavigation();

	return (
		<View style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
			<View style={{ marginBottom: '24%' }}>
				<Image
					resizeMode={'contain'}
					style={{ width: 280, height: 126, marginTop: '25%' }}
					source={require('../../assets/Imagens/smartirri_logo.png')}
				/>
			</View>

			<View style={{ marginBottom: '8%' }}>
				<Text fonte="Montserrat-Bold" style={{ marginBottom: 6, textAlign: 'center' }} h1 enfase>
					Seja Bem-Vindo!
				</Text>
				<Text fonte="Poppins-Medium" h3 subtexto style={{ textAlign: 'center', maxWidth: 276 }}>
					Tenha o monitoramento dos seus dispositivos na palma da sua mão
				</Text>
			</View>

			<View style={{ position: 'absolute', bottom: 25, paddingVertical: 21 }}>
				<View style={{ paddingBottom: 21 }}>
					<Button label="Cadastrar" onPress={() => navigation.navigate('Cadastro' as never, {} as never)} />
				</View>
				<Button label="Entrar" outlined onPress={() => navigation.navigate('Login' as never, {} as never)} />
			</View>
		</View>
	);
}
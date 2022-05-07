import React from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native'
import useTheme from '../hooks/useTheme';
import Text from '../components/Text';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAccountCreate } from '../context/Account';

export default function AdesaoInicial() {

  const {
    cores: { terciaria, placeholderText },
  } = useTheme();

  const navigation = useNavigation();
  const { height } = Dimensions.get('window');
  const { setCreateAccount } = useAccountCreate();

  return (
    <>
      <View style={{
        display: 'flex',
        flexGrow: 1,
        backgroundColor: placeholderText,
        paddingVertical: 24,
        alignItems: 'center',
        paddingHorizontal: 18
      }}>
        <Image
          style={{ alignSelf: 'center', marginBottom: '20%', width: 144, height: 55, marginTop: '16%' }}
          source={require('../assets/Imagens/logo-home.png')}
        />
        <Text h3 fonte={'Montserrat-Bold'} style={{ textAlign: 'center', marginBottom: height * 0.025 }}>
          {`Comece a juntar seu dinheiro e ter \nmais controle seus gastos `}
        </Text>

        <>
          <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 8, marginRight: 24 }}>
            <View
              style={{ borderWidth: 2, borderColor: 'transparent', borderRadius: 25 }}
            >
              <Icon style={{ color: terciaria }} name="check-circle-outline" size={32} />

            </View>
            <Text style={{ marginLeft: 12 }} fonte="Poppins-Medium">
              Organize seu orçamento de forma fácil e tenha controle de tudo pelo celular
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 8, marginRight: 24 }}>
            <View
              style={{ borderWidth: 2, borderColor: 'transparent', borderRadius: 25 }}
            >
              <Icon style={{ color: terciaria }} name="check-circle-outline" size={32} />
            </View>
            <Text style={{ marginLeft: 12 }} fonte="Poppins-Medium">
              Defina limites de gastos por categorias e veja o quanto pode gastar em cada
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', paddingVertical: 8, marginRight: 24 }}>
            <View
              style={{ borderWidth: 2, borderColor: 'transparent', borderRadius: 25 }}
            >
              <Icon style={{ color: terciaria }} name="check-circle-outline" size={32} />
            </View>
            <Text style={{ marginLeft: 8 }} fonte="Poppins-Medium">
              Teste gratuitamente por 30 dias, podendo cancelar a qualquer momento
            </Text>
          </View>
        </>

        <View style={{ position: 'absolute', bottom: 25 }}>
          <View style={{ paddingBottom: 21 }}>
            <Button label="Experimente por 30 dias" onPress={() => {
              setCreateAccount(false);
            }} />
          </View>
          <Button label="Assine agora" border outlined onPress={() => {
            navigation.navigate('Adesao' as never, {} as never)
          }} />

          <TouchableOpacity style={{ marginTop: 32 }} onPress={() => console.log('Politica de Privacidade')}>
            <Text fonte="Poppins-Medium" subtexto h4 style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
              Termos de Uso e Política de Privacidade
            </Text>
          </TouchableOpacity>
        </View>


      </View>
    </>
  );
}

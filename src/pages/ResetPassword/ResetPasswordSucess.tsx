import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button';
import Text from '../../components/Text';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView contentContainerStyle={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: 24
    }} >
      <View style={{ marginTop: 52 }}>
        <View>
          <Image
            style={{ alignSelf: 'center', width: 144, height: 55 }}
            source={require('../../assets/Imagens/logo-home.png')}
          />
          <View style={{ marginTop: 64 }}>
            <Image
              style={{ alignSelf: 'center', width: 148, height: 133 }}
              source={require('../../assets/Imagens/reset-password-success.png')}
            />
          </View>

          <Text h3 fonte="Montserrat-Bold" style={{ textAlign: 'center', color: '#0E0F0F', marginTop: 42 }}>E-mail enviado!</Text>
          <Text h4 fonte="Poppins-Medium" style={{ color: '#5A5A63', marginTop: 42, alignSelf: 'center', maxWidth: 312, lineHeight: 22 }}>Enviamos um e-mail com o link para a recuperação de senha. Verifique a sua caixa de entrada para alterar a senha.</Text>
        </View>
      </View>


      <View style={{ alignItems: 'center' }}>
        <Button width={350} loading={loading} label="Ok, Entendi" onPress={() => navigation.navigate('Login' as never, {} as never)} />
      </View>
    </KeyboardAwareScrollView >
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginTop: 10,
    width: 350,
    borderRadius: 8,
    color: 'white',
  },
});

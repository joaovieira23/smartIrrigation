import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  Alert
} from 'react-native';
import TextInput from '../../components/Input';
import { useNavigation } from '@react-navigation/native'
import validarEmail from '../../utils/validarEmail';
import Button from '../../components/Button';
import Header from '../../components/Header';
import UserController from '../../controllers/User.controller';
import Text from '../../components/Text';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function ResetPassword() {
  const [email, setEmail] = useState<string>('');
  const [resetPasswordError, setResetPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  async function handleClickResetPassword() {
    try {
      setLoading(true);
      if (email && validarEmail(email)) {
        await UserController.resetPassword({ email });
        navigation.navigate("Reset Password Success" as never, {} as never);
      } else {
        setLoading(false);
        setResetPasswordError(true);
      }
    } catch (e) {
      setLoading(false);
      console.error('e', e);
      Alert.alert('Erro', 'Algo deu errado, tente novamente mais tarde')
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: 24
    }} >
      <View style={{ marginTop: 52 }}>
        <Header iconePerfil goBack={() => navigation.goBack()} />
        <View>
          <Image
            style={{ alignSelf: 'center', width: 144, height: 55 }}
            source={require('../../assets/Imagens/logo-home.png')}
          />
          <Text h3 fonte="Montserrat-Bold" style={{ textAlign: 'center', color: '#0E0F0F', marginTop: 42 }}>Esqueceu sua senha?</Text>
          <Text h4 fonte="Poppins-Medium" style={{ textAlign: 'left', color: '#5A5A63', marginTop: 42 }}>Insira abaixo o seu e-mail para receber uma nova senha.</Text>
          <View style={{ marginVertical: 64 }}>
            <TextInput
              placeholderTextColor={'white'}
              icon={'email-outline'}
              autoCapitalize="none"
              label="E-mail"
              value={email}
              onFocus={() => setResetPasswordError(false)}
              style={styles.input}
              error={resetPasswordError ? 'Verifique se digitou o e-mail corretamente' : undefined}
              onChangeText={(novoEmail) => setEmail(novoEmail.trim())}
              caretHidden={Platform.OS === 'android'}
            />
          </View>
        </View>
      </View>


      <View style={{ alignItems: 'center' }}>
        <Button width={350} loading={loading} disable={!Boolean(email)} label="Recuperar Senha" onPress={() => handleClickResetPassword()} />
      </View>
    </KeyboardAwareScrollView>
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

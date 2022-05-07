import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  Image
} from 'react-native';
import TextInput from '../../components/Input';
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/Button';
import Touchable from '../../components/Touchable';
import useTheme from '../../hooks/useTheme';
import Text from '../../components/Text';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import AuthController from '../../controllers/Auth.controller';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


interface SignInFormData {
  email: string;
  password: string;
}

export default function Cadastro() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [resetPasswordError, setResetPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    cores: {
      destaque100,
    },
  } = useTheme();

  const navigation = useNavigation();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('Senha obrigatória'),
  });


  async function signIn(data: SignInFormData) {
    try {
      setLoading(true);
      await schema.validate(data, {
        abortEarly: false,
      });

      await AuthController.signIn(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        console.warn('errors', errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Houve um erro durante o login, cheque suas credenciais.',
      );

      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      padding: 24
    }} >
      <Image
        style={{ alignSelf: 'center', width: 154, height: 200 }}
        source={require('../../assets/Imagens/smartirri_logo.png')}
      />

      <View style={{ marginVertical: 50 }}>
        <TextInput
          placeholderTextColor={'white'}
          icon={'email-outline'}
          autoCapitalize="none"
          label="E-mail"
          value={email}
          onFocus={() => setResetPasswordError(false)}
          style={styles.input}
          error={resetPasswordError ? 'Preencha o email' : undefined}
          onChangeText={(novoEmail) => setEmail(novoEmail.trim())}
          caretHidden={Platform.OS === 'android'}
        />

        <TextInput
          placeholderTextColor={'white'}
          secureTextEntry
          showEye
          icon={"lock-outline"}
          keyboardType="default"
          style={styles.input}
          label="Senha"
          value={password}
          onChangeText={setPassword}
        />
        <Touchable onPress={() => navigation.navigate('Reset Password' as never, {} as never)}>
          <Text fonte="Poppins-Medium" style={{ fontSize: 16, textAlign: 'right', color: destaque100 }}>
            Esqueci minha senha
          </Text>
        </Touchable>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Button loading={loading} disable={!Boolean(email && password)} label="Entrar" onPress={() => Boolean(email && password) && signIn({ email, password })} />

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 45 }}
        >
          <Text fonte='Poppins-Medium' subtexto style={{ fontSize: 16 }}>
            {'Não tem conta? '}
          </Text>
          <Touchable
            onPress={() => {
              navigation.navigate('Cadastro' as never, {} as never);
            }}
          >
            <Text fonte="Poppins-Medium" style={{ fontSize: 16, color: destaque100 }}>
              Cadastre-se
            </Text>
          </Touchable>
        </View>
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

import React, { useState } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import TextInput from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
import HintSenhaItem from './HintSenhaItem'
import * as Yup from 'yup';
import { Linking } from 'react-native';
import getValidationErrors from '../../utils/getValidationErrors';
import AuthController from '../../controllers/Auth.controller';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import validarEmail from '../../utils/validarEmail';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import useFormField from '../../hooks/useFormField';
import { useAccountCreate } from '../../context/Account';
import { useNavigation } from '@react-navigation/native';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

export default function Cadastro() {
  const [mostrarErroSenha, setMostrarErroSenha] = useState(false);
  const [erroRequisitosDaSenha, setErroRequisitosDaSenha] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const nome = useFormField({
    defaultValue: '',
    validate: v => v.length > 1,
  });

  const email = useFormField({
    defaultValue: '',
    validate: validarEmail,
  });

  const password = useFormField({
    defaultValue: '',
    validate: (v) => v.length > 0,
  });

  const confirmPassword = useFormField({
    defaultValue: '',
    validate: (val) => val.length > 0,
  });

  const navigation = useNavigation();
  const { setCreateAccount } = useAccountCreate();


  const {
    cores: {
      surface
    },
  } = useTheme();

  async function signUp(data: SignUpFormData) {

    try {
      setLoading(true);

      await AuthController.createAccount(data);

      Alert.alert('Sucesso', 'Conta criada com sucesso');

      setLoading(false)
      setCreateAccount(true);

    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        getValidationErrors(err);
        return;
      }
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      padding: 24
    }} >
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={32} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 32 }} h1 fonte="Montserrat-Bold" >Criar conta</Text>
      </View>

      <View style={{ marginVertical: 50 }}>
        <TextInput
          autoCapitalize="none"
          label={'Seu nome'}
          icon={'account-outline'}
          value={nome.value}
          onChangeText={novoNome => nome.setValue(novoNome)}
          error={nome.error ? 'Campo obrigat??rio' : undefined}
          onFocus={() => nome.setFocus(true)}
          onBlur={() => nome.setFocus(false)}
        />

        <TextInput
          autoCapitalize="none"
          label={'E-mail'}
          icon={'email-outline'}
          value={email.value}
          onChangeText={novoEmail => email.setValue(novoEmail)}
          error={email.error ? 'Campo obrigat??rio' : undefined}
          onFocus={() => email.setFocus(true)}
          onBlur={() => email.setFocus(false)}
          caretHidden={Platform.OS === 'android'}
        />

        <TextInput
          autoCapitalize="none"
          label={'Senha'}
          value={password.value}
          onChangeText={novaSenha => password.setValue(novaSenha)}
          showEye
          secureTextEntry={true}
          error={password.error ? 'Campo obrigat??rio'
            : erroRequisitosDaSenha ?
              'Senha n??o est?? dentro dos requisitos m??nimos'
              : undefined}
          onFocus={() => password.setFocus(true)}
          onBlur={() => password.setFocus(false)}
          caretHidden={Platform.OS === 'android'}
        />

        <TextInput
          placeholderTextColor={'white'}
          secureTextEntry={true}
          keyboardType="default"
          showEye
          label="Confirmar sua senha"
          value={confirmPassword.value}
          onChangeText={valor => {
            confirmPassword.setValue(valor);
            setMostrarErroSenha(false);
          }}
          onFocus={() => confirmPassword.setFocus(true)}
          onBlur={() => confirmPassword.setFocus(false)}
          error={
            mostrarErroSenha
              ? '*As duas senhas devem ser iguais'
              : undefined
          }
        />

        {password.focus && (
          <View style={{ marginHorizontal: 8, marginVertical: 16 }}>
            <Text fonte="Poppins-Medium" subtexto style={{ marginBottom: 5 }}>
              Sua senha deve conter:
            </Text>

            <HintSenhaItem
              label="No m??nimo 8 caracteres"
              preenchido={password.value.length >= 8 && password.value.length <= 15}
            />
            <HintSenhaItem
              label="Uma letra mai??scula"
              preenchido={/.*[A-Z].*/.test(password.value)}
            />
            <HintSenhaItem label="Uma letra min??scula" preenchido={/(.*[a-z].*)/.test(password.value)} />
            <HintSenhaItem label="Um n??mero" preenchido={/[0-9]/.test(password.value)} />
          </View>
        )}
      </View>


      <View style={{ alignItems: 'center' }}>
        <Button
          loading={loading}
          label="Criar conta"
          labelColor={surface}
          disable={!(nome.value && email.value && password.value && confirmPassword.value)}
          onPress={() => {
            setLoading(true);
            if (!(nome.value && email.value && password.value && confirmPassword.value)) {
              setLoading(false);
              return
            }
            else if (password.value !== confirmPassword.value) {
              setMostrarErroSenha(true);
              setLoading(false);
            } else {
              try {
                signUp({ email: email.value, name: nome.value, password: password.value });
              } catch (e) {
                setLoading(false);
                Alert.alert('Erro', 'Alguma coisa n??o deu certo, tente novamente mais tarde')
                console.warn('Error', e)
              }
            }
          }} />
      </View>
    </KeyboardAwareScrollView>
  );
}

import React, { useState } from 'react'
import Screen from '../../components/Screen';
import { View } from 'react-native'
import Header from '../../components/Header';
import TextInput from '../../components/Input';
import { ItemMenu } from './index';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import FotoPerfilUsuario from './FotoPerfilUsuario';
import ModalDeletarConta from './ModalDeletarConta'
import UserController from '../../controllers/User.controller';
import { useQuery } from 'react-query'

export default function Perfil() {
  const { data: user } = useQuery(
    ['user'],
    () => (UserController.getUser()),
  );

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [showModalExtrato, setShowModalExtrato] = useState(false);
  const navigation = useNavigation();

  async function editUser() {
    const data = await UserController.editUser({
      email, name
    });

    return data;
  }


  return (
    <Screen forceContrast>
      <View style={{ padding: 18 }}>
        <Header iconePerfil title={'Perfil'} goBack={() => navigation.goBack()} />
        <FotoPerfilUsuario />

        {showModalExtrato && (
          <ModalDeletarConta
            showModal={showModalExtrato}
            setShowModal={setShowModalExtrato}
          />
        )}

        <View style={{ marginTop: 32 }}>

          <TextInput
            placeholderTextColor={'white'}
            autoCapitalize="none"
            keyboardType="default"
            colorPlaceholder
            editar
            onChangeText={novoNome => setName(novoNome.trim())}
            label="Nome"
            value={name}
          />

          <TextInput
            placeholderTextColor={'white'}
            colorPlaceholder
            editar
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={novoEmail => setEmail(novoEmail.trim())}
            label="E-mail"
            value={email}
          />

          <TextInput
            placeholderTextColor={'white'}
            autoCapitalize="none"
            editar
            colorPlaceholder
            secureTextEntry
            keyboardType="default"
            onChangeText={novaSenha => setPassword(novaSenha.trim())}
            label="Senha"
            value={password}
          />


          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <View style={{ paddingVertical: 21 }}>
              <Button label="Salvar" onPress={() => editUser()} />
            </View>
            <Button negativo label="Excluir Conta" border outlined onPress={() => setShowModalExtrato(true)} />
          </View>
        </View>
      </View>
    </Screen >
  );
}
import React, { useState } from 'react'
import { View, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Text from '../../components/Text';
import Button from '../../components/Button';
import TextInput from '../../components/Input';
import UserController from '../../controllers/User.controller';
import AuthController from '../../controllers/Auth.controller';
import useTheme from '../../hooks/useTheme';

interface IPropsModalDeletar {
  setShowModal: (modal: boolean) => void;
  showModal: boolean;
}

export default function ModalDeletarConta(props: IPropsModalDeletar) {
  const {
    cores: {
      surface,
    },
  } = useTheme();

  const [palavraChave, setPalavraChave] = useState('');
  const [mostrarErroSenha, setMostrarErroSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deletarContaModal() {
    try {
      setLoading(true);

      if (palavraChave.toLowerCase() !== 'deletar') {
        setMostrarErroSenha(true);
        return;
      }

      await UserController.deleteUser();


      Alert.alert('Pronto', 'Sua conta foi deletada com sucesso!');

      AuthController.logout();
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao excluir sua conta, tente novamente mais tarde');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal
        style={{ margin: '4%' }}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        isVisible={props.showModal}
        onBackdropPress={() => props.setShowModal(false)}
      >
        <View style={{ backgroundColor: surface, borderRadius: 10, marginVertical: '20%', padding: 14 }}>
          <View style={{ paddingVertical: 12 }}>
            <View style={{}}>
              <Text fonte="Montserrat-Bold" h2 enfase style={{ maxWidth: 300, textAlign: 'center', marginBottom: 16 }}>
                EXCLUIR CONTA
              </Text>
              <Text h3 fonte="Poppins-Medium" style={{ paddingVertical: 12 }}>
                Tem certeza que deseja excluir?
              </Text>
            </View>
            <Text fonte={'Poppins-Medium'}>
              Ao excluir a conta todos os lançamentos feitos no aplicativo serão removidos.
              Para sua segurança digite a palavra  “DELETAR” no campo abaixo para confirmar a operação
            </Text>

            <View style={{ marginTop: 32 }}>
              <TextInput
                placeholderTextColor={'white'}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={novoNome => {
                  setPalavraChave(novoNome.trim())
                  setMostrarErroSenha(false);
                }}
                label="Palavra-Chave"
                value={palavraChave}
                error={mostrarErroSenha ? 'Para confirmar digite "Deletar"' : undefined}
              />
            </View>

            <View style={{ alignItems: 'center', marginTop: 16 }}>
              <View style={{ paddingVertical: 21 }}>
                <Button excluir loading={loading} label="Excluir" onPress={() => deletarContaModal()} />
              </View>
              <Button neutro label="Voltar" border outlined onPress={() => props.setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
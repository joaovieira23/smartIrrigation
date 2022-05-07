import React, { useState } from 'react';
import { Alert, View } from 'react-native'
import Text from '../../components/Text';
import TextInput from '../../components/Input';
import Button from '../../components/Button';
import BudgetController from '../../controllers/Budget.controller';
import TransactionController, { CreateTransactionParameters } from '../../controllers/Transactions.controller';
import { useMutation, useQuery } from 'react-query';
import useTheme from '../../hooks/useTheme';
import useFormField from '../../hooks/useFormField';
import Screen from '../../components/Screen';
import { queryClient } from '../../hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function Adicionar() {
  const [loading, setLoading] = useState(false);

  const {
    cores: {
      input: { erro }
    },
  } = useTheme();

  const deviceName = useFormField({
    defaultValue: '',
    validate: v => v.length > 1,
  });

  const descricao = useFormField({
    defaultValue: '',
    validate: v => v.length > 1,
  });

  const { data: budgets } = useQuery('budgets', BudgetController.getBudgets);

  const currentBudget = budgets?.length ? budgets[0] : null;

  const mutation = useMutation(
    async () => {
      setLoading(true);

      return await TransactionController.createTransaction({
        name: deviceName.value,
        device_id: deviceName.value,
        description: descricao.value
      });
    },
    {
      onSuccess: (res) => {
        Alert.alert('Sucesso', 'Device cadastrado com sucesso!')
        queryClient.invalidateQueries('devices');

        //@ts-ignore
        queryClient.setQueryData('devices', (data) => [...data, res])
      },
    }
  );

  return (
    <Screen forceContrast>
      <KeyboardAwareScrollView contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 64
      }} >
        <View style={{ padding: 24, flex: 1, justifyContent: 'space-between' }}>
          <View style={{ marginVertical: 32 }}>
            <Text style={{ textAlign: 'center', marginBottom: 64 }} h2 fonte="Montserrat-Bold">Adicionar Dispositivo</Text>
            <TextInput
              placeholderTextColor={'white'}
              autoCapitalize="none"
              colorPlaceholder
              label={'Nome do Dispositivo'}
              value={deviceName.value}
              onChangeText={novoNome => deviceName.setValue(novoNome)}
              error={deviceName.error ? 'Campo obrigatório' : undefined}
              onFocus={() => deviceName.setFocus(true)}
              onBlur={() => deviceName.setFocus(false)}
            />

            <TextInput
              placeholderTextColor={'white'}
              autoCapitalize="none"
              colorPlaceholder
              label={'Descrição'}
              value={descricao.value}
              onChangeText={novoNome => descricao.setValue(novoNome)}
              error={descricao.error ? 'Campo obrigatório' : undefined}
              onFocus={() => descricao.setFocus(true)}
              onBlur={() => descricao.setFocus(false)}
            />
          </View >

          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Button loading={mutation.isLoading} onPress={() => mutation.mutate()} label="Criar Dispositivo" />
          </View>
        </View >
      </KeyboardAwareScrollView >
    </Screen >
  );
}
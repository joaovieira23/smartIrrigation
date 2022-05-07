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

<<<<<<< HEAD
      return await TransactionController.createTransaction({
        name: deviceName.value,
        device_id: deviceName.value,
        description: descricao.value
      });
=======
      const transaction = {
        budget: currentBudget?.id,
        // category: tipoTransacao && valorDaCategoria.value,
        date: format(parse(data.value, 'dd/MM/yyyy', new Date()), 'yyyy-MM'),
        type: tipoTransacao === 'Despesa' ? 'EXPENSE' : 'INCOME',
        name: descricao.value,
        value: valor.value,
      } as CreateTransactionParameters

      if (tipoTransacao === 'Despesa') transaction.category = valorDaCategoria.value

      return TransactionController.createTransaction(transaction);
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
    },
    {
      onSuccess: (res) => {
        Alert.alert('Sucesso', 'Transação adicionada com sucesso!')
        setLoading(false);
<<<<<<< HEAD
        Alert.alert('Sucesso', 'Device cadastrado com sucesso!')
        queryClient.invalidateQueries('devices');

        //@ts-ignore
        queryClient.setQueryData('devices', (data) => [...data, res])
=======

        Analytics.logEvent('ADICIONOU_TRANSACAO');

        if (valorDaCategoria.value.length <= 1) {
          setCategoriaError(true);
          return;
        }

        queryClient.invalidateQueries('summary');

        queryClient.setQueryData(['transaction', { budget: currentBudget?.id, month: date }], (data) => [...data, res])
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
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
<<<<<<< HEAD
=======

            <DatePicker
              value={data.value}
              label={'Data'}
              backgroundColor={'#FFFFFF'}
              onChangeText={(val) => {
                data.setValue(val);
                data.setTouched(true);
              }}
              error={data.error ? 'Data Inválida' : undefined}
            />

            {tipoTransacao === 'Despesa' && <View style={{ alignItems: 'center', marginTop: 16 }}>
              <DropDownPicker
                placeholder={'Defina a categoria'}
                textStyle={{
                  fontFamily: 'Poppins-Medium'
                }}
                open={open}
                value={valorDaCategoria.value}
                //@ts-ignore
                items={categoriasQuePossui}
                setOpen={setOpen}
                setValue={(e) => {
                  valorDaCategoria.setValue(e)
                  setCategoriaError(false)
                }}
              />
              {categoriaError && <Text fonte="Poppins-Medium" style={{ color: erro }}>Selecione uma categoria</Text>}
            </View>
            }
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
          </View>

          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Button loading={mutation.isLoading} onPress={() => mutation.mutate()} label="Criar Dispositivo" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
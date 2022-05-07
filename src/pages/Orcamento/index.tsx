import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import CardOrcamento from './CardOrcamento';
import LimitesCategoria from './LimitesCategoria';
import Text from '../../components/Text';
import BudgetController from '../../controllers/Budget.controller';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from 'react-query';
import ModalDefinirOrcamento from './ModalDefinirOrcamento';
import Header from '../../components/Header'
import api from '../../services/api';

export type ScreenEditarBudgetParam = {
  "Editar Budget": { editar?: boolean };
};
export default function Orcamento() {
  const [showModalExtrato, setShowModalExtrato] = useState(false);
  const [device, setDevice] = useState('');

  const { data: devices, isLoading } = useQuery('devices', BudgetController.getDevices);
  const navigation = useNavigation<StackNavigationProp<ScreenEditarBudgetParam>>();
  async function clickCategory(dv: Object) {
    setDevice(dv);
    setShowModalExtrato(true);
  };

  if (isLoading) {
    return <ActivityIndicator />
  }


  return (
    <SafeAreaView>
      <ScrollView style={{ marginBottom: 8 }}>
        <Header title={'Dispositivos'} />
        <View>
          <Text h3 fonte="Poppins-Medium" style={{ paddingTop: 16, paddingHorizontal: 16 }}>Dispositivos</Text>
          <CardOrcamento onPress={() => {
            navigation.navigate('Editar Budget', {
              editar: true
            })
          }} />
          {showModalExtrato && (
            <ModalDefinirOrcamento
              device={device}
              showModal={showModalExtrato}
              setShowModal={setShowModalExtrato}
            />
          )}
          {devices?.data.devices?.map((dv) => (
            <TouchableOpacity onPress={() => clickCategory(dv)} >
              <LimitesCategoria label={dv.name} status={dv.active ? 'Ativo' : 'Inativo'} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
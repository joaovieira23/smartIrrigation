import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import VisaoGeral from './VisaoGeral';
import Text from '../../components/Text';
import Card from '../../components/Card';
import Touchable from '../../components/Touchable';
import { useQuery } from 'react-query';
import UserController from '../../controllers/User.controller';
import CardMensal from '../../components/CardMensal';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header'
import { useMonthSelected } from '../../context/MonthSelected'
import DropDownPicker from 'react-native-dropdown-picker';
import BudgetController from '../../controllers/Budget.controller';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {

  const {
    cores: {
      destaque100
    },
  } = useTheme();
  const { width } = Dimensions.get('screen');

  const { date } = useMonthSelected();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const { data: devices, isLoading: isLoadingDevice } = useQuery('devices', BudgetController.getDevices);

  if (isLoadingDevice) {
    return <ActivityIndicator style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
  };

  const devicesFormatted = devices?.data?.devices?.map((a) => {
    return {
      value: a.device_id,
      label: a.name
    }
  });


  return (
    <ScrollView nestedScrollEnabled={true} scrollEnabled={!open}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ margin: 32 }}>
          <Text h2 style={{ color: destaque100 }} fonte='Montserrat-Bold'>Seja bem vindo</Text>
        </View>
        <Header />
      </View>

      <CardMensal />
      <View style={{ margin: 16, marginBottom: open ? 220 : 12 }}>
        <DropDownPicker
          placeholder={'Escolha o dispositivo'}
          open={open}
          value={value}
          items={devicesFormatted}
          setOpen={setOpen}
          setValue={setValue}
        />
      </View>

      <VisaoGeral type='solo' dispositivo={value} titulo="Gráfico de umidade do solo" />

      <Card
        style={{
          width: width - 32,
          marginLeft: 16,
          marginTop: 8,
          borderRadius: 5,
        }}
      >
        <Touchable onPress={() => console.warn('teste')}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text
                fonte="Poppins-Medium"
                subtexto
                h4
                style={{
                  includeFontPadding: false,
                  paddingTop: 5,
                }}
              >
                Acompanhamento do uso de Água
              </Text>

              <Icon name="pen" size={28} />
            </View>

            <Text
              fonte="Poppins-Medium"
              enfase
              h2
              style={{
                marginBottom: 5,
              }}
            >
              {(Math.random() * (20 - 0) + 0).toFixed(2)} Litros
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: 'green', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Mês Anterior
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    {(Math.random() * (20 - 0) + 0).toFixed(2)}L
                  </Text>
                </View>
              </View>

              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: '#5A5A63', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Mês Seguinte
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    Sem dados
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Touchable>
      </Card>

      <VisaoGeral type="ar" dispositivo={value} titulo="Gráfico de umidade do ar" />
      <VisaoGeral type="temperatura" dispositivo={value} titulo="Gráfico de temperatura" />

    </ScrollView>
  )
}
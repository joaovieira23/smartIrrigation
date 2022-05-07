import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import isAfter from 'date-fns/isAfter'
import dateFns from 'date-fns'

export default function StatusExtrato({ status, date }: { status: string, date: string }) {

  const {
    cores: {
      secundaria,
    },
  } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8, backgroundColor: status === 'Positivo' ? 'rgba(204, 235, 187, 0.3);' : 'rgba(145, 145, 159, 0.2);', padding: 4, borderRadius: 10 }} >
      <Icon name={!!isAfter(Date.parse(date), new Date()) ? 'clock-time-five-outline' : "check-all"} size={18} style={{ marginRight: 6 }} />
      <Text h6 fonte='Poppins-Medium' style={{ color: !!isAfter(Date.parse(date), new Date()) ? '#91919F' : secundaria }}>
        {`${status} ${!!isAfter(Date.parse(date), new Date()) ? 'Pendente' : 'Realizada'}`}
      </Text>
    </View>);
}
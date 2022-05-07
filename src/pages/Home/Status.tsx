import React from 'react';
import { View } from 'react-native'
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';

export default function Status({ status }: { status: 'Positivo' | 'Neutro' | 'Negativo' }) {

  const {
    cores: { destaque100 },
  } = useTheme();

  return (
    <View style={{ backgroundColor: status === 'Positivo' ? 'rgba(204, 235, 187, 0.3)' : status === 'Neutro' ? 'rgba(145, 145, 159, 0.15)' : 'rgba(228, 12, 10, 0.2);', borderRadius: 10, flexDirection: 'row', justifyContent: 'center', width: 166, height: 54, paddingHorizontal: 8 }}>
      <Icon style={{ marginRight: 8, marginTop: 12 }} color={status === 'Positivo' ? destaque100 : status === 'Neutro' ? 'rgba(128, 128, 140, 1)' : 'rgba(228, 12, 10, 1)'} name={status === 'Positivo' ? 'emoticon-happy-outline' : 'emoticon-sad-outline'} size={16} />
      <Text h6 style={{ marginTop: 12, color: status === 'Positivo' ? destaque100 : status === 'Neutro' ? 'rgba(128, 128, 140, 1)' : 'rgba(228, 12, 10, 1)' }} fonte='Poppins-Medium' >
        {status === 'Positivo' ?
          'Você está conseguindo economizar este mês!'
          : status === 'Neutro' ? 'Ops! Cuidado, o seu\norçamento está em risco' : 'Você está gastanto \nmais do que recebeu'}
      </Text>
    </View>
  )
}
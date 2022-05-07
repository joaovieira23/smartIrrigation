import React from 'react';
import Card from '../../components/Card';
import Text from '../../components/Text';
import useTheme from '../../hooks/useTheme';
import { Dimensions, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formataMoeda } from '../../utils/formatacaoController';

export default function CardExtrato({ icon, label, valor, percentual }: { icon: string, label: string, valor: number, percentual: number }) {

  const { width } = Dimensions.get('screen');

  const {
    cores: { terciaria },
  } = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: '100%',
      }}
    >
      <Card
        style={{
          width: width * 0.94,
          height: 66,
          borderRadius: 5,
          justifyContent: 'center',
        }}
      >
        <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ marginRight: 32, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={icon} size={36} color={terciaria} />
            <Text h3 fonte={'Poppins-Medium'} style={{ marginLeft: 16, marginTop: 4 }}>{label}</Text>
          </View>
          <View >
            <Text fonte='Poppins-Medium' style={{ marginRight: 16, marginTop: 4 }}>{formataMoeda(valor)}</Text>
            <Text fonte='Poppins-Medium' style={{ marginRight: 16, textAlign: 'right' }}>{percentual}</Text>
          </View>
        </View>

      </Card >
    </View >
  );
}
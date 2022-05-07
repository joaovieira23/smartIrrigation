import React from 'react';
import Card from '../../components/Card';
import Text from '../../components/Text';
import useTheme from '../../hooks/useTheme';
import { Dimensions, View } from 'react-native'
import StatusExtrato from './StatusExtrato'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formataMoeda } from '../../utils/formatacaoController';

export default function CardExtrato({ icon, label, date, valor, descricao, tipoTransacao }: { icon: string | undefined, label: string | undefined, date: string, descricao?: string, valor: number, tipoTransacao: 'Despesa' | 'Receita', status?: string }) {

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
        marginBottom: 4,
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
            {icon ? <Icon name={icon} size={36} color={terciaria} /> : null}
            <View>
              <Text h3 fonte={'Poppins-Medium'} style={{ marginLeft: 16, maxWidth: 160 }}>{label}</Text>
              {descricao && <Text h5 fonte={'Poppins-Medium'} style={{ marginLeft: 16 }}>{descricao}</Text>}
            </View>
          </View>
          <View >
            <Text h3 fonte='Poppins-Medium' style={{ marginRight: 16, marginTop: 4 }}>{formataMoeda(valor)}</Text>
            <StatusExtrato date={date} status={tipoTransacao} />
          </View>
        </View>


      </Card >
    </View >
  );
}
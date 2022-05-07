import React from 'react';
import { Dimensions, View } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import { formataMoeda } from '../../utils/formatacaoController';

export default function LimitesCategoria({ label, status }: { label: string, status: string }) {
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
          height: 40,
          borderRadius: 5,
          marginBottom: 2,
          justifyContent: 'center',
        }}
      >
        <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ marginRight: 32, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={'air-filter'} size={28} color={terciaria} />
            <Text h4 fonte={'Poppins-Medium'} style={{ marginLeft: 16, marginTop: 4 }}>{label}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text fonte='Poppins-Medium' style={{ marginRight: 16, marginTop: 4 }}>{status}</Text>
            <Icon name="chevron-right" style={{ marginRight: 16 }} size={28} />
          </View>
        </View>

      </Card >
    </View >
  );
}
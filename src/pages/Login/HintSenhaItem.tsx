import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';

export default function HintSenhaItem({ label, preenchido }: { label: string; preenchido: boolean }) {
  const {
    cores: { indicadorPositivo, indicadorNegativo },
  } = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginVertical: 4,
      }}
    >
      <Icon style={{ padding: -5, margin: -5 }} size={20} name={preenchido ? 'check-circle-outline' : 'close-circle-outline'} color={preenchido ? indicadorPositivo : indicadorNegativo} />

      <Text fonte="Poppins-Medium" subtexto style={{ fontSize: 14, marginHorizontal: 10 }}>
        {label}
      </Text>

      {preenchido && <Icon style={{ padding: -5, margin: -5 }} size={20} name="check" color={indicadorPositivo} />}
    </View>
  );
}
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Screen from '../Screen';
import Text from '../Text';
import useTheme from '../../hooks/useTheme';

export default function Loading() {

  const {
    cores: {
      primaria,
    },
  } = useTheme();

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={primaria} />
        <Text fonte='Montserrat-Medium' subtexto style={{ marginTop: 10 }}>
          Carregando...
        </Text>
      </View>
    </Screen>
  );
}

import React from 'react';
import { View, Dimensions } from 'react-native';
import Placeholder from '../../../components/Placeholder';
import useTheme from '../../../hooks/useTheme';

export function NomeSkeleton() {
  const { borderRadius } = useTheme();
  const { width } = Dimensions.get('screen');
  return (
    <View>
      <View>
        <Placeholder borderRadius={borderRadius} width={width * 0.25} height={20} />
      </View>
    </View>
  );
}

export function GastosPorCategoriaSkeleton() {
  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
        width: '100%',
      }}
    >
      <Placeholder borderRadius={5} width={width - 32} height={200} />
    </View>
  )
}

export function ValorGeral() {
  return (
    <View style={{ position: 'absolute' }}>
      <Placeholder borderRadius={5} width={32} height={20} />
    </View>
  );
}
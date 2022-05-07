import React from 'react';
import { View, Dimensions } from 'react-native';
import Placeholder from '../../../components/Placeholder';

export function CardCategoriaSkeleton() {
  const { width } = Dimensions.get('screen');
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: '100%',
      }}>
      <Placeholder width={width * 0.90} height={22} borderRadius={6} />
    </View>
  );
};

export function ModalLimiteDeGastoSkeleton() {
  const { width } = Dimensions.get('screen');
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: '100%',
      }}>
      <Placeholder width={width * 0.80} height={48} borderRadius={6} />
    </View>
  );
};
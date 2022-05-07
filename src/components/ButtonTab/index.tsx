import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import useTheme from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import RadialGradient from 'react-native-radial-gradient'

export default function ButtonTab() {
  const {
    cores: { primaria, secundaria },
  } = useTheme();

  return (

    <View style={{ borderRadius: 30, marginBottom: 16, overflow: 'hidden', height: 60 }}>
      <RadialGradient
        style={[styles.container, { backgroundColor: primaria, }]}
        center={[100, 100]}
        stops={[0.1, 0.4, 0.3, 0.75]}
        radius={150}
        colors={[primaria, secundaria]}
      >
        <Icon name="plus" color={'#FFF'} size={36} />
      </RadialGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
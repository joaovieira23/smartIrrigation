import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Extrato from '../pages/Extrato';
import Despesas from '../pages/Despesas';
import Adicionar from '../pages/Adicionar';
import ButtonTab from '../components/ButtonTab';
import useTheme from '../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Orcamento from '../pages/Orcamento';

export type TabNavigatorParams = {
  Inicio: undefined;
  Dispositivos: undefined;
  Adicionar: undefined;
  Extrato: undefined;
  Despesas: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const Tabs = () => {
  const {
    cores: { destaquePrimaria },
  } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      //@ts-ignore
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Poppins-Medium'
        },
        tabStyle: {
          paddingVertical: 4,
        },
        activeTintColor: destaquePrimaria,
        adaptive: true,
        allowFontScaling: true,
        keyboardHidesTabBar: Platform.OS === 'android',
      }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({ size, color }) => (
          <Icon name="home-outline" size={size} color={color} />
        )
      }} name="Inicio" component={Home} />
      <Tab.Screen options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <ButtonTab />
        )
      }} name="Adicionar" component={Adicionar} />
      <Tab.Screen options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Icon name="access-point" size={size} color={color} />
        )
      }} name="Dispositivos" component={Orcamento} />
    </Tab.Navigator>
  );
}

export default Tabs;
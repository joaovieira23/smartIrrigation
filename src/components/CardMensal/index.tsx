import React from 'react';
import { View, Dimensions } from 'react-native'
import { useMonthSelected } from '../../context/MonthSelected'
import MonthPicker from './MonthPicker';

export default function CardMensal() {
  const { width } = Dimensions.get('screen');
  const { date, setDate } = useMonthSelected();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        width: '100%',
      }}
    >
      <View style={{
        width: width - 32,
        borderRadius: 35,
        height: 38,
        marginBottom: 24
      }}>
        <MonthPicker date={date} onChange={newDate => setDate(newDate)} />
      </View>
    </View >
  );
}
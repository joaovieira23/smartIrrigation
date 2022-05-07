import React from 'react';
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import Touchable from '../Touchable';
import { format, subMonths, isAfter } from 'date-fns'
import { addMonths } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';
import { isEqual } from 'lodash';

type MonthPickerProps = {
  date: Date;
  onChange: (newDate: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ date, onChange }) => {


  const handlePrev = () => {
    const newDate = subMonths(date, 1);
    onChange(newDate)
  }

  const handleNext = () => {

    const compareAfterDates = isAfter(new Date(), date);
    const compareIsEqualDates = isEqual(format(new Date(), 'MMMM, yyyy'), format(date, 'MMMM, yyyy'));

    if (!compareAfterDates || compareIsEqualDates) return;

    const newDate = addMonths(date, 1);
    onChange(newDate)
  }

  return (
    <View style={styles.row}>
      <Touchable onPress={handlePrev}>
        <Icon color='#3E8512' name="chevron-left" size={36} />
      </Touchable>
      <Text h2 style={{ textAlign: 'center' }} fonte='Montserrat-Medium'>{format(date, 'MMMM, yyyy', {
        locale: ptBR
      })}</Text>
      {(!Boolean(isAfter(new Date(), date))
        || !Boolean(isEqual(format(new Date(), 'MMMM, yyyy'), format(date, 'MMMM, yyyy')))) ?
        <Touchable style={{}} onPress={handleNext}>
          <Icon color='#3E8512' name="chevron-right" size={36} />
        </Touchable> : <View style={{ width: 36 }}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 35,

    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  }
})

export default MonthPicker;
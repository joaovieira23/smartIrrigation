import React, { Fragment, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import TextInput from '../Input';
import DateTimePicker from './ModalDateTimePicker';

import moment from 'moment-timezone';

interface DatePickerProps {
  label?: string;
  tintColor?: string;
  value: string;
  editable?: boolean;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  onChangeText: (val: string) => any;
  backgroundColor?: string;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

function DatePicker(props: DatePickerProps) {
  const [visivel, setVisivel] = useState(false);

  const editable = Object.keys(props).includes('editable') ? props.editable : true;

  if (Platform.OS !== 'ios') {
    return (
      <TextInput
        backgroundColor={props.backgroundColor}
        label={props.label}
        colorPlaceholder
        value={props.value}
        tintColor={props.tintColor}
        mask={{
          type: 'datetime',
          options: {
            format: 'DD/MM/YYYY',
          },
        }}
        placeholder={props.placeholder}
        editable={editable}
        error={props.error}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    );
  }

  const value =
    props.value === ''
      ? new Date()
      : typeof props.value === 'string'
        ? moment(props.value, 'DD/MM/YYYY').toDate()
        : props.value;

  return (
    <Fragment>
      <DateTimePicker
        isVisible={visivel}
        date={value}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        onConfirm={(date: Date) => {
          props.onChangeText(moment(date).format('DD/MM/YYYY'));
          setVisivel(false);
        }}
        onCancel={() => setVisivel(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!editable) {
            return;
          }

          requestAnimationFrame(() => setVisivel(true));
        }}
      >
        <TextInput
          backgroundColor={props.backgroundColor}
          label={props.label}
          pointerEvents="none"
          colorPlaceholder
          value={props.value}
          placeholder={props.placeholder}
          tintColor={props.tintColor}
          mask={{
            type: 'datetime',
            options: {
              format: 'DD/MM/YYYY',
            },
          }}
          editable={props.editable}
          error={props.error}
          onChangeText={() => null}
        />
      </TouchableOpacity>
    </Fragment>
  );
}

export default DatePicker;

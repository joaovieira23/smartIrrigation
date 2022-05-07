import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import InputLabel from './InputLabel';
import useTheme from '../../hooks/useTheme';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';

export interface CustomTextInputProps extends Omit<RNTextInputProps, 'value'> {
  tintColor?: string;
  inactiveBorderColor?: string;
  backgroundColor?: string;
  label?: string;
  mask?: {
    type: TextInputMask['props']['type'];
    options?: TextInputMask['props']['options'];
  };
  value: string | number | undefined;
  deleteOption?: boolean;
  loading?: boolean;
  icon?: string;
  error?: string;
  allowPaste?: boolean;
  colorPlaceholder?: boolean | undefined;
  disableInput?: boolean
  showEye?: boolean;
  editar?: boolean;
  onFocus?: () => any;
  onBlur?: () => any;
  onChangeRawValue?: (newValue: string | number) => any;
}

function TextInput(props: CustomTextInputProps) {
  const inputRef = useRef<RNTextInput | TextInputMask>(null);

  const [ignorarSecureInput, setIgnorarSecureInput] = useState(false);
  const [focused, setFocus] = useState(false);
  const {
    cores: {
      destaque100,
      texto: { enfase },
      input: { placeholder, defaultSelecionado, erro },
    },
  } = useTheme();

  const backgroundLabel = 'white';

  const onFocus = useCallback(() => {
    setFocus(true);

    if (typeof props.onFocus === 'function') {
      props.onFocus();
    }
  }, [props]);

  const onBlur = useCallback(() => {
    setFocus(false);

    if (typeof props.onBlur === 'function') {
      props.onBlur();
    }
  }, [props]);

  const editable = !(typeof props.editable === 'boolean' && props.editable === false);

  let InputComponent: typeof RNTextInput | typeof TextInputMask = RNTextInput;

  if (props.mask && props.mask.type) {
    InputComponent = TextInputMask;
  }

  const inputProps = useMemo(() => {
    if (props.mask && props.mask.type) {
      return {
        ...props,
        mask: undefined,
        type: props.mask.type,
        options: props.mask.options,
        backgroundColor: 'transparent',
      };
    } else {
      return { ...props, backgroundColor: 'transparent' };
    }
  }, [props]);

  return (
    <>
      <View
        style={{
          borderColor: props.error
            ? erro
            : !focused || !editable
              ? props.inactiveBorderColor || 'rgba(94, 107, 87, 1)'
              : props.tintColor || defaultSelecionado,
          borderBottomWidth: 1,
          height: 45,
          alignItems: 'flex-start',
          marginBottom: props.error ? 2 : 16,
          justifyContent: 'center',
          borderRadius: 5,
          // @ts-ignore
          width: props.style && props.style.width ? props.style.width : '100%',
          backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent',
        }}
      >


        {props.label ? (
          <InputLabel
            focused={Boolean(focused || props.value || [0, '0', '0,00'].includes(props.value))}
            error={false}
            icon={props.icon}
            label={props.label}
            placeholderColorWhite={props.colorPlaceholder}
            activeColor={
              props.error
                ? erro
                : !editable
                  ? props.inactiveBorderColor || placeholder
                  : props.tintColor || defaultSelecionado
            }
            inactiveColor={props.inactiveBorderColor || placeholder}
            backgroundColor={props.backgroundColor || backgroundLabel}
          />
        ) : null}


        <View style={{
          width: '100%',
          flexDirection: 'row',
        }}>
          {props.icon && !focused && !props.value && <Icon name={props.icon} style={{ marginRight: 4, alignSelf: 'center' }} size={20} color={placeholder} />}
          <InputComponent
            type="only-numbers"
            {...inputProps}
            //@ts-ignore
            value={props.value}
            ref={inputRef}
            style={{
              width: '100%',
              borderLeftWidth: 0,
              borderRightWidth: 0,
              alignItems: 'baseline',
              paddingBottom: 0,
              borderTopWidth: 0,
              fontFamily: 'Poppins-Medium',
              color: props.disableInput ? 'rgba(90, 90, 99, 1)' : '',
              fontSize: 14
            }}
            placeholder={!props.label ? props.placeholder : undefined}
            placeholderTextColor={focused ? destaque100 : placeholder}
            scrollEnabled={false}
            includeRawValueInChangeText={true}
            onFocus={onFocus}
            onBlur={onBlur}
            underlineColorAndroid="transparent"
            secureTextEntry={inputProps.secureTextEntry && !ignorarSecureInput}
            contextMenuHidden={inputProps.allowPaste || !inputProps.secureTextEntry}
            returnKeyType={
              !__DEV__ && props.mask && ['only-numbers', 'money', 'cpf', 'cel-phone'].includes(props.mask.type)
                ? 'done'
                : 'default'
            }
            onChangeText={(val: string, raw?: string) => {
              if (props.onChangeText) {
                props.onChangeText(val);
              }
              typeof props.onChangeRawValue === 'function' && props.onChangeRawValue(raw || val);
            }}
          />
        </View>

        {Boolean((props.deleteOption || props.loading) && editable && props.value && props.value !== '' && focused) && (
          <View
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFill, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
          >
            <View pointerEvents="none" style={{ flex: 1 }} />

            {props.loading ? <ActivityIndicator style={{ paddingHorizontal: 10 }} color={destaque100} size="small" /> : null}

            {props.deleteOption ? (
              <View style={{ zIndex: 99 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (props.onChangeText && typeof props.onChangeText === 'function') {
                      props.onChangeText('');
                    }
                  }}
                >
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}

        {props.editar && (
          <View
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFill, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <View pointerEvents="none" style={{ flex: 1 }} />
            <Icon name='pencil-outline' size={22} />
          </View>
        )}



        {props.showEye && props.secureTextEntry && editable && props.value && props.value !== '' ? (
          <View
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFill, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
          >
            <View pointerEvents="none" style={{ flex: 1 }} />
            <TouchableWithoutFeedback
              onPress={() => {
                setIgnorarSecureInput(!ignorarSecureInput);
              }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <MaterialCommunityIcons
                  name={ignorarSecureInput ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={props.tintColor || enfase}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
      </View>

      {Boolean(props.error) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text fonte='Poppins-Medium' h5 style={{ color: erro, marginBottom: 8 }}>
            {props.error}
          </Text>
        </View>
      )}
    </>
  );
}

export default TextInput;

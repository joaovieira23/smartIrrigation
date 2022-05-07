import React, { useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable';

function InputLabel(props) {
  const viewRef = useRef<Animatable.View>(null);
  const labelRef = useRef<Animatable.Text>(null);
  const { focused, label } = props;


  const estiloFocado = {
    view: {
      height: 24,
      top: -16,
      left: props.icon ? -18 : -2,
    },
    input: {
      paddingHorizontal: 5,
      backgroundColor: props?.placeholderColorWhite ? '#FFFFFF' : '#F1F2F6',
      fontSize: 12,
      color: props.activeColor,
    },
  };

  const estiloNaoFocado = {
    view: {
      top: 0,
      height: 42,
      left: 5,
    },
    input: {
      paddingLeft: props.icon ? 5 : 0,
      backgroundColor: props?.placeholderColorWhite ? '#FFFFFF' : '#F1F2F6',
      marginLeft: props.icon ? 16 : 0,
      fontSize: 15,
      color: props.inactiveColor,
    },
  };

  useEffect(() => {
    if (viewRef && viewRef.current && viewRef.current.transitionTo) {
      viewRef.current.transitionTo(focused ? estiloFocado.view : estiloNaoFocado.view);
    }
  }, [estiloFocado.view, estiloNaoFocado.view, focused, props.activeColor, props.inactiveColor]);

  useEffect(() => {
    if (labelRef && labelRef.current && labelRef.current.transitionTo) {
      labelRef.current.transitionTo(focused ? estiloFocado.input : estiloNaoFocado.input);
    }
  }, [estiloFocado.input, estiloNaoFocado.input, focused, props.activeColor, props.inactiveColor]);

  return (
    <Animatable.View
      // @ts-ignore
      ref={viewRef}
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          justifyContent: 'center',
          borderRadius: 5,
        },
        props.focused ? estiloFocado.view : estiloNaoFocado.view,
      ]}
    >
      <Animatable.Text
        // @ts-ignore
        ref={labelRef}
        style={[{ fontSize: 15, color: props.inactiveColor, fontFamily: 'Poppins-Medium', marginTop: 8 }, focused ? estiloFocado.input : estiloNaoFocado.input]}
      >
        {label}
      </Animatable.Text>
    </Animatable.View >
  );
}

export default InputLabel;

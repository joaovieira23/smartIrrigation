import React, { Fragment, useMemo } from 'react';
import { Text as RNText, Platform } from 'react-native';
import useTheme from '../../hooks/useTheme';

type Fontes = 'Poppins-Medium' | 'Poppins-Bold' | 'Montserrat-Medium' | 'Montserrat-Bold' | 'Poppins-Light'

export type TextProps = {
  enfase?: boolean;
  subtexto?: boolean;
  desabilitado?: boolean;
  fonte?: Fontes;
  link?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
} & RNText['props'];

function Text(props: TextProps) {
  const {
    cores: {
      texto: { enfase, subtexto, desabilitado, link },
    },
  } = useTheme();

  const corTexto = useMemo(() => {
    if (props.enfase) {
      return enfase;
    } else if (props.subtexto) {
      return subtexto;
    } else if (props.desabilitado) {
      return desabilitado;
    } else if (props.link) {
      return link;
    }
  }, [props.enfase, props.subtexto, props.desabilitado, props.link, enfase, subtexto, desabilitado, link]);

  const tamanhoFonte = useMemo(() => {
    if (props.h1) {
      return Platform.OS === 'ios' ? 29 : 28;
    } else if (props.h2) {
      return Platform.OS === 'ios' ? 21 : 20;
    } else if (props.h3) {
      return Platform.OS === 'ios' ? 17 : 16;
    } else if (props.h4) {
      return Platform.OS === 'ios' ? 15 : 14;
    } else if (props.h5) {
      return Platform.OS === 'ios' ? 13 : 12;
    } else if (props.h6) {
      return Platform.OS === 'ios' ? 11 : 10;
    }
  }, [props.h1, props.h2, props.h3, props.h4, props.h5, props.h6]);

  const style = [
    { color: corTexto || subtexto },
    { fontFamily: props.fonte || 'Montserrat' },
    tamanhoFonte ? { fontSize: tamanhoFonte } : {},
    props.style,
  ] as RNText['props'];

  return (
    <Fragment>
      <RNText {...props} style={style} />
    </Fragment>
  );
}

export default Text;

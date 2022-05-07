import CircleCheckBox from 'react-native-circle-checkbox';
import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import useTheme from '../../hooks/useTheme';

type IPropsTipoPlano = 'Anual' | 'Mensal'

export default function CardSelecionaPlano(props: {
  tipoPlano: IPropsTipoPlano
  selecionado: boolean
}) {
  const {
    cores: {
      primaria,
      borda,
      surface,
      placeholderButton,
      texto: { subtexto },
    },
  } = useTheme();

  return (
    <View
      style={{
        backgroundColor: props.selecionado ? '#F1F2F6' : surface,
        flexDirection: 'row',
        borderRadius: 8,
        paddingVertical: 16,
        borderWidth: props.selecionado ? 1 : 0,
        borderColor: borda,
        marginVertical: 8,
      }}
    >

      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 16 }}>
        <View style={{ flexDirection: 'row' }}>

          <CircleCheckBox
            checked={props.selecionado}
            outerColor={primaria}
            innerColor={primaria}
            filterColor={surface}
          />
          <Text fonte="Poppins-Bold" style={{ marginLeft: 8, alignSelf: 'center' }}>
            {props.tipoPlano === 'Mensal' ? 'Plano Mensal - R$11,90/mês'
              : 'Plano Anual - R$9,90/mês '}
          </Text>
        </View>

        {props.tipoPlano === 'Anual' && <View style={{ flexDirection: 'row', marginLeft: 34 }}>
          <View>
            <Text fonte="Poppins-Medium" subtexto h6 style={{ color: subtexto, justifyContent: 'flex-end' }}>
              R$ 118,80 Total anual
            </Text>
          </View>
          <View style={{ marginLeft: 24, backgroundColor: placeholderButton, height: 18, width: 100, alignItems: 'center', borderRadius: 5 }}>
            <Text fonte="Poppins-Medium" subtexto h6 style={{ color: subtexto, justifyContent: 'flex-end' }}>
              Economize 15%
            </Text>
          </View>
        </View>}
      </View>
    </View>
  );
}

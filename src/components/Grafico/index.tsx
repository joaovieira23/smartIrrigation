import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Text from '../../components/Text';
import { VictoryGroup, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
import moment from 'moment';
import useTheme from '../../hooks/useTheme';
import Touchable from '../../components/Touchable';

interface Props {
  loading?: boolean;
  tituloGrafico?: string;
  label?: string;
  grafico: Record<string, number>;
  esconderBenchmark?: boolean;

  height?: number;

  onBenchmarkSelect?: (benchmark: string) => void;
}

export default function Grafico(props: Props) {
  const {
    cores: { placeholder, primaria, secundaria },
  } = useTheme();
  const { width } = Dimensions.get('screen');
  const { label, grafico, loading } = props;

  if ((!grafico || Object.keys(grafico).length <= 2) && !loading) {
    return (
      <View style={{ height: 120, marginLeft: 46, alignItems: 'center', justifyContent: 'center' }}>
        <Text fonte='Poppins-Bold' subtexto>Ainda não há dados de umidade</Text>
      </View>
    );
  }

  function transformaGrafico(pontos: Record<string, number>) {
    return Object.keys(pontos).reduce(
      (obj, timestamp) => [
        ...obj,
        {
          // x: parseFloat(timestamp),
          y: pontos[timestamp],
        },
      ],
      [],
    );
  }

  function geraLegenda(pontos: Record<string, number>) {
    const timestamps = Object.keys(pontos).sort();

    const dataInicial = moment(parseFloat(timestamps[0]));
    const dataFinal = moment(parseFloat(timestamps[timestamps.length - 1]));

    return [
      dataInicial.isValid() ? dataInicial.format('MM/YYYY') : '',
      dataFinal.isValid() ? dataFinal.format('MM/YYYY') : '',
    ];
  }

  const legenda = geraLegenda({
    ...grafico,
  });


  return (
    <View style={{ paddingHorizontal: 0, paddingVertical: 10, }}>
      <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>

        <VictoryChart >
          <VictoryGroup
            x={0}
            height={props.height ? props.height : 100}
            padding={{
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          >


            <VictoryLine
              data={
                loading
                  ? [
                    {
                      x: 0,
                      y: 0,
                    },
                    {
                      x: 1,
                      y: 1,
                    },
                  ]
                  : transformaGrafico(grafico)
              }
              padding={0}
              style={{
                data: { stroke: loading ? placeholder : primaria, strokeWidth: 2.5 },
              }}
            />

          </VictoryGroup>
        </VictoryChart>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text h6 subtexto>
            {legenda[0]}
          </Text>

          <Text h6 subtexto style={{ marginRight: 82 }}>
            {legenda[1]}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: loading ? placeholder : primaria,
                marginRight: 5,
              }}
            />
            <Text h6 subtexto>
              {label}
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}

import React from 'react';
import { Dimensions, View } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import useTheme from '../../hooks/useTheme';
import Text from '../../components/Text';
import { ValorGeral } from './Skeleton'
import { formataMoeda } from '../../utils/formatacaoController';

interface Props {
  status: 'Positivo' | 'Negativo' | 'Neutro';
  loading: boolean,
  dadosAtivos: {
    valorMaisRecente: number;
  }[];
  isLoading?: boolean;
  loadingChangeDate?: boolean;
  disponivel: number
}

export default function GraficoCategoria(props: Props) {
  const { isLoading, loadingChangeDate, dadosAtivos } = props;
  const { width } = Dimensions.get('window');

  const {
    cores: {
      placeholder,
      secundaria,
      indicadorNegativo
    },
  } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <VictoryPie
        padding={{
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
        width={0.325 * width}
        height={0.35 * width}
        innerRadius={0.12 * width}
        standalone={true}
        colorScale={(isLoading)
          ? [placeholder]
          : [props.status === 'Positivo'
            ? secundaria
            : indicadorNegativo]}
        labels={({ datum }) => `y: ${datum.y}`}
        labelComponent={<VictoryLabel angle={45} />}
        data={dadosAtivos?.map((item, index) => ({
          y: item.valorMaisRecente,
          color: props.status === 'Positivo'
            ? secundaria
            : indicadorNegativo,
        }))}
      />

      {props.loading ? <ValorGeral /> : <Text h5 fonte='Poppins-Bold' style={{ textAlignVertical: "center", position: 'absolute', textAlign: "center", }}>{`${formataMoeda(props.disponivel, false, 2)} \ndisponível`}</Text>}
    </View>

  );
}

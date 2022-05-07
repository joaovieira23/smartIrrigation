import React from 'react';
import { Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import useTheme from '../../hooks/useTheme';

interface Props {
  coresBalanceamento: string[];
  dadosAtivos: {
    label: string;
    valorMaisRecente: number;
    data: number;
    vencimento: string | null;
  }[];
  isLoading?: boolean;
}

export default function GraficoAlocacao(props: Props) {
  const { coresBalanceamento, isLoading, dadosAtivos } = props;
  const { width } = Dimensions.get('window');

  const {
    cores: { placeholder },
  } = useTheme();

  return (
    <VictoryPie
      padding={{
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
      width={0.525 * width}
      height={0.35 * width}
      innerRadius={0.1 * width}
      standalone={true}
      colorScale={isLoading ? [placeholder] : coresBalanceamento}
      labels={() => ''}
      data={dadosAtivos?.map((item, index) => ({
        x: item.label,
        y: item.valorMaisRecente,
        color: coresBalanceamento[index],
      }))}
    />
  );
}

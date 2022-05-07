import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import { useQuery } from 'react-query';
import { useMonthSelected } from '../../context/MonthSelected';
import SummaryController from '../../controllers/Summary.controller'
import Placeholder from '../../components/Placeholder';
import GraficoHome from '../../components/Grafico';

interface Props {
	testID?: string;
	type: string;
	onPress?: () => void;
	titulo: string;
	valor?: number;
	dispositivo: string;
	loading?: boolean;
	variacaoPercentualHoje?: number;
}

function CardTotalHojeSkeleton() {
	const { width } = Dimensions.get('screen');

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 30,
				width: '100%',
			}}
		>
			<Card
				style={{
					width: width * 0.94,
					height: 110,
					borderRadius: 5,
					justifyContent: 'center',
				}}
			>
				<View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
					<View style={{ marginBottom: 10 }}>
						<Text
							subtexto
							style={{
								includeFontPadding: false,
								fontSize: 14,
							}}
						>
							Total
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Placeholder width={width * 0.5} height={24} />
					</View>
				</View>
			</Card>
		</View>
	);
}

function CardTotalHoje(props: Props) {
<<<<<<< HEAD
	const { type, titulo, dispositivo } = props;
	const { date } = useMonthSelected();
	const [isLoadingMonth, setIsLoadingMonth] = useState(false);

	const { data: meterings, isLoading: isLoadingMeterings, refetch: refetchMeterings } = useQuery(['solil-humidity', { device_id: dispositivo }], async () => {
		const data = await SummaryController.getSummary({ month: '04', type: 'soil', dispositivo });
		return data;
	});

	const { data: meteringsAir, isLoading: isLoadingAir, refetch: refetchMeteringsAir } = useQuery(['air-humidity', { device_id: dispositivo }], async () => {
		const data = await SummaryController.getSummary({ month: '04', type: 'air', dispositivo });
		return data;
	});

	useEffect(() => {
		setIsLoadingMonth(true);
		refetchMeteringsAir();
		refetchMeterings();
	}, [date])


	if (isLoadingAir || isLoadingMeterings) {
		return <CardTotalHojeSkeleton />;
	}

	const { width } = Dimensions.get('screen');

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 8,
				width: '100%',
			}}
		>
			<Card
				style={{
					width: width - 32,
					borderRadius: 5,
				}}
			>
				<View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

						<Text
							fonte="Poppins-Medium"
							subtexto
							h2
							style={{
								includeFontPadding: false,
								paddingTop: 5,
							}}
						>
							{titulo}
						</Text>

					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ marginVertical: 12, display: 'flex', justifyContent: 'center' }} >
							<GraficoHome
								loading={false}
								tituloGrafico={'Umidade do Solo'}
								label="umidade"
								grafico={type === 'ar' ? meteringsAir : meterings}
								height={200}
								esconderBenchmark={false}
							/>
						</View>
					</View>

				</View>
			</Card>
		</View>
	);
=======
  const { valor, loading } = props;
  const { date } = useMonthSelected();
  const [isLoadingMonth, setIsLoadingMonth] = useState(false);

  const { data: budgets } = useQuery('budgets', BudgetController.getBudgets);
  const currentBudget = budgets?.length ? budgets[0] : null;

  const { data: summary, isLoading, refetch } = useQuery(['summary', { month: date }], async () => {
    const data = await SummaryController.getSummary({ budgetId: currentBudget?.id, date: format(date, 'yyyy-MM') });
    return data;
  }, {
    enabled: Boolean(currentBudget)
  });


  useEffect(() => {
    setIsLoadingMonth(true);
    refetch();
  }, [date])


  const {
    cores: {
      destaque100,
    },
  } = useTheme();

  if ((!valor || valor === 0) && loading && isLoading) {
    return <CardTotalHojeSkeleton />;
  }

  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        width: '100%',
      }}
    >
      <Card
        style={{
          width: width - 32,
          borderRadius: 5,
        }}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text
              fonte="Poppins-Medium"
              subtexto
              h2
              style={{
                includeFontPadding: false,
                paddingTop: 5,
              }}
            >
              Visão Geral
            </Text>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{ marginVertical: 12, display: 'flex', justifyContent: 'center' }} >
              <GraficoHome
                loadingChangeDate={isLoadingMonth}
                loading={isLoading}
                status={summary?.result >= 0 ?
                  'Positivo' : summary?.result < 0
                    ? 'Negativo'
                    : 'Neutro'}
                disponivel={summary?.result}
                dadosAtivos={[{ "valorMaisRecente": 10 }]}
              />
              <Text
                h5
                fonte={'Poppins-Medium'}
                style={{
                  textAlign: 'center', color: summary?.result < 0
                    ? 'rgba(228, 12, 10, 1)'
                    : destaque100
                }}>
                {summary?.result < 0
                  ? 'Não está conseguindo \njuntar neste mês'
                  : `Está juntando \n${formataMoeda(summary?.result)}`}
              </Text>
            </View>
            <View style={{ margin: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon style={{ marginRight: 4 }} name={'plus-circle-outline'} size={24} />
                <View style={{ flexDirection: 'column', marginBottom: 16 }}>
                  <Text fonte={'Poppins-Medium'} >Você recebeu</Text>
                  <Text fonte={'Poppins-Medium'}>{summary?.incomes ? formataMoeda(summary?.incomes) : formataMoeda(0)}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Icon style={{ marginRight: 4 }} name={'minus-circle-outline'} size={24} />
                <View style={{ flexDirection: 'column', marginBottom: 16 }}>
                  <Text fonte={'Poppins-Medium'} >Você gastou</Text>
                  <Text fonte={'Poppins-Medium'}>{formataMoeda(summary?.expenses)}</Text>
                </View>
              </View>

              <Status status={summary?.result > 0 ? 'Positivo' : summary?.result < 0 ? 'Negativo' : 'Neutro'} />
            </View>
          </View>

        </View>
      </Card>
    </View>
  );
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
}

export default CardTotalHoje;


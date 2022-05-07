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
}

export default CardTotalHoje;


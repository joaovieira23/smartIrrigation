import React from 'react';
import { Dimensions, View } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import Placeholder from '../../components/Placeholder';
import { useMonthSelected } from '../../context/MonthSelected'
import { format } from 'date-fns';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import BudgetController from '../../controllers/Budget.controller'
import SummaryController from '../../controllers/Summary.controller'
import { useQuery } from 'react-query';

interface Props {
  onPress: () => void;
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
  const { data: devices, isLoading } = useQuery('devices', BudgetController.getDevices);
  //@ts-ignore
  const { width } = Dimensions.get('screen');

  if (isLoading || !devices.data) {
=======
  const { date } = useMonthSelected();
  const { data: budgets, isLoading } = useQuery('budgets', BudgetController.getBudgets);
  const currentBudget = budgets[0];

  const { data: summary } = useQuery(['summary', { month: date }], async () => {
    const data = await SummaryController.getSummary({ budgetId: currentBudget?.id, date: format(date, 'yyyy-MM') });
    return data;
  }, {
    enabled: Boolean(currentBudget)
  });

  const { width } = Dimensions.get('screen');

  const {
    cores: {
      secundaria,
      indicadorNegativo,
      indicadorNeutro
    },
  } = useTheme();

  if (isLoading) {
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
    return <CardTotalHojeSkeleton />;
  };

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
        <Touchable onPress={props.onPress}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
              <View>
                <Text
                  fonte="Poppins-Medium"
                  subtexto
                  h4
                  style={{
                    includeFontPadding: false,
                    color: 'rgba(83, 153, 28, 1)',
                    paddingTop: 5,
                  }}
                >
                  Renda Mensal
                </Text>

<<<<<<< HEAD
              <Text
                fonte="Poppins-Medium"
                subtexto
                h4
                style={{
                  includeFontPadding: false,
                  paddingTop: 5,
                }}
              >
                Número de Dispositivos Cadastrados
              </Text>

              <Icon name="pen" size={28} />
            </View>

            <Text
              fonte="Poppins-Medium"
              enfase
              h2
              style={{
                marginBottom: 5,
              }}
            >
              {devices.data.amountActive + devices.data.amountInactive} unidade(s)
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: 'green', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Ativos
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    {devices.data.amountActive} disp.
                  </Text>
                </View>
=======
                <Text fonte="Poppins-Medium" enfase h3>
                  {formataMoeda(currentBudget?.salary)}
                </Text>
              </View>
              <View style={{ height: '100%', width: 1, backgroundColor: '#909090' }}></View>
              <View>
                <Text
                  fonte="Poppins-Medium"
                  subtexto
                  h4
                  style={{
                    includeFontPadding: false,
                    paddingTop: 5,
                    color: 'rgba(83, 153, 28, 1)'
                  }}
                >
                  Quero juntar
                </Text>

                <Text fonte="Poppins-Medium" enfase h3>
                  {formataMoeda(currentBudget?.goal)}
                </Text>
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
              </View>
            </View>
            <View>
              <Text style={{ textAlign: 'center', margin: 16 }} fonte="Poppins-Bold">Limite de Gastos</Text>

<<<<<<< HEAD
              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: '#5A5A63', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Inativos
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    {devices.data.amountInactive} disp.
                  </Text>
                </View>
=======
              <View>
                <Text h5 style={{
                  color: currentBudget.goal > currentBudget.salary ?
                    indicadorNegativo
                    : indicadorNeutro,
                  textAlign: 'center',
                }} fonte='Poppins-Medium'>
                  {`Disponível ${formataMoeda(currentBudget.salary - currentBudget.goal - summary?.categories.reduce((a, p) => a + p.expenses, 0))}`}
                </Text>
                <Progress.Bar
                  borderRadius={10}
                  height={16}
                  borderColor="#F1F2F6"
                  color={currentBudget.goal > currentBudget.salary
                    ? indicadorNegativo
                    : secundaria}
                  progress={currentBudget?.salary ? Math.abs(summary?.categories.reduce((a, p) => a + p.expenses, 0) / currentBudget?.salary) : 0}
                  width={320}
                />
                <Text h6 style={{ color: indicadorNeutro, textAlign: 'center' }} fonte='Poppins-Medium'>
                  {currentBudget?.salary > summary?.categories.reduce((a, p) => a + p.expenses, 0)
                    ? `Previsto ${formataMoeda(summary?.categories.reduce((a, p) => a + p.expenses, 0))} de ${formataMoeda(currentBudget.salary - currentBudget.goal)}`
                    : `Você excedeu ${formataMoeda(summary?.categories.reduce((a, p) => a + p.expenses, 0))} do seu limite de ${formataMoeda(currentBudget.salary - currentBudget.goal)}`}
                </Text>
>>>>>>> 55c033d857d6bfbd833359408ea9b32999e31fe1
              </View>
            </View>
          </View>
        </Touchable>
      </Card>
    </View >
  );
}

export default CardTotalHoje;

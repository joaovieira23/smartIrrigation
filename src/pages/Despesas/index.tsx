import React, { useEffect } from 'react';
import Text from '../../components/Text';
import Status from '../../pages/Home/Status';
import CardMensal from '../../components/CardMensal';
import CardDespesas from './CardDespesas';
import { View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { VictoryPie } from 'victory-native';
import BudgetController from '../../controllers/Budget.controller';
import CategoriesController from '../../controllers/Categories.controller';
import SummaryController from '../../controllers/Summary.controller';
import Header from '../../components/Header'
import { formataMoeda } from '../../utils/formatacaoController';
import { useQuery } from 'react-query'
import { ValorGeral } from '../Home/Skeleton';
import { format } from 'date-fns'
import { useMonthSelected } from '../../context/MonthSelected'

export default function Despesas() {
  const { width } = Dimensions.get('screen');
  const { data: budgets } = useQuery('budgetsId', BudgetController.getBudgets);
  const currentBudget = budgets?.length ? budgets[0] : null;
  const { date } = useMonthSelected();

  const { data: categories } = useQuery(
    ['categories', { budget: currentBudget?.id, month: date }],
    () => (currentBudget ? CategoriesController.getBudgetCategories({ budget_id: currentBudget?.id }) : []),
    {
      enabled: Boolean(currentBudget),
    },
  );

  const { data: summary, refetch, isLoading: isLoadingSummary } = useQuery(['summary', { month: date }], async () => {
    const data = await SummaryController.getSummary({ budgetId: currentBudget?.id, date: format(date, 'yyyy-MM') });
    return data;
  }, {
    enabled: Boolean(currentBudget),
  });

  useEffect(() => {
    refetch();
  }, [date])

  const colors = [
    '#316214',
    '#4A911C',
    '#A3DE78',
    '#6FB736',
    '#92D162',
    '#63AA2E',
    '#78BD42',
    '#95DE50',
    '#7BC43F',
    '#9BD76d',
    '#63AA2E',
    '#81C44D',
    '#569E25',
    '#88D147',
    '#3E8512',
    '#89CA58',
    '#ACE482'
  ];

  const dadosAtivos = categories?.map((ct) => {
    return {
      name: ct.name,
      goal: ct.goal,
    }
  })

  return (
    <SafeAreaView>
      <ScrollView style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Header title={'Resumo'} />
        <View>
          <View
            style={{ paddingVertical: 10, paddingHorizontal: 15 }}
          >
            <CardMensal />
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 10,
                marginTop: 20,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <VictoryPie
                    padding={{
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                    }}
                    width={0.35 * width}
                    innerRadius={0.12 * width}
                    standalone
                    data={dadosAtivos?.map((item, index) => ({
                      x: item.name,
                      y: item.goal,
                      color: colors[index],
                    }))}
                    height={0.45 * width}
                    labels={() => ''}
                    colorScale={colors.map((item) => item)}
                  />
                  {isLoadingSummary ? <ValorGeral /> :
                    <Text h5 fonte='Poppins-Bold'
                      style={{
                        textAlignVertical: "center",
                        position: 'absolute',
                        textAlign: "center",
                      }}>
                      {summary?.result ?
                        formataMoeda(summary?.result)
                        : formataMoeda(0)
                      }
                    </Text>}
                </View>

              </View>
              <View style={{ marginLeft: 16 }}>
                <View style={{ marginLeft: 8 }}>
                  <Status status="Positivo" />
                </View>
                {dadosAtivos?.map((item, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ marginLeft: 24, marginRight: 8, width: 12, height: 12, backgroundColor: colors[index], borderRadius: 12 }} />

                    <Text fonte={'Poppins-Bold'} h4 subtexto>
                      {item.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {summary?.categories?.map((ct, index) => {
              return (
                <>
                  <CardDespesas key={index} percentual={ct?.budgetPercentage} icon={ct.icon} label={ct.name} valor={ct.result} />
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
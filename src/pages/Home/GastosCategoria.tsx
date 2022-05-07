import React, { useState } from 'react';
import { Dimensions, View, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import { useQuery } from 'react-query'
import SummaryController from '../../controllers/Summary.controller'
import BudgetController from '../../controllers/Budget.controller'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { formataMoeda } from '../../utils/formatacaoController';
import { GastosPorCategoriaSkeleton } from './Skeleton'
import { format } from 'date-fns'
import useTheme from '../../hooks/useTheme';
import { useMonthSelected } from '../../context/MonthSelected'

export default function GastosPorCategoria() {
  const { width } = Dimensions.get('screen');
  const [posicaoAberta, setPosicaoAberta] = useState(1);
  const { data: budgets, isLoading: isLoadingBudgets } = useQuery('budgets', BudgetController.getBudgets);
  const currentBudget = budgets?.length ? budgets[0] : null;
  const { date } = useMonthSelected();


  const { data: summary, isLoading: isLoadingSummary } = useQuery(['summary', { month: date }], async () => {
    const data = await SummaryController.getSummary({ budgetId: currentBudget?.id, date: format(date, 'yyyy-MM') });
    return data;
  }, {
    enabled: Boolean(currentBudget)
  });

  const {
    cores: {
      indicadorNegativo,
      indicadorNeutro,
      destaquePrimaria,
      secundaria
    },
  } = useTheme();

  if (isLoadingBudgets && isLoadingSummary) {
    return <GastosPorCategoriaSkeleton />
  }

  return (

    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
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
              Gastos por categoria
            </Text>
          </View>
        </View>

        {summary?.categories.map((ct, index) => {
          return (
            <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon color={ct.expenses > ct?.goal ?
                  indicadorNegativo : ct.expenses > 0 &&
                    ct.expenses < ct.goal
                    ? secundaria
                    : indicadorNeutro}
                  name={ct.icon}
                  size={28}
                />
                <Text style={{ width: 70, textAlign: 'center' }} h6 fonte="Poppins-Medium" >{ct.name}</Text>
              </View>
              <View>
                <Text h5 style={{
                  color: ct.expenses > ct?.goal ?
                    indicadorNegativo
                    : indicadorNeutro,
                  textAlign: 'right',
                }} fonte='Poppins-Medium'>
                  {ct.expenses > ct?.goal &&
                    <Icon name="alert-outline" />
                  }
                  {ct.expenses > ct?.goal ?
                    `Excedeu ${formataMoeda(ct.expenses - ct.goal)}`
                    : `Disponível ${formataMoeda(ct.goal - ct.expenses)}`}
                </Text>
                <Progress.Bar
                  borderRadius={10}
                  height={12}
                  borderColor="#E5E6EC"
                  color={ct.expenses > ct?.goal
                    ? indicadorNegativo
                    : secundaria}
                  progress={ct.goal ? Math.abs(ct.expenses / ct.goal) : 0}
                  width={244}
                />
                <Text h5 style={{ color: indicadorNeutro }} fonte='Poppins-Medium'>
                  {`Gastou ${formataMoeda(ct.expenses)} de ${formataMoeda(ct.goal)}`}
                </Text>
              </View>
            </View>
          );
        }).slice(0, posicaoAberta * 2)}
        <View style={{ justifyContent: 'center' }} />
        {summary?.categories?.length > posicaoAberta * 2 &&
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderColor: 'rgba(0, 0, 0, .6)',
              borderTopWidth: StyleSheet.hairlineWidth,
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 5.1,
              marginTop: 8,
              width: '100%',
            }}
            onPress={() => setPosicaoAberta(posicaoAberta + 1)}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text link h5 style={{ marginRight: 18 }}>
                Ver todos os gastos
              </Text>
              <Icon name="chevron-down" color={destaquePrimaria} size={20} />
            </View>
          </TouchableOpacity>
        }
      </Card>
    </View>
  )
}
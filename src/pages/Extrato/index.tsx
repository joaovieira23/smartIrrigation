import React from 'react';
import CardMensal from '../../components/CardMensal';
import { ScrollView, SafeAreaView } from 'react-native';
import CardExtrato from './CardExtrato';
import { useQuery } from 'react-query';
import TransactionController from '../../controllers/Transactions.controller';
import BudgetController from '../../controllers/Budget.controller';
import CategoriesController, { Category } from '../../controllers/Categories.controller';
import Header from '../../components/Header'
import Text from '../../components/Text'
import { useMonthSelected } from '../../context/MonthSelected'
import { CardExtratoSkeleton } from './Skeleton'
import { queryClient } from '../../hooks';

interface TransactionsFormat {
  id: string,
  category: string,
  name: string,
  value: number,
  date: string,
  type: 'INCOME' | 'EXPENSE'

}

export default function Extrato() {
  const { data: budgets } = useQuery('budgetsId', BudgetController.getBudgets);
  const { date } = useMonthSelected();
  const currentBudget = budgets?.length ? budgets[0] : null;

  const { data: transactions, isLoading } = useQuery(
    ['transaction', { budget: currentBudget?.id, month: date }],
    () => (currentBudget ? TransactionController.getAllTransaction({ budgetId: currentBudget?.id }) : []),
    {
      enabled: Boolean(currentBudget),
    },
  );

  const { data: categories } = useQuery(
    ['categories', { id: currentBudget?.id, month: date }],
    () => (currentBudget ? CategoriesController.getBudgetCategories({ budget_id: currentBudget?.id }) : []),
    {
      enabled: Boolean(currentBudget),

      //@ts-ignore
      initialData: () =>
        queryClient.getQueryData<Category>(['category', { id: currentBudget?.id }]) ||
        queryClient.getQueryData<Category[]>('categories')?.find((b) => b.id),
    },
  );

  return (
    <SafeAreaView>
      <ScrollView style={{ marginVertical: 16 }}>
        <Header title={'Lançamentos'} />
        <CardMensal />
        {isLoading ? <>
          <CardExtratoSkeleton />
          <CardExtratoSkeleton />
          <CardExtratoSkeleton />
        </> :
          transactions?.length === 0 ?
            <Text fonte='Poppins-Bold' h3 style={{ textAlign: 'center', marginVertical: 64, padding: 12 }}>Não há lançamentos registrados para este período.</Text>
            : transactions?.map((t: TransactionsFormat, index: number) => {
              return (
                <CardExtrato
                  key={index}
                  date={t.date}
                  descricao={t.name}
                  tipoTransacao={t.type === 'INCOME' ? 'Receita' : 'Despesa'}
                  icon={categories?.find((i) => i.id === t.category)?.icon}
                  label={categories?.find((i) => i.id === t.category)?.name}
                  valor={t.value}
                />
              )
            })
        }
      </ScrollView>
    </SafeAreaView>
  );
}
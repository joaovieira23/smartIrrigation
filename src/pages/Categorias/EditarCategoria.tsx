import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../components/Text';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BudgetController from '../../controllers/Budget.controller';
import CategoriesController, { Category } from '../../controllers/Categories.controller';
import { useQuery } from 'react-query'

export type ScreenAdicionarCategoriaParam = {
  "Adicionar Categoria": { editar?: boolean, categoria?: Category };
};

export default function AdicionarCategoria({ editar }: { editar?: boolean }) {

  const navigation = useNavigation<StackNavigationProp<ScreenAdicionarCategoriaParam>>();
  const { data: budgets } = useQuery('budgets', BudgetController.getBudgets);

  const currentBudget = budgets?.length ? budgets[0] : null;

  const { data: categories } = useQuery(
    ['categories', { budget: currentBudget?.id }],
    () => (currentBudget ? CategoriesController.getBudgetCategories({ budget_id: currentBudget?.id }) : []),
    {
      enabled: Boolean(currentBudget),
    },
  );


  const {
    cores: {
      terciaria,
      indicadorNeutro
    },
  } = useTheme();
  const [tipoTransacao, setTipoTransacao] = useState<'Receita' | 'Despesa'>('Receita');

  return (
    <View style={{ padding: 16, display: 'flex', flex: 1, justifyContent: 'space-between' }}>
      <View >
        <Header goBack={() => navigation.goBack()} title={"Categorias"} />

        <View style={{ flexDirection: 'row', backgroundColor: '#F1F2F6', borderRadius: 5, marginBottom: 32, justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => setTipoTransacao('Receita')} style={{ padding: 16, width: '50%', borderBottomColor: terciaria, borderBottomWidth: tipoTransacao === 'Receita' ? 3 : 0 }}>
            <Text style={{ textAlign: 'center', color: tipoTransacao === 'Receita' ? terciaria : indicadorNeutro }} fonte='Poppins-Medium' h2>Receita</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTipoTransacao('Despesa')} style={{ padding: 16, width: '50%', borderBottomColor: terciaria, borderBottomWidth: tipoTransacao === 'Despesa' ? 3 : 0 }}>
            <Text style={{ textAlign: 'center', color: tipoTransacao === 'Despesa' ? terciaria : indicadorNeutro }} fonte='Poppins-Medium' h2>Despesa</Text>
          </TouchableOpacity>
        </View>

        {categories?.map((ct) => {
          return (
            <View style={{ padding: 12 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Adicionar Categoria", {
                editar: true,
                categoria: ct,
              })} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Icon name={ct.icon} color={terciaria} style={{ marginRight: 6 }} size={24} />
                  <Text style={{ textAlign: 'center', marginTop: 2 }} fonte="Poppins-Medium">{ct.name}</Text>
                </View>
                <Icon name={'pencil-outline'} size={20} />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: 'rgba(147, 158, 141, 1)',
                  borderBottomWidth: 1,
                  marginTop: 8
                }}
              />
            </View>
          );
        })}

        <TouchableOpacity onPress={() => navigation.navigate("Adicionar Categoria" as never, {} as never)} style={{ display: 'flex', marginTop: 32, borderWidth: 1, borderRadius: 12, padding: 10, borderColor: terciaria, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Icon style={{ marginRight: 16 }} color={terciaria} name="plus-circle-outline" size={28} />
          <Text style={{ color: terciaria }} h4 fonte="Poppins-Medium">Adicionar nova categoria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
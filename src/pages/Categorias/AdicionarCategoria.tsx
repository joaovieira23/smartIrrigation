import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity, View, Alert } from 'react-native';
import TextInput from '../../components/Input';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTheme from '../../hooks/useTheme';
import CategoriesController from '../../controllers/Categories.controller';
import BudgetController from '../../controllers/Budget.controller';
import { useQuery } from 'react-query'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AdicionarCategoria() {
  const {
    cores: { destaquePrimaria, placeholderButton, placeholderText },
  } = useTheme();

  const [icone, setIcone] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: budgets } = useQuery('budgets', BudgetController.getBudgets);
  const currentBudget = budgets?.length ? budgets[0] : null;

  const route = useRoute();
  //@ts-ignore
  const editar = route?.params?.editar
  //@ts-ignore
  const categoria = route?.params?.categoria

  async function addCategory() {
    if (Boolean(categoria.id) && Boolean(value) && Boolean(icone) && !editar) {
      setLoading(true);

      const category = await CategoriesController.createCategory({
        goal: 0,
        //@ts-ignore
        budget_id: currentBudget?.id,
        category_id: categoria.id,
        icone: icone
      })

      setLoading(false);

      Alert.alert('Sucesso', 'Categoria criada com sucesso.');

      return category;
    }
  }

  async function editCategory() {
    if (Boolean(categoria) && Boolean(icone)) {
      setLoading(true);
      const editCategory = await CategoriesController.editCategory({
        goal: categoria?.goal,
        //@ts-ignore
        budget_id: currentBudget?.id,
        name: nomeCategoria,
        category_id: categoria.id,
        icone
      })
      setLoading(false);

      Alert.alert('Sucesso', 'Categoria editada com sucesso.')

      return editCategory;
    }
  }

  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [nomeCategoria, setNomeCategoria] = useState(categoria?.name);
  const [items, setItems] = useState([
    {
      value: 'Receita',
      label: 'Receita'
    },
    {
      value: 'Despesa',
      label: 'Despesa',
    },
  ])

  const icones = ['food-fork-drink', 'weight-lifter', 'glass-mug-variant', 'warehouse', 'movie-open',
    'bag-personal', 'doctor', 'book-open-page-variant', 'google-controller', 'emoticon', 'cart-outline',
    'dog', 'bus', 'tshirt-v-outline', 'wallet-travel', 'baby-carriage', 'wifi', 'water-boiler', 'volleyball',
    'van-passenger', 'barcode-scan', 'airplane', 'blender', 'boom-gate'];

  return (
    <View style={{ padding: 16, display: 'flex', flex: 1, justifyContent: 'space-between' }}>
      <View style={{ marginTop: 32 }}>
        <Header iconePerfil goBack={() => navigation.goBack()} title={editar ? "Editar Categoria" : "Nova Categoria"} />
        {!editar &&
          <DropDownPicker
            placeholder={'Tipo de categoria'}
            textStyle={{
              fontFamily: 'Poppins-Medium'
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />}
        <View style={{ marginTop: 32 }}>
          <TextInput
            placeholderTextColor={'white'}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={novoNome => setNomeCategoria(novoNome.trim())}
            label="Nome da Categoria"
            value={nomeCategoria}
          />
        </View>
      </View>

      <View>

        <Text fonte="Poppins-Medium">Selecionar ícone</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
          {icones.map((ic, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => setIcone(ic)}>
                <Icon style={{ margin: 8, backgroundColor: icone === ic ? placeholderButton : placeholderText, borderRadius: 9, padding: 8 }} color={destaquePrimaria} name={ic} size={28} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Button loading={loading} onPress={() => editar ? editCategory() : addCategory()} label="Salvar" />
      </View>
    </View>
  );
}
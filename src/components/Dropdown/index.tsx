import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import useTheme from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DropDown() {
  const {
    cores: {
      destaquePrimaria
    },
  } = useTheme();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      value: 1,
      icon: () => <Icon color={destaquePrimaria} name='food-fork-drink' size={24} />,
      label: "Alimentação",
    },
    {
      value: 2,
      icon: () => <Icon color={destaquePrimaria} name='weight-lifter' size={24} />,
      label: "Academia",

    },
    {
      value: 3,
      icon: () => <Icon color={destaquePrimaria} name='glass-mug-variant' size={24} />,
      label: "Bares e Restaurantes",
    },
    {
      value: 4,
      icon: () => <Icon color={destaquePrimaria} name='warehouse' size={24} />,
      label: "Casa",
    },
    {
      value: 5,
      icon: () => <Icon color={destaquePrimaria} name='movie-open' size={24} />,
      label: "Lazer/Assinaturas",

    },
    {
      value: 6,
      icon: () => <Icon color={destaquePrimaria} name='bag-personal' size={24} />,
      label: "Compras",

    },
    {
      value: 7,
      icon: () => <Icon color={destaquePrimaria} name='doctor' size={24} />,
      label: "Saúde",
    },
    {
      value: 8,
      icon: () => <Icon color={destaquePrimaria} name='book-open-page-variant' size={24} />,
      label: "Educação",
    },
    {
      value: 9,
      icon: () => <Icon color={destaquePrimaria} name='google-controller' size={24} />,
      label: "Eletrônicos",
    },
    {
      value: 10,
      icon: () => <Icon color={destaquePrimaria} name='emoticon' size={24} />,
      label: "Hobbies",
    },
    {
      value: 11,
      icon: () => <Icon color={destaquePrimaria} name='cart-outline' size={24} />,
      label: "Mercado",
    },
    {
      value: 12,
      icon: () => <Icon color={destaquePrimaria} name='dog' size={24} />,
      label: "Pets",
    },
    {
      value: 13,
      icon: () => <Icon color={destaquePrimaria} name='bus' size={24} />,
      label: "Transporte",
    },
    {
      value: 14,
      icon: () => <Icon color={destaquePrimaria} name='tshirt-v-outline' size={24} />,
      label: "Vestuário",
    },
    {
      value: 15,
      icon: () => <Icon color={destaquePrimaria} name='wallet-travel' size={24} />,
      label: "Viagens",
    },

  ]);

  return (
    <DropDownPicker
      placeholder={'Selecione uma categoria'}
      textStyle={{
        fontFamily: 'Poppins-Medium'
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
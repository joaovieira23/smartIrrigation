import React, { useEffect, useState } from 'react';
import { View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import useTheme from '../hooks/useTheme';
import Text from '../components/Text';
import Button from '../components/Button';
import CardCompra from '../components/CardCompra';
import { useNavigation } from '@react-navigation/native';
import Purchases from 'react-native-purchases';
import PackageItem from '../components/CardCompra/PackageItem'

export default function Adesao() {

  const {
    cores: { destaque100, placeholderText },
  } = useTheme();

  const [selecionadoMensal, setSelecionadoMensal] = useState<boolean>(false);
  const [selecionadoAnual, setSelecionadoAnual] = useState<boolean>(true);
  const [packages, setPackages] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  function handleClickAnual() {
    setSelecionadoMensal(false);
    setSelecionadoAnual(!selecionadoAnual)
  }

  function handleClickMensal() {
    setSelecionadoAnual(false);
    setSelecionadoMensal(!selecionadoMensal)
  }

  const { height } = Dimensions.get('window');
  const navigation = useNavigation();

  const onSelection = async () => {

  }

  useEffect(() => {
    const getPackages = async () => {
      try {
        // const teste = Purchases.;
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages)
        }
      } catch (e) {
        console.warn('e', e)
      }
    }

    getPackages();
  }, [])

  return (
    <>
      <View style={{
        display: 'flex',
        flexGrow: 1,
        backgroundColor: placeholderText,
        padding: 24,
      }}>
        <Image
          style={{ alignSelf: 'center', marginBottom: '10%', width: 144, height: 55, marginTop: '16%' }}
          source={require('../assets/Imagens/logo-home.png')}
        />
        <Text h3 fonte={'Montserrat-Bold'} style={{ textAlign: 'center', marginBottom: height * 0.025 }}>
          Seu periodo gratuito expirou!
        </Text>
        <Text fonte="Poppins-Light" h2 style={{ textAlign: 'center', color: destaque100 }}>
          Obrigado por experimentar o Junt :)
        </Text>
        <Text style={{ textAlign: 'left', marginHorizontal: 18, marginVertical: 32 }} fonte={'Poppins-Medium'}>
          Quer continuar a ter o controle das suas finanças de forma fácil?
          Para continuar utilizando as funcionalidades escolha um dos planos abaixo:
        </Text>

        <FlatList
          data={packages}
          renderItem={({ item }) => <PackageItem packageType={item.packageType} purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
          keyExtractor={(item) => item.identifier}
        />


      </View>
    </>
  );
}

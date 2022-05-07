import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import useTheme from '../hooks/useTheme';
import Text from '../components/Text';
import { useNavigation } from '@react-navigation/native';
import PackageItem from '../components/CardCompra/PackageItem'
import Purchases from 'react-native-purchases';
import Header from '../components/Header';

export default function Adesao() {

  const {
    cores: { placeholderText }
  } = useTheme()

  const [packages, setPackages] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);

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

  const { height } = Dimensions.get('window');
  const navigation = useNavigation();

  return (
    <>
      <View style={{
        display: 'flex',
        flexGrow: 1,
        backgroundColor: placeholderText,
        padding: 24
      }}>
        <Header iconePerfil goBack={() => navigation.goBack()} />
        <Image
          style={{ alignSelf: 'center', marginBottom: '5%', width: 144, height: 55 }}
          source={require('../assets/Imagens/logo-home.png')}
        />
        <Text h3 fonte={'Montserrat-Bold'} style={{ textAlign: 'center', marginBottom: height * 0.025 }}>
          {`Assine agora!\nEscolha o melhor plano para você`}
        </Text>

        <Text style={{ textAlign: 'left', margin: 18 }} fonte={'Poppins-Medium'}>
          Aproveite o primeiro mês gratuitamente.
          A sua assinatura será renovada de forma automática no final da avaliação gratuita.
          Escolha um dos planos abaixo:
        </Text>

        <FlatList
          data={packages?.reverse()}
          renderItem={({ item }) => <PackageItem packageType={item.packageType} purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
          keyExtractor={(item) => item.identifier}
        />

        <TouchableOpacity style={{ marginTop: 32 }} onPress={() => Linking.openURL('https://orealvalor.com.br/politica-de-privacidade/')}>
          <Text fonte="Poppins-Medium" subtexto h4 style={{ textAlign: 'center', textDecorationLine: 'underline' }}>
            Termos de Uso e Política de Privacidade
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Alert } from 'react-native';
import Text from '../Text'
import Button from '../Button'
import useTheme from '../../hooks/useTheme';
import Purchases from 'react-native-purchases';

const PackageItem = ({ purchasePackage, packageType }: { purchasePackage: { product: { title: string, description: string, price_string: string } }, packageType: string }) => {
  const {
    product: { title, price_string }
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    try {
      //@ts-ignore
      const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);

      if (typeof purchaserInfo.entitlements.active['premium'] !== 'undefined') {
        navigation.navigate('Tabs' as never)
      }
    } catch (err: any) {
      if (err.userCancelled) {
        Alert.alert(err.message)
      }
    }
  };

  const {
    cores: {
      borda,
      placeholderButton,
      texto: { subtexto },
    },
  } = useTheme();


  return (
    <View
      style={{
        backgroundColor: '#F1F2F6',
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: true ? 1 : 0,
        borderColor: borda,
        marginVertical: 8,
      }}
    >
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 16, justifyContent: 'center', marginLeft: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text h3 fonte="Poppins-Bold" style={{ marginLeft: 8, alignSelf: 'center' }}>
            {title?.split('(')[0]}
          </Text>
          <Text h3 fonte="Poppins-Medium" style={{ textAlign: 'center' }} >- {price_string}</Text>
        </View>

        {packageType === 'ANNUAL' && <View style={{ flexDirection: 'row', marginLeft: 34 }}>
          <View style={{ marginLeft: 24, backgroundColor: placeholderButton, height: 18, width: 100, alignItems: 'center', borderRadius: 5 }}>
            <Text fonte="Poppins-Medium" subtexto h6 style={{ color: subtexto, justifyContent: 'flex-end' }}>
              Economize 15%
            </Text>
          </View>
        </View>}
        <View style={{ marginTop: 8 }}>
          <Button border height={42} outlined={packageType === 'ANNUAL' ? false : true} onPress={onSelection} label={packageType === 'ANNUAL' ? 'Assinar Anual' : 'Assinar Mensal'} />
        </View>
      </View>
    </View>
  )
}

export default PackageItem
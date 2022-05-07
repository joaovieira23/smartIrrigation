import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from '../Touchable'
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  goBack?: () => void;
  title?: string;
  iconePerfil?: boolean;
}

export default function Header({
  title,
  goBack,
  iconePerfil
}: HeaderProps) {

  const navigation = useNavigation();

  return (
    <View style={{ display: 'flex', alignItems: 'center', marginVertical: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
      {goBack ? (
        <View style={{ margin: 16 }}>
          <Touchable onPress={goBack}>
            <Icon name="keyboard-backspace" size={30} color={'#000'} />
          </Touchable>
        </View>
      ) : <View style={{ margin: 32 }} />}

      {title &&
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 30,
            margin: 16,
          }}
        >
          <Text h2 style={{ textAlign: 'center' }} fonte='Montserrat-Bold'>{title}</Text>
        </View>
      }


      <View style={{ margin: 16 }} >
        <Touchable onPress={() => navigation.navigate('Perfil' as never, {} as never)}>
          {!iconePerfil ? <Icon name="account-circle-outline" size={30} color={'rgba(145, 145, 159, 1)'} /> : <></>}
        </Touchable>
      </View>
    </View>
  );
}

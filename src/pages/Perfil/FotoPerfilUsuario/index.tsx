import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Loading from '../../../components/Loading';
import useTheme from '../../../hooks/useTheme';
import Text from '../../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FotoPerfilUsuarioProps {
  outline?: boolean;
}

export default function FotoPerfilUsuario(props: FotoPerfilUsuarioProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const {
    cores: {
      texto: { link },
    },
  } = useTheme();


  return (
    <View>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 80,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: props.outline ? link : 'white',
          borderWidth: 3,
        }}
      >
        {loadingImage ? (
          <View
            style={{
              height: 79,
              borderRadius: 35,
              width: 79,
              backgroundColor: '#c2c2c2',
            }}
          >
            <Loading />
          </View>
        ) : (
          <Image
            source={{
              // uri: photoUrl || defaultPhoto,
            }}
            style={{
              height: 136,
              borderRadius: 68,
              width: 136,
              backgroundColor: '#c2c2c2',
            }}
          />
        )}
        <View style={{ marginTop: 12, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={'camera-plus-outline'} size={24} />
          <Text fonte={'Poppins-Medium'} style={{ marginLeft: 8 }} >Alterar foto do perfil</Text>
        </View>
      </View>
    </View>
  );
}


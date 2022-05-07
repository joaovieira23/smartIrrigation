import React from 'react'
import { View } from 'react-native';
import Modal from 'react-native-modal';
import Touchable from '../../components/Touchable';
import BudgetController from '../../controllers/Budget.controller';
import Text from '../../components/Text';
import { useQuery } from 'react-query';
import useTheme from '../../hooks/useTheme';
import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IPropsModalOrcamento {
  device: {
    id: string;
    name: string;
    active: boolean,
    device_id: string,
    description: string,
    last_metering: string | null;
  };
  setShowModal: (modal: boolean) => void;
  showModal: boolean;
}

export default function ModalDefinirOrcamento(props: IPropsModalOrcamento) {
  const {
    cores: {
      destaque100,
      destaquePrimaria,
      surface,
      texto: { subtexto },
    },
  } = useTheme();

  console.warn('prprpap', props.device.last_metering)
  const dataF = props.device.last_metering.time_instant.split('-')

  return (
    <>
      <Modal
        style={{ margin: '4%' }}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        isVisible={props.showModal}
        onBackdropPress={() => props.setShowModal(false)}
      >
        <View style={{ backgroundColor: surface, borderRadius: 10, marginVertical: '20%', padding: 14 }}>
          <View style={{ paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
              <Text fonte="Montserrat-Bold" h2 enfase style={{ maxWidth: 300 }}>
                Dados do dispositivo
              </Text>

              <Touchable onPress={() => props.setShowModal(false)}>
                <Icon size={24} color={subtexto} name="close" />
              </Touchable>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Dispositivo:
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {props.device.name}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Última medição:
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {!props.device.last_metering ? 'Sem medição' : `${dataF[0]}/${dataF[1]}/2022`}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Umidade do solo:
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {!props.device.last_metering ? 'Sem medição' : props.device.last_metering.humidity_soil}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Umidade do ar
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {!props.device.last_metering ? 'Sem medição' : props.device.last_metering.humidity}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Temperatura do ar:
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {!props.device.last_metering ? 'Sem medição' : props.device.last_metering.temperature}
              </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text h3 fonte="Montserrat-Bold" style={{ color: destaque100, paddingVertical: 12, paddingHorizontal: 4 }}>
                Status
              </Text>
              <Text h3 fonte="Montserrat-Bold" style={{ color: '#000000', paddingVertical: 12, paddingHorizontal: 4 }}>
                {props.device.active ? 'Ativo' : 'Inativo'}
              </Text>
            </View>


          </View>
        </View>
      </Modal>
    </>
  );
}
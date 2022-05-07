import React from 'react';
import { Dimensions, View } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import Placeholder from '../../components/Placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BudgetController from '../../controllers/Budget.controller'
import { useQuery } from 'react-query';

interface Props {
  onPress: () => void;
}

function CardTotalHojeSkeleton() {
  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: '100%',
      }}
    >
      <Card
        style={{
          width: width * 0.94,
          height: 110,
          borderRadius: 5,
          justifyContent: 'center',
        }}
      >
        <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
          <View style={{ marginBottom: 10 }}>
            <Text
              subtexto
              style={{
                includeFontPadding: false,
                fontSize: 14,
              }}
            >
              Total
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Placeholder width={width * 0.5} height={24} />
          </View>
        </View>
      </Card>
    </View>
  );
}

function CardTotalHoje(props: Props) {
  const { data: devices, isLoading } = useQuery('devices', BudgetController.getDevices);
  //@ts-ignore
  const { width } = Dimensions.get('screen');

  if (isLoading || !devices.data) {
    return <CardTotalHojeSkeleton />;
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        width: '100%',
      }}
    >
      <Card
        style={{
          width: width - 32,
          borderRadius: 5,
        }}
      >
        <Touchable onPress={props.onPress}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text
                fonte="Poppins-Medium"
                subtexto
                h4
                style={{
                  includeFontPadding: false,
                  paddingTop: 5,
                }}
              >
                Número de Dispositivos Cadastrados
              </Text>

              <Icon name="pen" size={28} />
            </View>

            <Text
              fonte="Poppins-Medium"
              enfase
              h2
              style={{
                marginBottom: 5,
              }}
            >
              {devices.data.amountActive + devices.data.amountInactive} unidade(s)
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: 'green', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Ativos
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    {devices.data.amountActive} disp.
                  </Text>
                </View>
              </View>

              <View style={{ marginRight: 12, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 8, borderRadius: 3, height: 40, backgroundColor: '#5A5A63', justifyContent: 'center', marginRight: 8 }} />
                <View>
                  <Text fonte="Poppins-Medium" subtexto h4>
                    Inativos
                  </Text>
                  <Text fonte="Poppins-Medium" enfase h3>
                    {devices.data.amountInactive} disp.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Touchable>
      </Card>
    </View>
  );
}

export default CardTotalHoje;

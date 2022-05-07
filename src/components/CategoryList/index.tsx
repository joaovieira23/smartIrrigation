import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Text from '../../components/Text';
import useTheme from '../../hooks/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PropsOptions {
  id: number; icon: string; name: string;
}

const Select = ({ options, onChangeSelect, text }: { options: PropsOptions[], text: string, onChangeSelect: any }) => {
  const { width } = Dimensions.get('screen')
  const [txt, setTxt] = useState(text);
  const [icon, setIcon] = useState('');
  const [selected, setSelected] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    cores: {
      placeholderButton, terciaria, placeholderText
    },
  } = useTheme();

  function renderOptions(item: PropsOptions) {
    return (
      <TouchableOpacity style={[styles.optionContainer, { backgroundColor: item.id === selected ? placeholderButton : placeholderText }]} onPress={() => {
        setModalVisible(false)
        onChangeSelect(item.id)
        setTxt(item.name)
        setIcon(item.icon)
        setSelected(item.id)
      }}>
        <Icon name={item.icon} size={24} color={terciaria} style={{ marginRight: 16 }} />
        <Text fonte={'Poppins-Medium'}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <TouchableOpacity style={[styles.container, { backgroundColor: selected ? placeholderButton : placeholderText, borderBottomWidth: selected ? 0 : 1 }]} onPress={() => setModalVisible(true)}>
        <View>
          <Icon name={icon} size={32} style={{ marginRight: 8 }} />
        </View>
        <Text numberOfLines={1} style={{ width: !selected ? (width - 120) : (width - 144) }} fonte="Poppins-Medium">{txt}</Text>
        <Icon name={'chevron-down'} size={26} color={'#5A5A63'} />
      </TouchableOpacity>
      <View >
        <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
            <SafeAreaView>
              <FlatList
                data={options || []}
                //@ts-ignore
                keyExtractor={(item: PropsOptions) => item.id}
                renderItem={({ item }) => renderOptions(item)}
              />
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    borderColor: '#000',
    borderBottomWidth: 1
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 12,
  }
})

export default Select;
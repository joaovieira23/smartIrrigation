import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, SafeAreaView, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from './data/onboarding';
import useTheme from '../../../hooks/useTheme';
import RadialGradient from 'react-native-radial-gradient';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const { width } = Dimensions.get('window');

  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const navigation = useNavigation();

  const {
    cores: { primaria, secundaria },
  } = useTheme();


  const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    setViewableItems(viewableItems);
  })

  useEffect(() => {
    //@ts-ignore
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    //@ts-ignore
    setCurrentPage(viewableItems[0].index)
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == 2) navigation.navigate('Welcome' as never, {} as never);

    if (currentPage == data.length - 1) return;
    flatlistRef?.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1
    });
  }

  const handleBack = () => {
    if (currentPage == 0) return;
    flatlistRef?.current?.scrollToIndex({
      animated: true,
      index: currentPage - 1
    });
  };

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 })

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginVertical: 24
        }}>

          <TouchableOpacity onPress={handleBack} style={{
            padding: 10
          }}>
            <Icon size={25} color={primaria} name="arrow-left" style={{
              opacity: currentPage == 0 ? 0 : 1
            }} />
          </TouchableOpacity>


        </View>
        <Image
          style={{ alignSelf: 'center', height: 54, width: 144, marginTop: 56 }}
          source={require('../../../assets/Imagens/logo-branca.png')}
        />
      </SafeAreaView>
    )
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            [...Array(data.length)].map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === currentPage ? 16 : 10,
                  height: index === currentPage ? 16 : 10,
                  borderRadius: index === currentPage ? 8 : 5,
                  backgroundColor: index === currentPage ? '#3E8512' : '#CCEBBB',
                  marginRight: 8
                }} />
            ))
          }
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
          <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => navigation.navigate('Welcome' as never, {} as never)}>
            <Text h3 fonte="Montserrat-Bold" style={{ color: primaria }}>PULAR</Text>
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 50,
              overflow: 'hidden',
              margin: 8
            }}
          >
            <RadialGradient
              center={[100, 100]}
              stops={[0.1, 0.4, 0.3, 0.75]}
              radius={150}
              style={{ borderRadius: 50 }}
              colors={[primaria, secundaria]}
            >


              <TouchableOpacity
                onPress={handleNext}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 52,
                  height: 52,
                }}
              >
                <Icon name={"arrow-right"} size={20} color="#FFF" />
              </TouchableOpacity>
            </RadialGradient>
          </View>
        </View>
      </SafeAreaView >
    )
  }

  const renderFlatlistItem = ({ item }: { item: any }) => {
    return (
      <View style={{
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <View style={{
          alignItems: 'center',
          marginVertical: 20,
        }}>

        </View>
        <View style={{ paddingHorizontal: 40, marginVertical: 40 }}>
          <Text h1 fonte="Montserrat-Bold" style={{ color: '#FFFFFF', fontStyle: 'normal', letterSpacing: 0.1, textAlign: 'center' }}>
            {item.title}
          </Text>
          <Text fonte="Poppins-Medium" style={{ fontSize: 18, opacity: 0.4, color: '#FFFFFF', textAlign: 'center', marginTop: 15, lineHeight: 28 }}>
            {item.description}
          </Text>
        </View>

      </View >
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center'
    }}>
      <ImageBackground
        source={data[currentPage].image}
        style={{
          flex: 1, justifyContent: 'space-evenly'
        }}
        resizeMode="cover"
      >
        <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
        {renderTopSection()}

        <FlatList
          data={data}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          renderItem={renderFlatlistItem}
          ref={flatlistRef}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={handleViewableItemsChanged.current}
          initialNumToRender={1}
          extraData={width}
        />

        {renderBottomSection()}
      </ImageBackground>
    </View>
  )
}

export default Onboarding;
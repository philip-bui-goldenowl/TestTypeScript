import React, { useState } from 'react'
import {
  View, StyleSheet, SafeAreaView, FlatList,
} from 'react-native'
import {
  HeaderComponent,
  MainTitle,
  ProductCart,
  SaleOffComponent,
  CategoryCard,
  SwiperHorizontal,
  Loading
} from '@/components'
import {
  Colors, TypoGrayphy, mainPaddingH, calWidth,
} from '@/assets/styles'
import icons from '@/assets/icons'
import { ADD_CATEGORY, GET_ORDER } from '@/utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import { Category, CategoryList, Order } from '@/types/order'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/stack'
import { ScreenName } from '@/constants'


type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeProps) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)
  const handleFocus = () => {
    setOnFocus(true)
  }
  const handleViewProductDetail = (order: Order) => {
    navigation.navigate('Explore')
  }
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [
      { query: GET_ORDER }, // DocumentNode object parsed with gql
      //'GetComments' // Query name
    ]
  });


  const { loading, error, data } = useQuery<CategoryList>(GET_ORDER);
  const listOrder = data?.order
  const category = data?.category

  const handleAddMore = async () => {
    const response = await addCategory({
      variables: {
        image: 'https://media.istockphoto.com/id/1303978937/vi/anh/gi%C3%A0y-th%E1%BB%83-thao-m%C3%A0u-tr%E1%BA%AFng-tr%C3%AAn-n%E1%BB%81n-gradient-m%C3%A0u-xanh-th%E1%BB%9Di-trang-nam-gi%C3%A0y-th%E1%BB%83-thao-gi%C3%A0y-th%E1%BB%83-thao.jpg?s=612x612&w=is&k=20&c=6xh5F3Zx30C8pBSSNhLttCcmxbHQ-HZLaq-FSL6COgA=',
        banner: 'https://media.istockphoto.com/id/1303978937/vi/anh/gi%C3%A0y-th%E1%BB%83-thao-m%C3%A0u-tr%E1%BA%AFng-tr%C3%AAn-n%E1%BB%81n-gradient-m%C3%A0u-xanh-th%E1%BB%9Di-trang-nam-gi%C3%A0y-th%E1%BB%83-thao-gi%C3%A0y-th%E1%BB%83-thao.jpg?s=612x612&w=is&k=20&c=6xh5F3Zx30C8pBSSNhLttCcmxbHQ-HZLaq-FSL6COgA=',
        title: 'onNew'
      }
    })
    console.log(response.data);



  }

  if (loading) {
    return <Loading modalVisible setModalVisible={() => { }} />
  }
  return (
    <View style={styles.container} >
      <SafeAreaView />
      <HeaderComponent navigation={navigation} handleFocus={handleFocus} onFocus={onFocus} handleClick={() => navigation.navigate(ScreenName.SEARCH)} />
      <View style={styles.divider} />
      <View style={styles.container}>
        <View style={{ paddingTop: mainPaddingH, flex: 1 }}>
          <FlatList
            data={listOrder}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                <View style={styles.swipperWrapper}>
                  <SwiperHorizontal products={category || []} handleChooseSwipper={() => {
                  }} />
                </View>
                <View>
                  <MainTitle title="Category" btnTitle="Add more" onBtnRightPress={handleAddMore} />
                  <FlatList
                    horizontal
                    style={{ marginTop: 12 * calWidth, marginBottom: 24 * calWidth }}
                    showsHorizontalScrollIndicator={false}
                    data={category}
                    renderItem={({ item }) => {
                      return (
                        <CategoryCard style={{ marginLeft: mainPaddingH }} category={item} />
                      )
                    }}
                    keyExtractor={(item, index) => `List category ${index}`}
                  />
                </View>
                <View>
                  <MainTitle title="Flash Sale" btnTitle="See More" />
                  <FlatList
                    data={listOrder}
                    style={{ marginLeft: mainPaddingH, marginTop: 12 * calWidth }}
                    horizontal
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={styles.dividerHorizontal} />
                      );
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      return (
                        <ProductCart
                          margin={mainPaddingH}
                          product={item}
                          style={styles.productCard}
                          handleChooseItem={() => handleViewProductDetail(item)}
                        />
                      )
                    }}
                    keyExtractor={(item) => `Productline list ${item.id}`}
                  />
                </View>
                <View style={{ marginTop: 24 * calWidth }}>
                  <MainTitle title="Mega Sale" btnTitle="See more" onBtnRightPress={() => { }} />
                  <View style={{ marginHorizontal: mainPaddingH }}>
                    <SaleOffComponent content="We recomended the best for you" image={icons.promotionImage} topic="Recomended Product" />
                  </View>
                </View>
              </View>

            }
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <ProductCart
                  product={item}
                  handleChooseItem={() => {
                    // navigation.navigate(SCREEN_NAME.ProductDetail, { nameProduct: 'Nike Air Max 270 Rea...' })
                  }}
                  style={styles.productCard}
                />
              )
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: mainPaddingH,
              marginHorizontal: mainPaddingH,
            }}
            keyExtractor={(item) => `ProductLike list ${item?.id}`}
          />
        </View>
      </View>
      <SafeAreaView />
    </View >
  )
}

const styles = StyleSheet.create({
  dividerHorizontal: {
    height: "100%",
    width: 16,
  },
  productCard: {
    paddingVertical: 16,
    width: 165 * calWidth,
    sImage: 133 * calWidth,
  },
  moreCategory: { ...TypoGrayphy.linkLargeTextBold14 },
  titleCategory: { ...TypoGrayphy.heading5 },
  swipperWrapper: {
    height: 270 * calWidth,
  },
  labelCate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mainPaddingH,
    marginBottom: 12 * calWidth,
  },
  divider: {
    borderTopColor: Colors.neutralLine,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: mainPaddingH,
    alignItems: 'center',
    height: 46 * calWidth,
    marginHorizontal: mainPaddingH,
  },
})
export default HomeScreen
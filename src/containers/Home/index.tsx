import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View, SafeAreaView, FlatList, ActivityIndicator,
} from 'react-native'
import {
  HeaderComponent,
  MainTitle,
  ProductCart,
  SaleOffComponent,
  CategoryCard,
  SwiperHorizontal,
} from '@/components'
import {
  mainPaddingH, calWidth,
} from '@/assets/styles'
import icons from '@/assets/icons'
import { GET_CATEGORY, GET_ORDER, UPDATE_CATEGORY } from '@/utils/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CategoryList, Order, Category } from '@/types/order'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/stack'
import { ScreenName } from '@/constants'
import styles from './styles';
import ModalScreen from './Modal'
import InsertModal from '../ProductDetail/Modal';
import { useFocusEffect } from '@react-navigation/native'


type HomeProps = NativeStackScreenProps<RootStackParamList, ScreenName.HOME>;

const HomeScreen = ({ navigation }: HomeProps) => {
  const [onFocus, setOnFocus] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalAddVisible, setModalAddVisible] = useState<boolean>(false)
  const [currentCategory, setCurrentCategory] = useState<number>()
  const [title, setTitle] = useState<string>()
  const [page, setPage] = useState(5)
  const [listOrder, setListOrder] = useState<Order[]>([])
  const [isLoadMore, setIsLoadMore] = useState(false)
  const onEndReachedCalledDuringMoment = useRef(true)

  const handleFocus = () => {
    setOnFocus(true)
  }

  const handleViewProductDetail = (order: Order) => {
    navigation.navigate(ScreenName.PRODUCT_DETAIL, {
      id: order.id,
      name: order.product
    })
  }
  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [
      { query: GET_CATEGORY },
    ]
  });
  const [GetOrder] = useLazyQuery<CategoryList>(GET_ORDER);
  const { data } = useQuery(GET_CATEGORY)
  const categories: Category[] = data?.category

  useEffect(() => {
    getData(page)
  }, [])

  useEffect(() => {
    if (page > 5) {
      getData(page)
    }
  }, [page])

  useFocusEffect(
    useCallback(() => {
      getData(5)
    }, [navigation])
  )



  const getData = async (page: number) => {
    const response = await GetOrder({
      variables: {
        limit: page
      }
    })
    if (response.data) {
      const orders: Order[] = response.data?.order

      setListOrder(orders)
    }
    setIsLoadMore(false)
    onEndReachedCalledDuringMoment.current = true;
  }


  const handleAddMore = async () => {
    setModalAddVisible(!modalAddVisible)
  }

  const handleUpdateItem = (id: number, title: string) => {
    setModalVisible(!modalVisible)
    setCurrentCategory(id)

    setTitle(title)
  }
  const onUpdateCategory = async (title: string) => {
    const response = await updateCategory({
      variables: {
        id: currentCategory,
        title: title
      }
    })
    getData(5)
    console.log("value login", response);

  }



  const handleLoadMoreHomePage = () => {
    setIsLoadMore(true)
    const newPage = page + 10
    setPage(newPage)
  }
  const renderFooter = () => (
    <View >
      <ActivityIndicator size={"large"} />
    </View>
  );
  return (
    <View style={styles.container} >
      <SafeAreaView />
      <HeaderComponent
        navigation={navigation}
        handleFocus={handleFocus}
        onFocus={onFocus}
        handleClick={() => navigation.navigate(ScreenName.SEARCH)} />
      <View style={styles.divider} />
      <View style={styles.container}>
        <View style={{ paddingTop: mainPaddingH, flex: 1 }}>
          <FlatList
            data={listOrder}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                <View style={styles.swipperWrapper}>
                  <SwiperHorizontal products={categories || []} handleChooseSwipper={() => {
                  }} />
                </View>
                <View>
                  <MainTitle title="Category" btnTitle="Add more" onBtnRightPress={handleAddMore} />
                  <FlatList
                    horizontal
                    style={{ marginTop: 12 * calWidth, marginBottom: 24 * calWidth }}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => {
                      return (
                        <CategoryCard style={{ marginLeft: mainPaddingH }} category={item} onPressCategory={() => handleUpdateItem(item.id, item.title)} />
                      )
                    }}
                    keyExtractor={(item, index) => `List category ${item.id}`}
                  />
                </View>
                <View>
                  <MainTitle title="Flash Sale" btnTitle="See More" onBtnRightPress={() => navigation.navigate(ScreenName.PRODUCT)} />
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
                    keyExtractor={(item) => `Productline list one ${item.id}`}
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
                    // navigation.navigate(ScreenName.PRODUCT_DETAIL, { nameProduct: 'Nike Air Max 270 Rea...' })
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
            onEndReached={() => {
              if (!onEndReachedCalledDuringMoment.current) {
                handleLoadMoreHomePage();
              }
            }}
            onMomentumScrollBegin={() => {
              onEndReachedCalledDuringMoment.current = false;
            }}
            keyExtractor={(item) => `ProductLike  ${item.id}`}
            ListFooterComponent={() => isLoadMore ? renderFooter() : null}
          />
        </View>
      </View>
      <SafeAreaView />
      <ModalScreen
        title={title}
        onUpdateCategory={(title) => onUpdateCategory(title)}
        modalVisible={modalVisible}
        setShowModal={() => setModalVisible(!modalVisible)} />
      <InsertModal
        title='Thêm sản phẩm'
        onUpdateCategory={(title) => { }}
        modalVisible={modalAddVisible}
        setShowModal={() => setModalAddVisible(!modalAddVisible)} />
    </View >
  )
}

export default HomeScreen
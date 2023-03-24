import icons from '@/assets/icons';
import { mainPaddingH } from '@/assets/styles';
import { HeaderCommon, ProductCart } from '@/components';
import { FilterSearch, ScreenName } from '@/constants';
import { RootState } from '@/store';
import { ProductProps } from '@/types/navigation';
import { CategoryList, Order } from '@/types/order';
import { Filtered } from '@/types/product';
import { FILTER_PRODUCT, GET_ORDER } from '@/utils/queries';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';


const Product = ({ navigation }: ProductProps) => {
  const [GetOrder] = useLazyQuery<CategoryList>(GET_ORDER);
  const [filterProduct] = useLazyQuery(FILTER_PRODUCT);
  const [products, setProducts] = useState<Order[]>([])
  const filtered = useSelector((state: RootState) => state.product)
  const getData = async (page: number) => {
    const response = await GetOrder({
      variables: {
        limit: page
      }
    })
    if (response.data) {
      const orders = response.data?.order
      setProducts(orders)
    }
  }

  const handleFilterShortBy = async (filtered: Filtered) => {
    let where: object
    switch (filtered.shortBy) {
      case FilterSearch.SIZE:
        where = {
          size: {
            _eq: filtered.value
          }
        }
        break;
      case FilterSearch.COLOR:
        where = {
          color: {
            _eq: filtered.value
          }
        }
        break;
      default:
        where = {
          product: {
            _ilike: `%${filtered.value}%`
          }
        }
        break;
    }

    const response = await filterProduct({
      variables: {
        where: where
      }
    })
    if (response.data) {
      const orders = response.data?.order
      setProducts(orders)
    }

  }

  useEffect(() => {
    if (filtered.filtered.value) {
      handleFilterShortBy(filtered.filtered)
    }
  }, [filtered.filtered.value])

  useEffect(() => {
    getData(10)
  }, [])
  const handleViewProductDetail = (order: Order) => {
    navigation.navigate(ScreenName.PRODUCT_DETAIL, {
      id: order.id,
      name: order.product
    })
  }
  const handleFilter = () => {
    navigation.navigate(ScreenName.SHORT_BY)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderCommon
        title={'Danh sách sản phẩm'}
        navigation={navigation}
        icon={icons.filter}
        disabled={false}
        onPressRight={handleFilter}
      />
      <FlatList data={products ?? []}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginTop: mainPaddingH,
          marginHorizontal: mainPaddingH,
        }}
        renderItem={({ item }) => {
          return (
            <ProductCart
              margin={mainPaddingH}
              product={item}
              style={styles.productCard}
              handleChooseItem={() => handleViewProductDetail(item)}
            />
          )
        }} />
    </View>
  )
}

export default Product
import icons, { notFound } from '@/assets/icons';
import { calWidth, mainPaddingH, TypoGrayphy } from '@/assets/styles';
import { Button, HeaderCommon, ProductCart, Text } from '@/components';
import { FilterSearch, ScreenName } from '@/constants';
import { RootState } from '@/store';
import { ProductProps } from '@/types/navigation';
import { CategoryList, Order } from '@/types/order';
import { Filtered } from '@/types/product';
import { FILTER_PRODUCT, GET_ORDER } from '@/utils/queries';
import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';


const Product = ({ navigation }: ProductProps) => {
  const { width } = useWindowDimensions()
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
        //contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <Image source={notFound} />
            <Text style={styles.titleNotFound}>Product not found</Text>
            <Button name="Back to home" style={{ width: width * 0.8 }} handleClick={() => navigation.goBack()} />
          </View>
        }
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
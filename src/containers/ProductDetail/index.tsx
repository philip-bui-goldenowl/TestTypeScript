import React, { useEffect, useState } from 'react'
import {
  View, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView, Alert,
} from 'react-native'
import {
  avatar, plus,
} from '@/assets/icons'
import {
  Text, Button, HeaderCommon, SelectSizeOption, SelectColorOption,
} from '@/components'
import {
  Colors, calWidth,
} from '@/assets/styles'
import { ProductDetailProps } from '@/types/navigation'
import { GET_PRODUCT_WITH_ID, UPDATE_PHOTO_PRODUCT, UPDATE_PRODUCT } from '@/utils/queries'
import { Order } from '@/types/order'
import { useMutation, useQuery } from '@apollo/client'
import FastImage from 'react-native-fast-image'
import { colorData, nums, productLikes } from '@/constants'
import LoadingComponent from './Loading'
import styles from './styles';
import ModalScreen from './Modal'
import { ImagePickerResponse } from '@/utils/UpdateImage'
import ModalLoadingIndicator from '@/components/ModalLoading'

const ProductDetail = ({ navigation, route }: ProductDetailProps) => {
  const { id } = route.params
  const { data, loading } = useQuery(GET_PRODUCT_WITH_ID, {
    variables: {
      _id: id
    }
  })
  const [UpdatePhotoProduct] = useMutation(UPDATE_PHOTO_PRODUCT);
  const [UpdateProduct] = useMutation(UPDATE_PRODUCT);
  const product: Order = data?.order[0]
  const [currentSize, setCurrentSize] = useState('6')
  const [currentColor, setCurrentColor] = useState(Colors.primaryYellow)
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const handleChooseOptionSize = (item: string) => {
    setCurrentSize(item)
  }

  useEffect(() => {
    if (!loading) {
      setCurrentColor(product.color)
      setCurrentSize(product.size)
    }
  }, [loading])
  const selectPhotoTapped = async () => {
    setLoadingAvatar(true)
    await ImagePickerResponse(async (url) => {
      await UpdatePhotoProduct({
        variables: {
          id: id,
          image: url
        },
        refetchQueries: [
          {
            query: GET_PRODUCT_WITH_ID,
            variables: {
              _id: id
            }
          }
        ]
      })
      setLoadingAvatar(false)
    })
  }
  const handleUpdateProduct = async () => {
    const response = await UpdateProduct({
      variables: {
        color: currentColor,
        size: currentSize,
        id: id,
      },
      refetchQueries: [
        {
          query: GET_PRODUCT_WITH_ID,
          variables: {
            _id: id
          }
        }
      ]
    })
    if (response.data?.update_order_by_pk) {
      Alert.alert('Update product success')
    }

  }
  const handleAddProduct = () => {
    setModalVisible(!modalVisible)
  }

  if (loading) {
    return <View style={styles.loading}>
      <ModalLoadingIndicator />
    </View>
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderCommon
        title={product.product}
        navigation={navigation}
        icon={plus}
        disabled={false}
        onPressRight={handleAddProduct}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.viewSwiper}>
            <TouchableOpacity onPress={selectPhotoTapped}>
              <FastImage
                key={`List Image ${product.id}`}
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="cover"
                onLoadStart={() => setLoadingAvatar(true)}
                onLoadEnd={() => setLoadingAvatar(false)}
              />
            </TouchableOpacity>
            {loadingAvatar && <LoadingComponent />}
          </View>
          <View style={styles.viewWapper}>
            <View style={styles.viewTitle}>
              <View style={styles.viewTileRow}>
                <Text style={styles.nameProduct}>{product.product}</Text>
                {/* <Image source={} style={styles.iconFavorite} resizeMode="contain" /> */}
              </View>
              {/* <Rating rating={product.star} /> */}
              <Text style={styles.price}>
                {product.purchase_price}
              </Text>
            </View>
            <View style={styles.viewPadding}>
              <Text style={styles.titleHeaderContent}>
                Select Size
              </Text>
              <FlatList
                data={nums}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <SelectSizeOption
                      itemSize={item}
                      handleChooseOptionSize={handleChooseOptionSize}
                      isSelected={item === currentSize}
                    />
                  )
                }}
                keyExtractor={(item, index) => `List nums ${index}`}
              />
            </View>
            <View style={styles.viewPadding}>
              <Text style={styles.titleHeaderContent}>
                Select Color
              </Text>
              <FlatList
                data={colorData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <SelectColorOption
                      itemColor={item}
                      handleChooseColor={(color: string) => {
                        setCurrentColor(color)
                      }}
                      isSelected={item === currentColor}
                    />
                  )
                }}
                keyExtractor={(item, index) => `List Color ${index}`}
              />
            </View>
            <View style={styles.viewCateDetail}>
              <Text style={styles.titleHeaderContent}>
                Specification
              </Text>
              <View>
                <View style={styles.viewSpecition}>
                  <Text>Shown:</Text>
                  <View>
                    <Text style={styles.contentSpecication}>
                      Laser
                      {'\n'}
                      Blue/Anthracite/Watermel
                      {'\n'}
                      on/White
                    </Text>
                  </View>
                </View>
                <View style={styles.viewSpecitionStyle}>
                  <Text>Style:</Text>
                  <Text style={styles.contentSpecication}>
                    CD0113-400
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.viewCateDetail}>
              <View style={styles.viewReview}>
                <Text style={styles.titleHeaderContent}>
                  Review Product
                </Text>
                <TouchableOpacity onPress={() => { }}>
                  <Text style={styles.labelSeeMoreReview}>See More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewRating}>
                {/* <Rating rating="9" /> */}
                <Text style={styles.titleRating}>4.5 (5 Review)</Text>
              </View>
              <View >
                <View style={styles.viewRating}>
                  <Image source={avatar} style={styles.avatarReview} />
                  <View style={styles.viewUserReview}>
                    <Text style={styles.titleUserReview}>James Lawson</Text>
                    {/* <Rating rating={product.star} /> */}
                  </View>
                </View>
                <Text style={styles.viewContentReview}>
                  air max are always very comfortable fit, clean and just perfect in every way.
                  just the box was too small and scrunched the sneakers up a little bit,
                  not sure if the box was always this small but the 90s are and will always be one of my favorites.
                </Text>
                <Text style={styles.timeReview}>
                  December 10, 2016
                </Text>
              </View>
            </View>
            <View style={styles.viewCateDetail}>
              <Text style={styles.titleHeaderContent}>You Might Also Like</Text>
              <FlatList
                data={productLikes}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View />
                    // <ProductCart item={item} margin={mainPaddingH} />
                  )
                }}
                keyExtractor={(item, index) => `List product like ${index}`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonAddCart}>
        <Button name="Cập nhật sản phẩm" style={{ marginHorizontal: 20 * calWidth }} handleClick={handleUpdateProduct} />
        <SafeAreaView />
      </View>
      <ModalScreen
        title='Thêm sản phẩm'
        onUpdateCategory={(title) => { }}
        modalVisible={modalVisible}
        setShowModal={() => setModalVisible(!modalVisible)} />
    </View>
  )
}

export default ProductDetail

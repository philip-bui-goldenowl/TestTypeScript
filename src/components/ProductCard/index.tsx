import React, { useState } from 'react'
import {
  View, Dimensions, StyleSheet,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Text from '../Text'
import { TypoGrayphy, Colors } from '../../assets/styles'
import { Order } from '@/types/order'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LoadingComponent from '@/containers/ProductDetail/Loading'

const { width } = Dimensions.get('window')
const calWidth = width / 375
interface Props {
  product: Order,
  handleChooseItem: () => void,
  style?: any,
  margin?: number,
}
const ProductCart = ({ product, handleChooseItem, style, margin }: Props) => {
  const widthImage = width / 2 - 64
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  return (
    <TouchableOpacity onPress={handleChooseItem}>
      <View style={[{
        paddingHorizontal: 16,
        borderColor: Colors.borderColor,
        borderRadius: 5 * calWidth,
        width: 141 * calWidth,
        justifyContent: 'center',
        borderWidth: 0.5,
      }, { ...style }]}
      >
        <FastImage
          source={{ uri: product?.image }}
          style={
            {
              width: widthImage,
              height: widthImage,
              borderRadius: 5 * calWidth,
            }
          }
          // onLoadStart={() => setLoadingAvatar(true)}
          // onLoadEnd={() => setLoadingAvatar(false)}
          resizeMode="cover"
        />
        {/* {loadingAvatar && <LoadingComponent />} */}
        {/* <Image
          resizeMode="contain"
          source={productLike}
          
        /> */}
        <Text style={{ ...TypoGrayphy.heading6, paddingVertical: 8 * calWidth }} numberOfLines={1} ellipsizeMode='tail'>{product.product}</Text>
        <Text style={{ color: Colors.primaryBlue, ...TypoGrayphy.bodyNormalTextBold }}>$299,43</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            paddingVertical: 8 * calWidth,
            ...TypoGrayphy.captionLargeTextLine, color: Colors.neutralGrey,
          }}
          >
            {product.purchase_price}
          </Text>
          <Text style={{
            color: Colors.primaryRed, marginLeft: 8, ...TypoGrayphy.captionLargeTextRegular10,
          }}
          >
            {`${product.discount_price}% off`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCart

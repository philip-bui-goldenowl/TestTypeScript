import { Category } from '@/types/order'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  Colors, TypoGrayphy, calWidth,
} from '../../assets/styles'
import Text from '../Text'

interface Props {
  category: Category,
  style: object,
  onPressCategory: (id: number) => void
}

const CategoryItem = ({ category, style, onPressCategory }: Props) => {

  return (
    <TouchableOpacity onPress={() => onPressCategory(category.id)}>
      <View style={{
        width: 70 * calWidth,
        alignItems: 'center',
        ...style,
      }}
      >
        <View style={{
          width: 70 * calWidth,
          height: 70 * calWidth,
          borderRadius: 35 * calWidth,
          borderWidth: StyleSheet.hairlineWidth,
          justifyContent: 'center',
          borderColor: Colors.neutralLine,
          alignItems: 'center',
          marginBottom: 8 * calWidth,
        }}
        >
          <FastImage source={{ uri: category.image }} style={{ width: 70 * calWidth, height: 70 * calWidth, borderRadius: 35 * calWidth }} resizeMode="cover" />
        </View>
        <Text style={{
          ...TypoGrayphy.captionLargeTextRegular10, color: Colors.neutralGrey, textAlign: 'center', width: 70 * calWidth,
        }}
        >
          {category.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryItem

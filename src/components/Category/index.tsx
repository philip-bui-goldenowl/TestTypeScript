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
  onPressCategory: () => void
}

const CategoryItem = ({ category, style, onPressCategory }: Props) => {

  return (
    <TouchableOpacity onPress={onPressCategory}>
      <View style={{
        width: 70 * calWidth,
        alignItems: 'center',
        ...style,
      }}
      >
        <View style={styles.category} >
          <FastImage source={{ uri: category.image }} style={styles.image} resizeMode="cover" />
        </View>
        <Text style={styles.title} >
          {category.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: { width: 70 * calWidth, height: 70 * calWidth, borderRadius: 35 * calWidth },
  title: {
    ...TypoGrayphy.captionLargeTextRegular10, color: Colors.neutralGrey, textAlign: 'center', width: 70 * calWidth,
  },
  category: {
    width: 70 * calWidth,
    height: 70 * calWidth,
    borderRadius: 35 * calWidth,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    borderColor: Colors.neutralLine,
    alignItems: 'center',
    marginBottom: 8 * calWidth,
  }
})

export default CategoryItem

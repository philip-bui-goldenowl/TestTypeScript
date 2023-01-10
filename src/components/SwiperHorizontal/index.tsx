import React, { useEffect, useState } from 'react'
import {
  View, Image, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native'
import Swiper from 'react-native-swiper'
import CountDownComponent from '../CountDown'
import { Colors, calWidth, TypoGrayphy } from '../../assets/styles'
import Text from '../Text'
import { Category } from '@/types/order'

const { width } = Dimensions.get('window')
interface Props {
  products: Category[],
  handleChooseSwipper: () => void
}
const SwiperHorizontal = ({ products, handleChooseSwipper }: Props) => {
  const handlePagination = (index: number, total: number) => {
    const paginationView = []
    for (let paginationIndex = 0; paginationIndex < total; paginationIndex++) {
      paginationView.push(<View key={paginationIndex} style={[styles.dotView, { backgroundColor: paginationIndex === index ? Colors.primaryBlue : Colors.neutralGrey }]} />)
    }
    return (
      <View style={styles.dotWrapper}>
        {paginationView}
      </View>
    )
  }


  return (
    <Swiper
      showsPagination
      loop={false}
      renderPagination={handlePagination}
    >
      {products.map((item: Category) => {
        return (
          <TouchableOpacity key={`List Image ${item.id}`} onPress={() => handleChooseSwipper()}>
            <View style={{
              height: 240 * calWidth, borderRadius: 8,
              alignSelf: 'center'
            }}>
              <Image source={{ uri: item.banner }} style={styles.image} resizeMode="cover" />
              <View style={styles.imageBlur} />
              <View style={{ position: 'absolute', marginLeft: 24 * calWidth }}>
                <Text style={styles.title}>
                  Super Flash Sale 50% Off
                </Text>
                <CountDownComponent time="3600" />
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </Swiper>
  )
}
const styles = StyleSheet.create({
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16 * calWidth,
  },
  image: {
    width: width - 32,
    borderRadius: 8,
    height: 228 * calWidth,
    paddingBottom: 10
  },
  imageBlur: {
    width: width - 32,
    height: 228 * calWidth,
    backgroundColor: Colors.black,
    opacity: 0.3,
    borderRadius: 8,
    position: 'absolute',
  },
  dotView: {
    width: 8 * calWidth,
    height: 8 * calWidth,
    borderRadius: 4 * calWidth,
    marginRight: 8 * calWidth,
  },
  title: {
    ...TypoGrayphy.heading2,
    width: 209 * calWidth,
    height: 72 * calWidth,
    marginVertical: 30 * calWidth,
    color: Colors.backgroudWhite,
  },
})

export default SwiperHorizontal

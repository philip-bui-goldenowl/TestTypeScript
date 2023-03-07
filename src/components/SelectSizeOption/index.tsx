import React from 'react'
import {
  View, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native'
import { TypoGrayphy, Colors } from '../../assets/styles'
import Text from '../Text'

const { width } = Dimensions.get('window')
const calWidth = width / 375

const SelectSizeOption = (props: any) => {
  const { itemSize, handleChooseOptionSize, isSelected } = props
  return (
    <TouchableOpacity onPress={() => handleChooseOptionSize(itemSize)}>
      <View style={{
        width: 48 * calWidth,
        height: 48 * calWidth,
        borderRadius: 24 * calWidth,
        borderColor: isSelected ? Colors.primaryBlue : Colors.borderColor,
        borderWidth: StyleSheet.hairlineWidth * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroudWhite,
        marginRight: 16 * calWidth,
      }}
      >
        <Text style={{ ...TypoGrayphy.heading5 }}>{itemSize}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SelectSizeOption

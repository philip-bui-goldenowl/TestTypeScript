import React from 'react'
import {
  View, Dimensions, TouchableOpacity,
} from 'react-native'

const { width } = Dimensions.get('window')
const calWidth = width / 375

const SelectColorOption = (props: any) => {
  const { itemColor, isSelected, handleChooseColor } = props
  return (
    <TouchableOpacity onPress={() => { handleChooseColor(itemColor) }}>
      <View style={{
        width: 48 * calWidth,
        height: 48 * calWidth,
        borderRadius: 24 * calWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: itemColor,
        marginRight: 16 * calWidth,
      }}
      >
        {isSelected ? <View style={{
          width: 16, height: 16, borderRadius: 8, backgroundColor: 'white',
        }}
        /> : null}
      </View>
    </TouchableOpacity>
  )
}

export default SelectColorOption

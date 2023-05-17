import React, { useEffect, useState } from 'react'
import {
  View, TextInput, StyleSheet, Image, TouchableOpacity, Keyboard
} from 'react-native'
import {
  calWidth,
  Colors,
  mainPaddingH,
  TypoGrayphy,
} from '../../assets/styles'
import Text from '../Text'
interface Props {
  label?: string,
  iconRight?: number,
  placeholder?: string,
  iconLeft?: number,
  handleOnchange: (value: string) => void,
  onFocus: () => void,
  isActive?: boolean,
  secure?: boolean,
  error?: string,
  isInput?: boolean,
  value?: string,
  type?: string,
  onPressInput?: () => void,
}
const Input = ({ onPressInput, value, isInput, label, iconRight, placeholder, iconLeft, type,
  handleOnchange, onFocus, isActive, secure, error, ...props }: Props) => {




  return (
    <View style={{
      marginTop: 16 * calWidth,
    }}
    >
      <Text style={{ ...TypoGrayphy.heading5 }}>{label}</Text>
      <View style={[styles.borderInput, { borderColor: isActive ? Colors.primaryBlue : Colors.neutralLine }]}>
        {iconLeft && iconLeft && <Image
          source={iconLeft}
          style={{
            marginLeft: mainPaddingH,
            width: 24 * calWidth,
            height: 24 * calWidth,
            tintColor: isActive ? Colors.primaryBlue : Colors.neutralGrey,
          }}
        />}
        {!isInput ? <TextInput
          {...props}
          autoCorrect={false}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onFocus={onFocus}
          onChangeText={(text) => handleOnchange(text)}
          secureTextEntry={secure}
        /> : <TouchableOpacity hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }} style={[styles.input]} onPress={onPressInput}>
          <View  >
            <Text style={{ color: Colors.neutralGrey, }}>{placeholder}</Text>
          </View></TouchableOpacity>}
        {iconRight && iconRight && <Image source={iconRight} style={{ marginHorizontal: mainPaddingH, width: 24 * calWidth, height: 24 * calWidth }} />}
      </View>
      {!!error && <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  borderInput: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12 * calWidth,
    borderRadius: 5,
    marginTop: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: Colors.neutralGrey,
  },
})
export default Input

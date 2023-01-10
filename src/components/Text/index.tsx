import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '@/assets/styles'

const { width } = Dimensions.get('window')
const TextComponent = (props: any) => {
  const { children, style = {} } = props
  const flatenStyle = StyleSheet.flatten(style)
  const { fontSize = 12, lineHeight = 1.8 } = flatenStyle
  const calFontSize = fontSize / 375 * width
  const calLineHeight = calFontSize * lineHeight
  return (
    <Text
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{
        ...Fonts.regular,
        color: Colors.neutralDark,
        ...flatenStyle,
        fontSize: calFontSize,
        lineHeight: calLineHeight,
      }}
      allowFontScaling={false}
    >
      {children}
    </Text>
  )
}

export default TextComponent
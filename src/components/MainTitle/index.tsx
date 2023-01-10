import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TypoGrayphy, mainPaddingH } from '@/assets/styles'
import Text from '../Text'

interface Props {
  title: string,
  btnTitle?: string,
  onBtnRightPress?: () => void
}

const MainTitle = ({
  title, btnTitle, onBtnRightPress,
}: Props) => {
  return (
    <View style={styles.labelCate}>
      <Text style={styles.titleCategory}>{title}</Text>
      {btnTitle ? <TouchableOpacity
        onPress={onBtnRightPress}
      >
        <Text style={styles.textButton}>
          {btnTitle}
        </Text>
      </TouchableOpacity> : null}
    </View>
  )
}
const styles = StyleSheet.create({
  textButton: { ...TypoGrayphy.linkLargeTextBold14 },
  titleCategory: { ...TypoGrayphy.heading5 },
  labelCate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mainPaddingH,
  },
})
export default MainTitle

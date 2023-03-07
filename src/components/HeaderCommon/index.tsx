import React from 'react'
import {
  View, TouchableOpacity, SafeAreaView, StyleSheet, Image,
} from 'react-native'
import {
  Colors, mainPaddingH, calWidth, TypoGrayphy,
} from '../../assets/styles'
import { back } from '@/assets/icons'
import Text from '../Text'
import { NavigationProp } from '@react-navigation/native'
interface Props {
  navigation: NavigationProp<any, any>,
  title?: string,
  icon?: number,
  iconRight?: number,
  onPressRight?: () => void,
  disabled?: boolean
}
const Header = ({ navigation, title, icon, iconRight, onPressRight, disabled = true }: Props) => {
  return (
    <View>
      <SafeAreaView />
      <View style={styles.containerBorder}>
        <View style={styles.backgroundInput}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.titleViewRow}>
              <Image source={back} resizeMode="contain" style={styles.imageBack} />
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity disabled={disabled} onPress={onPressRight}>
              <Image source={icon} style={styles.icon} resizeMode="contain" />
            </TouchableOpacity>
            {iconRight && iconRight ? <Image
              source={iconRight}
              style={styles.iconRight}
              resizeMode="contain"
            /> : null}
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  iconRight: {
    width: 24 * calWidth,
    height: 24 * calWidth,
    paddingHorizontal: mainPaddingH,
  },
  icon: {
    width: 24 * calWidth,
    height: 24 * calWidth,
    tintColor: Colors.primaryBlue,
  },
  title: {
    ...TypoGrayphy.heading4,
    marginLeft: 12 * calWidth,
    width: 200 * calWidth,
  },
  titleViewRow: {
    flexDirection: 'row', alignItems: 'center',
  },
  imageBack: {
    width: mainPaddingH, height: mainPaddingH,
  },
  containerBorder: {
    paddingVertical: 26 * calWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
  backgroundInput: {
    flexDirection: 'row',
    marginHorizontal: mainPaddingH,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})


export default Header

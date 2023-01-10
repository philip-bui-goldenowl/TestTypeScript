import React from 'react'
import {
  View, Image, StyleSheet, TouchableOpacity, Text,
} from 'react-native'
// import PropTypes from 'prop-types'
import {
  Colors, mainPaddingH, calWidth,
} from '../../assets/styles'
import icons from '@/assets/icons'
interface Props {
  navigation: any,
  onFocus: boolean,
  handleClick: () => void,
  iconRight?: number,
  handleFocus?: () => void,
  iconNextRight?: number,
}
const HeaderComponent = ({ navigation, onFocus, handleClick, iconRight, iconNextRight }: Props) => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => handleClick()}>
          <View style={[styles.search, { borderColor: onFocus ? Colors.primaryBlue : Colors.neutralLine }]}>
            <Image
              source={icons.search}
              style={styles.iconSearch}
              resizeMode="contain"
            />
            <Text
              style={{ flex: 1, marginLeft: mainPaddingH, color: Colors.neutralGrey }}
            // onFocus={() => handleFocus()}
            >
              Search Product
            </Text>

          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
          <Image
            source={iconNextRight && iconNextRight ? iconNextRight : icons.love}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //navigation.navigate(SCREEN_NAME.Notification)
          }}
        >
          <View>
            <Image
              source={iconRight && iconRight ? iconNextRight : icons.notification}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.dotNotification} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: mainPaddingH,
    alignItems: 'center',
    height: 46 * calWidth,
    marginHorizontal: mainPaddingH,
  },
  image: {
    width: 24 * calWidth,
    height: 24 * calWidth,
    marginLeft: mainPaddingH,
  },
  search: {
    flexDirection: 'row',
    borderRadius: 5 * calWidth,
    borderColor: Colors.neutralLine,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12 * calWidth,
    alignItems: 'center',
  },
  iconSearch: {
    width: mainPaddingH,
    height: mainPaddingH,
    marginLeft: 16 * calWidth,
    tintColor: Colors.primaryBlue,
  },
  dotNotification: {
    width: 8 * calWidth,
    height: 8 * calWidth,
    borderRadius: 4 * calWidth,
    right: 3 * calWidth,
    position: 'absolute',
    backgroundColor: Colors.primaryRed,
  },
})
export default HeaderComponent

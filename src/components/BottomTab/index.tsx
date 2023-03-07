import React from 'react'
import {
  SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity
} from 'react-native'
import { calWidth, Colors, TypoGrayphy } from '@/assets/styles'
import { MenuTab } from '@/constants'

const MyTabBar = ({ state, descriptors, navigation }: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.backgroudWhite }}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
          return (
            <TouchableOpacity
              onPress={onPress}
              style={styles.button}
              key={route.key}
            >
              <Image
                source={MenuTab[index].image}
                style={[styles.image, { tintColor: isFocused ? Colors.primaryBlue : Colors.neutralGrey }]}
                resizeMode="contain"
              />
              <Text style={
                !isFocused
                  ? { ...TypoGrayphy.captionLargeTextRegular10, color: Colors.neutralGrey }
                  : { ...TypoGrayphy.captionLargeTextBold10, color: Colors.primaryBlue }
              }
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: Colors.neutralLine,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: {
    flex: 1,
    height: 58 * calWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: 24 * calWidth,
    height: 24 * calWidth,
    marginBottom: 4 * calWidth,
  },
})

export default MyTabBar
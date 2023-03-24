import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import {
  calWidth, mainPaddingH, TypoGrayphy, Colors,
} from '@/assets/styles'
import { Text } from '@/components'
import { rightICon } from '@/assets/icons'
interface Props {
  label: string,
  value?: string,
  nextScreen?: () => void,
  image?: number,
  disabled?: boolean
}
const ProfileItem = (props: Props) => {
  const {
    label, image, value, nextScreen, disabled
  } = props
  return (
    <TouchableOpacity disabled={disabled} onPress={nextScreen}>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: mainPaddingH,
      }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={image} style={{ width: 24 * calWidth, height: 24 * calWidth, tintColor: Colors.primaryBlue }} resizeMode="contain" />
          <Text style={{ marginLeft: mainPaddingH, ...TypoGrayphy.heading6 }}>{label}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: mainPaddingH, color: Colors.neutralGrey }}>{value}</Text>
          {!disabled && <Image source={rightICon} resizeMode="contain" style={{ width: 24 * calWidth, height: 24 * calWidth }} />}
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default ProfileItem

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { calWidth, Colors, TypoGrayphy } from '@/assets/styles'
import Text from '../Text'
import { secondsToStringTime } from '@/utils/Helper'

const CountDownComponent = ({ time }: any) => {
  const [endTime, setEndTime] = useState(time)
  useEffect(() => {
    if (endTime > 1) {
      const inter = setInterval(() => {
        setEndTime(endTime - 1)
        clearInterval(inter)
      }, 1000)
    }
  }, [endTime])
  const timeInString = secondsToStringTime(endTime)
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{
        width: 42 * calWidth,
        height: 42 * calWidth,
        borderRadius: 5,
        backgroundColor: Colors.backgroudWhite,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ ...TypoGrayphy.heading4 }}>{timeInString[0]}</Text>
      </View>
      <Text style={{ paddingHorizontal: 4 * calWidth, ...TypoGrayphy.heading5, color: Colors.backgroudWhite }}>:</Text>
      <View style={{
        width: 42 * calWidth,
        height: 42 * calWidth,
        borderRadius: 5,
        backgroundColor: Colors.backgroudWhite,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ ...TypoGrayphy.heading4 }}>{timeInString[1]}</Text>
      </View>
      <Text style={{ paddingHorizontal: 4 * calWidth, ...TypoGrayphy.heading5, color: Colors.backgroudWhite }}>:</Text>
      <View style={{
        width: 42 * calWidth,
        height: 42 * calWidth,
        borderRadius: 5,
        backgroundColor: Colors.backgroudWhite,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Text style={{ ...TypoGrayphy.heading4 }}>{timeInString[2]}</Text>
      </View>
    </View>
  )
}
export default CountDownComponent

import React from 'react'
import {
  View, Image, Dimensions, StyleSheet,
} from 'react-native'
import Text from '../Text'
import {
  Colors, mainPaddingH, calWidth, TypoGrayphy,
} from '@/assets/styles'
import CountDownComponent from '../CountDown'

const { width } = Dimensions.get('window')

interface Props {
  content: string,
  image: number,
  time?: string,
  topic: string,
}
const SaleOffComponent = ({ content, image, time, topic }: Props) => {

  return (
    <View style={{
      marginTop: mainPaddingH,
    }}
    >
      <Image source={image} resizeMode="cover" style={{ height: 206 * calWidth, width: width - 32 * calWidth }} />
      <View style={{ position: 'absolute', marginLeft: 40 * calWidth }}>
        <Text style={{
          ...TypoGrayphy.heading2,
          width: 169 * calWidth,
          height: 72 * calWidth,
          // marginVertical: 48 * calWidth,
          marginTop: 48 * calWidth,
          marginBottom: 24 * calWidth,
          color: Colors.backgroudWhite,
        }}
        >
          {topic}
        </Text>
        {content && content ? <Text style={{ color: Colors.backgroudWhite }}>{content}</Text>
          : <CountDownComponent time={time} />}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartTime: {
    width: 42 * calWidth,
    height: 42 * calWidth,
    borderRadius: 5,
    backgroundColor: Colors.backgroudWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SaleOffComponent

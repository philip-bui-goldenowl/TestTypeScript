

import React, { type PropsWithChildren } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import icons from '@/assets/icons';
import { ScreenName } from '@/constants';

interface Props {
  navigation: any;
}
const About = (props: Props) => {
  const { navigation } = props;
  return <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
    <View>
      <Text>Go to detail screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenName.DETAIL)}>
        <Text style={{ color: 'blue' }}>Detail screen</Text>
      </TouchableOpacity>
    </View>
    <Image source={icons.avatar} style={{ width: 50, height: 50 }} />
  </View>
}
export default About
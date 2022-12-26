import React, { type PropsWithChildren } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Detail = () => {
  const navigation = useNavigation()
  return <View>
    <Text>Hello guy</Text>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Go back</Text>
    </TouchableOpacity>
  </View>
}
export default Detail
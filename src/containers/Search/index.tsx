import icons from '@/assets/icons';
import { calWidth, Colors, mainPaddingH } from '@/assets/styles';
import { Text } from '@/components';
import { SEARCH_CATEGORY } from '@/utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';


const SearchScreen = () => {

  const [searchCategory, { called, loading, data }] = useLazyQuery(SEARCH_CATEGORY, {
    variables: {
      search: `%adidas%`
    },
  });
  const handleSearch = (value: string) => {

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.search, { borderColor: Colors.neutralLine }]}>
              <Image
                source={icons.search}
                style={styles.iconSearch}
                resizeMode="contain"
              />
              <TextInput
                onChangeText={(text) => handleSearch(text)}
                placeholder="Search"
                style={{ flex: 1, marginLeft: mainPaddingH, color: Colors.neutralDark }}
              // onFocus={() => handleFocus()}
              />


            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text>afafaf</Text>
        </View>
      </View>
    </SafeAreaView>
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
    borderWidth: StyleSheet.hairlineWidth * 2,
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

export default SearchScreen
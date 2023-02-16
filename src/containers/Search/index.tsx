import icons from '@/assets/icons';
import { calWidth, Colors, mainPaddingH, TypoGrayphy } from '@/assets/styles';
import { CategoryCard, ProductCart, Text } from '@/components';
import LoadingIndicator from '@/components/Loading';
import { SearchProps } from '@/types/navigation';
import { Category } from '@/types/order';
import { SEARCH_CATEGORY } from '@/utils/queries';
import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, } from 'react-native';


const SearchScreen = ({ navigation }: SearchProps) => {

  const [value, setValue] = useState<string>()
  const [category, setCategory] = useState<Category[]>([])

  const [searchCategory, { called, loading, data }] = useLazyQuery(SEARCH_CATEGORY);
  const handleSearch = async () => {
    const res = await searchCategory({
      variables: {
        search: `%${value}%`
      },
    })
    setCategory(res.data?.category)
  }

  if (loading) {
    return <LoadingIndicator modalVisible />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go back</Text>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.search, { borderColor: Colors.neutralLine }]}>
              <Image
                source={icons.search}
                style={styles.iconSearch}
                resizeMode="contain"
              />
              <TextInput
                onChangeText={(text) => setValue(text)}
                placeholder="Search"
                style={{ flex: 1, marginLeft: mainPaddingH, color: Colors.neutralDark }}
                onSubmitEditing={handleSearch}
              // onFocus={() => handleFocus()}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <FlatList
            data={category}
            style={{ marginLeft: mainPaddingH, marginTop: 12 * calWidth }}
            horizontal
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={styles.dividerHorizontal} />
              );
            }}
            renderItem={({ item }) => {
              return (
                <CategoryCard style={{ marginLeft: mainPaddingH }} category={item} onPressCategory={() => { }} />
              )
            }}
            keyExtractor={(item) => `Productline list ${item.id}`}
          />
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
  dividerHorizontal: {
    height: "100%",
    width: 16,
  },
  productCard: {
    paddingVertical: 16,
    width: 165 * calWidth,
    sImage: 133 * calWidth,
  },
  moreCategory: { ...TypoGrayphy.linkLargeTextBold14 },
  titleCategory: { ...TypoGrayphy.heading5 },
  swipperWrapper: {
    height: 270 * calWidth,
  },
  labelCate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: mainPaddingH,
    marginBottom: 12 * calWidth,
  },
  divider: {
    borderTopColor: Colors.neutralLine,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
  },
})

export default SearchScreen
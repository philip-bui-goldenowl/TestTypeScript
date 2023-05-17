
import React, { useState } from 'react';
import { HeaderCommon, Text } from "@/components"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ShortByProps } from '@/types/navigation';
import { TypoGrayphy, Colors } from '@/assets/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateShortBy } from '@/store/product/slice';
import { RootState } from '@/store';
import ModalScreen from './Modal';

const filterList = ['title', 'size', 'color']
const ShortBy = ({ navigation }: ShortByProps) => {
  const dispatch = useDispatch()
  const filtered = useSelector((state: RootState) => state.product)
  const [selectFilter, setSelectFilter] = useState<string>(filtered.filtered.shortBy)
  const [showModal, setShowModal] = useState(false)
  const handleChooseFilter = async (filter: string) => {
    setSelectFilter(filter)
    setShowModal(true)
  }
  const handleUpdateFilter = async (filter: string) => {
    await dispatch(updateShortBy({
      shortBy: selectFilter,
      value: filter
    }))
    navigation.goBack()
  }
  return (
    <View >
      <HeaderCommon title='Short By' navigation={navigation} />
      <View style={styles.viewFilter}>
        {filterList.map((filter) => {
          return (
            <TouchableOpacity key={filter} onPress={() => handleChooseFilter(filter)}>
              <View key={filter} style={[styles.sortBy, selectFilter === filter && { backgroundColor: Colors.neutralLine }]}  >
                <Text style={[styles.textButton, { color: selectFilter === filter ? Colors.primaryBlue : Colors.neutralDark }]} >{`Short By: ${filter}`}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <ModalScreen onUpdateFilter={(filter) => handleUpdateFilter(filter ?? '')} filtered={selectFilter} modalVisible={showModal} setShowModal={(value) => setShowModal(value)} />
    </View >
  )
}

const styles = StyleSheet.create({
  sortBy: { marginBottom: 8, padding: 8 },
  viewFilter: { marginLeft: 16, marginTop: 16 },
  textButton: { ...TypoGrayphy.linkLargeTextBold14 }
})
export default ShortBy
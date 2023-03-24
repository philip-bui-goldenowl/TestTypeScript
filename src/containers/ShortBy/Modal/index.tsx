import icons from "@/assets/icons";
import { colorData, FilterSearch, Fonts, nums, uploadUrl } from "@/constants";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, useWindowDimensions, Dimensions, TextInput } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { Order } from '@/types/order'
import FastImage from "react-native-fast-image";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY, ADD_PRODUCT, GET_CATEGORY, GET_ORDER } from "@/utils/queries";
import { Button, SelectColorOption, SelectSizeOption } from "@/components";
import { calWidth, Colors, mainPaddingH, TypoGrayphy } from "@/assets/styles";

interface Props {
  modalVisible: boolean
  setShowModal: (value: boolean) => void
  onUpdateFilter: (title: string | undefined) => void,
  title?: string | undefined,
  filtered: string | undefined
}
const { width } = Dimensions.get('window')
const ModalScreen = ({ modalVisible, setShowModal, onUpdateFilter, filtered }: Props) => {

  const [value, setValue] = useState<string>();
  const [currentSize, setCurrentSize] = useState<string>()
  const [currentColor, setCurrentColor] = useState<string>()


  const handleChooseOptionSize = (size: string) => {
    setCurrentSize(size)
  }

  const handleApply = () => {
    let filter: string | undefined
    if (filtered === 'size') {
      filter = currentSize
    }
    else if (filtered === 'color') {
      filter = currentColor
    }
    else {
      filter = value
    }
    onUpdateFilter(filter)
    setShowModal(false)
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setShowModal(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filter Search</Text>
          {filtered === FilterSearch.SIZE && <View style={styles.viewPadding}>
            <Text style={[styles.textStyle, { color: Colors.black, marginBottom: 20 }]}>
              Select Size
            </Text>
            <FlatList
              data={nums}
              horizontal
              style={{ flexGrow: 0, marginBottom: 24 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <SelectSizeOption
                    itemSize={item}
                    handleChooseOptionSize={handleChooseOptionSize}
                    isSelected={item === currentSize}
                  />
                )
              }}
              keyExtractor={(item, index) => `List_nums_${index}`}
            />
          </View>}
          {filtered === FilterSearch.COLOR && <View style={styles.viewPadding}>
            <Text style={styles.titleHeaderContent}>
              Select Color
            </Text>
            <FlatList
              data={colorData}
              horizontal
              style={{ flexGrow: 0, marginBottom: 24 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <SelectColorOption
                    itemColor={item}
                    handleChooseColor={(color: string) => {
                      setCurrentColor(color)
                    }}
                    isSelected={item === currentColor}
                  />
                )
              }}
              keyExtractor={(item, index) => `List Color ${index}`}
            />
          </View>}
          {filtered === 'title' && <View>
            <View style={styles.input}>
              <TextInput
                value={value}
                placeholder="Tên sản phẩm"
                style={styles.textInput}
                onChangeText={(text) => {
                  setValue(text)
                }} />
            </View></View>}
          <Button name="Apply" style={{ width: width * 0.6 }} handleClick={handleApply} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen

const styles = StyleSheet.create({
  titleUserReview: { ...TypoGrayphy.heading5 },
  titleRating: {
    marginLeft: 8 * calWidth,
    ...Fonts.fontPoppinsBold,
    color: Colors.neutralGrey,
  },
  viewUserReview: {
    justifyContent: 'space-between', height: 48 * calWidth, marginLeft: mainPaddingH,
  },
  avatarReview: { width: 48 * calWidth, height: 48 * calWidth, marginTop: 8 * calWidth },
  viewRating: { flexDirection: 'row', alignItems: 'center' },
  labelSeeMoreReview: { ...TypoGrayphy.linkLargeTextBold14 },
  viewReview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewSpecitionStyle: { flexDirection: 'row', justifyContent: 'space-between', marginTop: mainPaddingH },
  contentSpecication: {
    textAlign: 'right', color: Colors.neutralGrey,
  },
  viewSpecition: { flexDirection: 'row', justifyContent: 'space-between' },
  viewCateDetail: { paddingTop: 24 * calWidth, paddingRight: mainPaddingH },
  viewPadding: { paddingVertical: 12 },
  iconFavorite: { width: 24 * calWidth, height: 24 * calWidth },
  viewTileRow: { flexDirection: 'row', justifyContent: 'space-between' },
  viewTitle: { paddingRight: mainPaddingH },
  viewWapper: { flex: 1, paddingLeft: mainPaddingH },
  viewSwiper: { width, height: 260 * calWidth },
  viewPagination: { flexDirection: 'row', justifyContent: 'center', paddingVertical: mainPaddingH },
  viewDot: {
    width: 8 * calWidth,
    height: 8 * calWidth,
    borderRadius: 4 * calWidth,
    marginRight: 8 * calWidth,
  },
  titleHeaderContent: {
    ...TypoGrayphy.heading5,
    marginBottom: 12 * calWidth,

  },

  circleSelected: {
    backgroundColor: Colors.backgroudWhite,
    width: mainPaddingH,
    height: mainPaddingH,
    borderRadius: 8 * calWidth,
  },
  circlePoint: {
    width: 48 * calWidth,
    height: 48 * calWidth,
    borderRadius: 24 * calWidth,
    borderColor: Colors.neutralLine,
    borderWidth: StyleSheet.hairlineWidth * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroudWhite,
    marginRight: mainPaddingH,
  },
  textInput: { paddingVertical: 8, flex: 1, fontSize: 16, marginLeft: 10 },
  viewImage: {
    height: 240, alignItems: 'center',
    borderRadius: 24, marginVertical: 8,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  loading: {
    position: "absolute",
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: 'row',
    width: 300,
    marginBottom: 16,
    borderWidth: 0.5,
    borderRadius: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: 16,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    flex: 1,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 8,
    flex: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  }
});

import { calWidth, Colors, mainPaddingH, TypoGrayphy } from "@/assets/styles"
import { Fonts } from "@/constants"
import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  box: {
    width: 150,
    height: 150,

    backgroundColor: 'mediumspringgreen',
    margin: 10,
    zIndex: 200,
  },
  buttonAddCart: {
    marginBottom: mainPaddingH,
    position: 'absolute',
    bottom: 0,
    width,
  },
  timeReview: {
    color: Colors.neutralGrey,
    fontSize: 10,
    ...Fonts.fontPoppins,
    marginTop: mainPaddingH,
  },
  imageReview: {
    width: 72 * calWidth,
    height: 72 * calWidth,
    marginRight: 12 * calWidth,
  },
  viewContentReview: { marginVertical: mainPaddingH },
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
  viewPadding: { paddingTop: 24 * calWidth },
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
  price: {
    ...TypoGrayphy.heading3,
    color: Colors.primaryBlue,
  },
  nameProduct: {
    ...TypoGrayphy.heading3,
    width: 275 * calWidth,
  },
  image: {
    width,
    height: 238 * calWidth,
  },
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mainPaddingH,
    paddingBottom: 28 * calWidth,
    borderBottomColor: Colors.neutralLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 26 * calWidth,
  },
  titleAppbar: {
    marginLeft: 12 * calWidth,
    ...TypoGrayphy.heading4,

  },
})

export default styles
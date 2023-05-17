import { calWidth, Colors, mainPaddingH, TypoGrayphy } from "@/assets/styles"
import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  viewWrapper: {
    paddingHorizontal: mainPaddingH,
  },
  buttonRegister: {
    ...TypoGrayphy.linkLargeTextBold12,
    marginLeft: 4 * calWidth,
  },
  titleDontAccount: {
    ...TypoGrayphy.captionLargeTextBold12,
    color: Colors.neutralGrey,
  },
  viewDontAccount: {
    flexDirection: 'row',
    marginTop: 16 * calWidth,
    justifyContent: 'center',
    marginBottom: 20 * calWidth,
  },
  labelForgotPass: {
    textAlign: 'center',
    marginTop: mainPaddingH,
    ...TypoGrayphy.linkLargeTextBold12,
  },
  labelSocial: {
    textAlign: 'center',
    flex: 1,
    ...TypoGrayphy.bodyMediumTextBold,
    color: Colors.neutralGrey,
  },
  imageSocial: {
    width: 24 * calWidth,
    height: 24 * calWidth,
  },
  viewLoginSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: mainPaddingH,
    borderRadius: 5 * calWidth,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: Colors.neutralLine,
    marginTop: mainPaddingH,
  },
  labelDivider: {
    ...TypoGrayphy.bodyMediumTextBold,
    color: Colors.neutralGrey,
    marginLeft: 23 * calWidth,
    marginRight: 23 * calWidth,
  },
  viewDivider: { flexDirection: 'row', marginTop: 20 * calWidth, alignItems: 'center' },
  divider: { height: 1 * calWidth, flex: 1, backgroundColor: Colors.neutralLine },
  viewButton: { marginTop: mainPaddingH },
  viewInput: {
    borderRadius: 5 * calWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12 * calWidth,
    borderColor: Colors.neutralLine,
  },
  viewHeader: {
    marginTop: 28 * calWidth,
    width: width,
    paddingHorizontal: mainPaddingH,
    alignItems: 'center',
  },
  imageLogin: {
    width: 24 * calWidth, height: 24 * calWidth, paddingLeft: 4 * calWidth, marginRight: 10 * calWidth,
  },
  labelSignIn: { marginVertical: 8 * calWidth },
  label: { ...TypoGrayphy.heading4, marginTop: mainPaddingH },
  logo: {
    width: 72 * calWidth,
    height: 72 * calWidth,
    marginTop: 68 * calWidth,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  // viewHeader: {  },
})
export default styles
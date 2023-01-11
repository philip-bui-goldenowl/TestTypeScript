import { calWidth, Colors, mainPaddingH, TypoGrayphy } from '@/assets/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: mainPaddingH,
    alignItems: 'center',
    height: 46 * calWidth,
    marginHorizontal: mainPaddingH,
  },
})
export default styles

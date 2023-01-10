import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
export const calWidth = width / 375
export const mainPaddingH = 16 / 375 * width

const Colors = {
  primaryBlue: '#40BFFF',
  primaryRed: '#FB7181',
  primaryYellow: '#FFC833',
  primaryGreen: '#53D1B6',
  primaryPurple: '#5C61F4',
  neutralDark: '#223263',
  neutralGrey: '#9098B1',
  neutralLine: '#d2ddff',
  backgroudWhite: '#FFF',
  borderColor: '#d2ddff',
  black: '#000000'

}

const Fonts = {
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  regular: {
    fontFamily: 'Poppins-Regular',
  },
}

const TypoGrayphy = {
  heading1: {
    ...Fonts.bold,
    fontSize: 32,
    lineHeight: 1.5,
  },
  heading2: {
    ...Fonts.bold,
    fontSize: 24,
    lineHeight: 1.5,
  },
  heading3: {
    ...Fonts.bold,
    fontSize: 20,
    lineHeight: 1.5,
  },
  heading4: {
    ...Fonts.bold,
    fontSize: 16,
    lineHeight: 1.5,
  },
  heading5: {
    ...Fonts.bold,
    fontSize: 14,
    lineHeight: 1.5,
  },
  heading6: {
    ...Fonts.bold,
    fontSize: 10,
    lineHeight: 1.5,
  },
  bodyLargeTextBold: {
    ...Fonts.bold,
    fontSize: 16,
  },
  bodyLargeTextRegular: {
    ...Fonts.regular,
    fontSize: 16,
  },
  bodyMediumTextBold: {
    ...Fonts.bold,
    fontSize: 14,
  },
  bodyMediumTextRegular: {
    ...Fonts.regular,
    fontSize: 14,
  },
  bodyNormalTextBold: {
    ...Fonts.bold,
    fontSize: 12,
  },
  bodyNormalTextRegular: {
    ...Fonts.regular,
    fontSize: 12,
  },
  captionLargeTextBold12: {
    ...Fonts.bold,
    fontSize: 12,
    lineHeight: 1.5,
  },
  captionLargeTextRegular12: {
    ...Fonts.bold,
    fontSize: 12,
    lineHeight: 1.5,
  },
  captionLargeTextBold10: {
    ...Fonts.bold,
    fontSize: 10,
    lineHeight: 1.5,
  },
  captionLargeTextRegular10: {
    ...Fonts.regular,
    fontSize: 10,
    lineHeight: 1.5,
  },
  captionLargeTextLine: {
    textDecorationLine: 'line-through',
  },
  linkLargeTextBold14: {
    ...Fonts.bold,
    fontSize: 14,
    lineHeight: 1.5,
    color: Colors.primaryBlue,
  },
  linkLargeTextBold12: {
    ...Fonts.bold,
    fontSize: 12,
    lineHeight: 1.5,
    color: Colors.primaryBlue,
  },
  buttonText: {
    ...Fonts.bold,
    fontSize: 14,
    color: Colors.backgroudWhite,
  },

}
const Shadows = {
  buttonShadow: {
    shadowColor: Colors.primaryRed,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 30,
    elevation: 8,
  },
}
export {
  Colors, TypoGrayphy, Fonts, Shadows,
}
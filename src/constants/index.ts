import icons, { phoduct2, productLike, shoes_2 } from '@/assets/icons'
import { Colors } from '@/assets/styles'

export enum ScreenName {
  ABOUT = 'ABOUT',
  DETAIL = 'DETAIL',
  HOME = 'Home',
  EXPLORE = 'Explore',
  SEARCH = 'Search',
  LOGIN = 'Login',
  MAIN_TAB = 'MainTab',
  SPLASH_SCREEN = 'SplashScreen',
  PROFILE = 'Profile',
  UPDATE_PASSWORD = 'UpdatePassword',
  PHONE = 'Phone',
  PRODUCT_DETAIL = 'ProductDetail',
  UPDATE_INFO_USER = 'UpdateInfoUser',
  PRODUCT = 'Product',
  SHORT_BY = 'ShortBy',
  REGISTER = 'Register',
}

export enum StorageKey {
  authAccessToken = '@auth:accessToken',
  memberId = '@auth:memberId',
};

export const uploadUrl = 'https://api.cloudinary.com/v1_1/dgputbexe/image/upload'

export enum RequestStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
};

export enum FilterSearch {
  SIZE = 'size',
  COLOR = 'color',
  TITLE = 'title'
}

export const MenuTab = [
  {
    title: 'Home',
    image: icons.home,
  },
  // {
  //   title: 'Explore',
  //   image: icons.search,
  // },
  // {
  //   title: 'Cart',
  //   image: icons.cart,
  // },
  // {
  //   title: 'Offer',
  //   image: icons.offer,
  // },
  {
    title: 'Account',
    image: icons.userIcon,
  },
]
export const Fonts = {
  fontPoppins: {
    fontFamily: 'Poppins-Regular',
  },
  fontPoppinsBold: {
    fontFamily: 'Poppins-Bold',
  },
}
export const productLikes = [
  { image: productLike },
  { image: shoes_2 },
  { image: phoduct2 },
]
export const colorData = [
  Colors.primaryYellow,
  Colors.primaryBlue,
  Colors.primaryRed,
  Colors.primaryGreen,
  Colors.primaryPurple,
  Colors.neutralDark,
]
export const nums = [
  '6', '6.5', '7', '7.5', '8', '8.5',
]
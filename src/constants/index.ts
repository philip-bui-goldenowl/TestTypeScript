import icons from '@/assets/icons'

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
}

export enum StorageKey {
  authAccessToken = '@auth:accessToken',
  memberId = '@auth:memberId',
};

export enum RequestStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
};

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
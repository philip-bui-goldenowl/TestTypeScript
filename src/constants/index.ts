import icons from '@/assets/icons'

export enum ScreenName {
  ABOUT = 'ABOUT',
  DETAIL = 'DETAIL',
  HOME = 'Home',
  EXPLORE = 'Explore',
  SEARCH = 'Search'
}

export const MenuTab = [
  {
    title: 'Home',
    image: icons.home,
  },
  {
    title: 'Explore',
    image: icons.search,
  },
  {
    title: 'Cart',
    image: icons.cart,
  },
  {
    title: 'Offer',
    image: icons.offer,
  },
  {
    title: 'Account',
    image: icons.userIcon,
  },
]
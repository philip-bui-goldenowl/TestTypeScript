

export type RootStackParamList = {
  SplashScreen: undefined,
  Search: undefined,
  Login: undefined,
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
  UpdatePassword: {
    userId: number | undefined
  },
  Phone: {
    phone: number,
    userId: number | undefined
  },
  MainTab: undefined,
  ProductDetail: {
    id: number,
    name: string
  }
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
}
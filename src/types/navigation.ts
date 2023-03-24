import { ScreenName } from "@/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./stack";


export type PhoneProps = NativeStackScreenProps<RootStackParamList, ScreenName.PHONE>;

export type ProfileProps = NativeStackScreenProps<RootStackParamList, ScreenName.PROFILE>;
export type UpdateProps = NativeStackScreenProps<RootStackParamList, ScreenName.UPDATE_PASSWORD>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, ScreenName.LOGIN>;
export type SplashProps = NativeStackScreenProps<RootStackParamList, ScreenName.SPLASH_SCREEN>;
export type SearchProps = NativeStackScreenProps<RootStackParamList, ScreenName.SEARCH>;
export type ProductDetailProps = NativeStackScreenProps<RootStackParamList, ScreenName.PRODUCT_DETAIL>;
export type UpdateInfoUserProps = NativeStackScreenProps<RootStackParamList, ScreenName.UPDATE_INFO_USER>;
export type ProductProps = NativeStackScreenProps<RootStackParamList, ScreenName.PRODUCT>;
export type ShortByProps = NativeStackScreenProps<RootStackParamList, ScreenName.SHORT_BY>;

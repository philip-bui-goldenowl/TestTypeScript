import AsyncStorage from "@react-native-async-storage/async-storage";

import { getValue, setValue } from './Helper'


const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return getValue(value);
  } catch {
    return '';
  }
};

const set = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, setValue(value));
  } catch { }
};
const StoredData = {
  get,
  set,
};

export default StoredData;
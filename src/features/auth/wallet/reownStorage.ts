import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Storage} from '@reown/appkit-react-native';

export const reownStorage: Storage = {
  async getEntries<T = unknown>(): Promise<[string, T][]> {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.getMany(keys);
    return Object.entries(values).flatMap(([key, value]) =>
      value === null ? [] : ([[key, JSON.parse(value) as T]] as [string, T][]),
    );
  },

  getKeys(): Promise<string[]> {
    return AsyncStorage.getAllKeys();
  },

  async getItem<T = unknown>(key: string): Promise<T | undefined> {
    const value = await AsyncStorage.getItem(key);
    return value === null ? undefined : (JSON.parse(value) as T);
  },

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async setItem<T = unknown>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};

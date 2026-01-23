import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData, AppSettings, PermissionState } from '../types';

export const storageKeys = {
  USER_DATA: '@existential_user_data',
  APP_SETTINGS: '@existential_settings',
  PERMISSIONS: '@existential_permissions',
  LAST_LOCATION: '@existential_last_location',
  SECURE_PREFIX: '@existential_secure_',
};

export class StorageService {
  // User Data
  static async saveUserData(userData: UserData): Promise<void> {
    try {
      await AsyncStorage.setItem(
        storageKeys.USER_DATA,
        JSON.stringify(userData)
      );
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  static async getUserData(): Promise<UserData | null> {
    try {
      const data = await AsyncStorage.getItem(storageKeys.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  // App Settings
  static async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(
        storageKeys.APP_SETTINGS,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  static async getSettings(): Promise<AppSettings | null> {
    try {
      const data = await AsyncStorage.getItem(storageKeys.APP_SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving settings:', error);
      return null;
    }
  }

  // Permissions State
  static async savePermissions(permissions: PermissionState): Promise<void> {
    try {
      await AsyncStorage.setItem(
        storageKeys.PERMISSIONS,
        JSON.stringify(permissions)
      );
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  }

  static async getPermissions(): Promise<PermissionState | null> {
    try {
      const data = await AsyncStorage.getItem(storageKeys.PERMISSIONS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving permissions:', error);
      return null;
    }
  }

  // API Key (Secure)
  static async saveApiKey(key: string, value: string): Promise<void> {
    try {
      const secureAvailable = await SecureStore.isAvailableAsync().catch(() => false);
      if (secureAvailable) {
        await SecureStore.setItemAsync(key, value);
        return;
      }

      await AsyncStorage.setItem(`${storageKeys.SECURE_PREFIX}${key}`, value);
    } catch (error) {
      console.error('Error saving API key:', error);
    }
  }

  static async getApiKey(key: string): Promise<string | null> {
    try {
      const secureAvailable = await SecureStore.isAvailableAsync().catch(() => false);
      if (secureAvailable) {
        return await SecureStore.getItemAsync(key);
      }

      return await AsyncStorage.getItem(`${storageKeys.SECURE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }

  // Clear all data
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(storageKeys));
      const allKeys = await AsyncStorage.getAllKeys();
      const secureKeys = allKeys.filter((key) =>
        key.startsWith(storageKeys.SECURE_PREFIX)
      );
      if (secureKeys.length > 0) {
        await AsyncStorage.multiRemove(secureKeys);
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

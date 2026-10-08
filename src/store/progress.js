import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@pyquest_progress';

export const loadProgress = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('loadProgress error', e);
  }
  return {
    completedLessons: {},
    crystals: 0,
    achievements: [],
    streak: 1,
  };
};

export const saveProgress = async (progress) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('saveProgress error', e);
  }
};

export const resetProgress = async () => {
  await AsyncStorage.removeItem(KEY);
};
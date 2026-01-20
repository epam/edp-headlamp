export const LOCAL_STORAGE_SERVICE = {
  getItem: (key: string) => {
    const lsValue = localStorage.getItem(key);
    if (!lsValue) {
      return null;
    }

    try {
      return JSON.parse(lsValue);
    } catch (error) {
      // If JSON parse fails (corrupted data), remove the item and return null
      console.warn(`Failed to parse localStorage item "${key}":`, error);
      localStorage.removeItem(key);
      return null;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set localStorage item "${key}":`, error);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const LOCAL_STORAGE_SERVICE = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);

    if (typeof item === 'string') {
      return item;
    }

    return JSON.parse(item);
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

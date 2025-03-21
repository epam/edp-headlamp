export const LOCAL_STORAGE_SERVICE = {
  getItem: (key: string) => {
    const lsValue = localStorage.getItem(key);
    return lsValue ? JSON.parse(lsValue) : null;
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const LOCAL_STORAGE_SERVICE = {
  getItem: (key: string) => {
    return JSON.parse(localStorage.getItem(key));
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

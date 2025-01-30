import { LOCAL_STORAGE_SERVICE } from '../../../../../services/local-storage';
import { SavedTableSettings } from '../types';

const LS_KEY_TABLE_SETTINGS = 'tableSettings';

export const useTableSettings = (tableId: string) => {
  const loadSettings = (): SavedTableSettings => {
    return LOCAL_STORAGE_SERVICE.getItem(LS_KEY_TABLE_SETTINGS)?.[tableId] ?? {};
  };

  const saveSettings = (settings: SavedTableSettings) => {
    const currentSettings: SavedTableSettings =
      LOCAL_STORAGE_SERVICE.getItem(LS_KEY_TABLE_SETTINGS) ?? {};
    LOCAL_STORAGE_SERVICE.setItem(LS_KEY_TABLE_SETTINGS, {
      ...currentSettings,
      [tableId]: settings,
    });
  };

  return { loadSettings, saveSettings };
};

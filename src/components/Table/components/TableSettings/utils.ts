import { SavedTableSettings } from './types';

export const getSavedColumnData = (settings: SavedTableSettings, columnId: string) => {
  return settings?.[columnId];
};

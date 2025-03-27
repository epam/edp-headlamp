import { TABLE_CELL_DEFAULTS } from '../../constants';
import { SavedTableSettings } from './types';

export const getSyncedColumnData = (
  settings: SavedTableSettings | undefined,
  columnId: string,
  baseWidth: number
): {
  baseWidth: number;
  width: number;
  show: boolean;
} => {
  const tableSettings = settings?.[columnId];

  return {
    baseWidth,
    width: tableSettings?.width || baseWidth || TABLE_CELL_DEFAULTS.WIDTH,
    show: tableSettings?.show ?? TABLE_CELL_DEFAULTS.SHOW,
  };
};

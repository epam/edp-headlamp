import { ValueOf } from '../../types/global';

export const VIEW_MODES = {
  TABLE: 'table',
  GRID: 'grid',
  COMPACT: 'compact',
  DETAILED: 'detailed',
} as const;

export type ViewMode = ValueOf<typeof VIEW_MODES>;

export interface ViewModeContextProviderValue {
  entityID: string | null;
  viewMode: ViewMode;
  handleChangeViewMode: (viewMode: ViewMode) => void;
}

export interface ViewModeContextProviderProps {
  entityID: string;
  defaultViewMode?: ViewMode;
}

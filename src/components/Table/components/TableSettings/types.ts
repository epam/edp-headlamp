import { TableColumn } from '../../types';

export interface TableSettingsProps<DataType> {
  id: string;
  name?: string;
  originalColumns: TableColumn<DataType>[];
  columns: TableColumn<DataType>[];
  setColumns: React.Dispatch<React.SetStateAction<TableColumn<DataType>[]>>;
  hasSelection: boolean;
}

export interface TableSettingColumn<DataType> {
  id: TableColumn<DataType>['id'];
  label: TableColumn<DataType>['label'];
  show: boolean;
  disabled: boolean;
}

export interface TableSettingsColumns<DataType> {
  [key: string]: TableSettingColumn<DataType>;
}

export interface SavedTableSettings {
  [key: string]: {
    id: string;
    show: boolean;
    width: number;
  };
}

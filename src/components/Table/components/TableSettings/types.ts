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

export type TableSettingsColumns<DataType> = Record<string, TableSettingColumn<DataType>>;

export type SavedTableSettings = Record<
  string,
  {
    id: string;
    show: boolean;
    width: number;
  }
>;

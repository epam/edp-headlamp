type sortFunction = (arg1: any, arg2: any) => number;
type getterFunction = (arg: any) => any;

interface HeadlampSimpleTableColumn {
  label: string;
  cellProps?: {
    [propName: string]: any;
  };
  sort?: sortFunction | getterFunction | boolean;
}

interface HeadlampSimpleTableDatumColumn extends HeadlampSimpleTableColumn {
  datum: string;
}

export interface HeadlampSimpleTableGetterColumn<T = {}> extends HeadlampSimpleTableColumn {
  getter: (...args: T[]) => React.ReactNode;
}

export interface HeadlampSimpleTableProps {
  columns: (HeadlampSimpleTableGetterColumn | HeadlampSimpleTableDatumColumn)[];
  data:
    | {
        [dataProp: string]: any;
        [dataProp: number]: any;
      }[]
    | null;
  filterFunction?: (...args: any[]) => boolean;
  rowsPerPage?: number[];
  emptyMessage?: string;
  errorMessage?: string | null;
  defaultSortingColumn?: number;
}

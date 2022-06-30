type TableRowValue = string | JSX.Element | JSX.Element[];

export interface NameValueTableRow {
    name: string | JSX.Element;
    value?: TableRowValue;
    hide?: boolean | ((value: TableRowValue) => boolean);
}

export interface HeadlampNameValueTableProps {
    rows: NameValueTableRow[];
}

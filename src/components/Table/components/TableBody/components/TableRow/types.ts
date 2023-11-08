import React from 'react';
import { TableColumn } from '../../../../types';

export interface TableRowProps<DataType = unknown> {
    item: DataType;
    columns: readonly TableColumn<DataType>[];
    isSelected?: boolean;
    handleRowClick?: (event: React.MouseEvent<HTMLTableRowElement>, row: DataType) => void;
    handleSelectRowClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        row: DataType
    ) => void;
}

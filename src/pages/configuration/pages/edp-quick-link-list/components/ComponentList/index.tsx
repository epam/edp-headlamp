import React from 'react';
import { Table } from '../../../../../../components/Table';
import { useColumns } from './hooks/useColumns';
import { QuickLinkListProps } from './types';

export const QuickLinkList = ({ items, error, filterFunction }: QuickLinkListProps) => {
  const columns = useColumns();

  return (
    <>
      <Table
        isLoading={!items}
        data={items}
        error={error}
        columns={columns}
        filterFunction={filterFunction}
      />
    </>
  );
};

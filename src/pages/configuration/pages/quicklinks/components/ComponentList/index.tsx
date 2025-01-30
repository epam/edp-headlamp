import React from 'react';
import { Table } from '../../../../../../components/Table';
import { TABLES } from '../../../../../../constants/tables';
import { useColumns } from './hooks/useColumns';
import { QuickLinkListProps } from './types';

export const QuickLinkList = ({ items, errors, filterFunction }: QuickLinkListProps) => {
  const columns = useColumns();

  return (
    <>
      <Table
        id={TABLES.QUICKLINK_LIST.id}
        name={TABLES.QUICKLINK_LIST.name}
        isLoading={items === null && (!errors || !errors.length)}
        data={items}
        errors={errors}
        columns={columns}
        filterFunction={filterFunction}
      />
    </>
  );
};

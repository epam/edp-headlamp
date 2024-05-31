import React from 'react';
import { EmptyList } from '../../../../../../components/EmptyList';
import { Table } from '../../../../../../components/Table';
import { Shop } from '../../../../../../icons/other/Shop';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';
import { useColumns } from './hooks/useColumns';
import { TemplatesTableProps } from './types';

export const TemplatesTable = ({
  data,
  handleTemplateClick,
  filterFunction,
  warning,
  error,
  permissions,
}: TemplatesTableProps) => {
  const columns = useColumns();

  return (
    <Table<EDPTemplateKubeObjectInterface>
      error={error}
      columns={columns}
      data={data}
      isLoading={data === null}
      handleRowClick={permissions.create === true ? (event, row) => handleTemplateClick(row) : null}
      emptyListComponent={
        warning ? (
          warning
        ) : (
          <EmptyList
            missingItemName={'templates'}
            icon={<Shop width={128} height={128} fill="#A2A7B7" />}
          />
        )
      }
      filterFunction={filterFunction}
    />
  );
};

import React from 'react';
import { EmptyList } from '../../../../../../components/EmptyList';
import { Table } from '../../../../../../components/Table';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';
import { useColumns } from './hooks/useColumns';
import { TemplatesTableProps } from './types';

export const TemplatesTable = ({
  activeTemplate,
  data,
  handleTemplateClick,
  filterFunction,
}: TemplatesTableProps) => {
  const columns = useColumns();

  return (
    <Table<EDPTemplateKubeObjectInterface>
      columns={columns}
      data={data}
      isLoading={!data}
      isSelected={(row) => row.metadata.uid === activeTemplate?.metadata.uid}
      handleRowClick={(event, row) => handleTemplateClick(event, row)}
      emptyListComponent={<EmptyList missingItemName={'templates'} />}
      filterFunction={filterFunction}
    />
  );
};

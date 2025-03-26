import React from 'react';
import { EmptyList } from '../../../../../../components/EmptyList';
import { Table } from '../../../../../../components/Table';
import { TABLE } from '../../../../../../constants/tables';
import { Shop } from '../../../../../../icons/other/Shop';
import { TemplateKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Template/types';
import { TemplateFilter } from '../../../Filter';
import { useColumns } from './hooks/useColumns';
import { TemplatesTableProps } from './types';

export const TemplatesTable = ({
  data,
  handleTemplateClick,
  filterFunction,
  warning,
  errors,
  permissions,
}: TemplatesTableProps) => {
  const columns = useColumns();

  return (
    <Table<TemplateKubeObjectInterface>
      id={TABLE.TEMPLATE_LIST.id}
      name={TABLE.TEMPLATE_LIST.name}
      errors={errors}
      columns={columns}
      data={data!}
      isLoading={data === null && (!errors || !errors.length)}
      handleRowClick={
        permissions.create.Codebase.allowed ? (event, row) => handleTemplateClick(row) : undefined
      }
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
      slots={{
        header: <TemplateFilter />,
      }}
      filterFunction={filterFunction}
    />
  );
};

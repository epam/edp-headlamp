import { FormHelperText, ListItemText, MenuItem, Select } from '@mui/material';
import React from 'react';
import { EmptyList } from '../../components/EmptyList';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { Table } from '../../components/Table';
import { PIPELINE_TYPE } from '../../constants/pipelineTypes';
import { TABLE } from '../../constants/tables';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../constants/ui';
import { Filter } from '../../providers/Filter/components/Filter';
import { NamespaceControl } from '../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../providers/Filter/components/Filter/components/SearchControl';
import { useFilterContext } from '../../providers/Filter/hooks';
import { FieldEvent } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { getClusterSettings } from '../../utils/getClusterSettings';
import { sortKubeObjectByCreationTimestamp } from '../../utils/sort/sortKubeObjectsByCreationTimestamp';
import { pipelineFilterControlNames } from './constants';
import { useColumns } from './hooks/useColumns';
import { PipelineListProps } from './types';

const pipelineTypes = [
  PIPELINE_TYPE.ALL,
  PIPELINE_TYPE.REVIEW,
  PIPELINE_TYPE.BUILD,
  PIPELINE_TYPE.DEPLOY,
  PIPELINE_TYPE.CLEAN,
  PIPELINE_TYPE.SECURITY,
  PIPELINE_TYPE.RELEASE,
  PIPELINE_TYPE.TESTS,
];

export const PipelineList = ({ pipelines, triggerTemplates, permissions }: PipelineListProps) => {
  const columns = useColumns({ permissions, triggerTemplates: triggerTemplates.data });

  const sortedPipelines = React.useMemo(() => {
    return pipelines.data?.sort(sortKubeObjectByCreationTimestamp);
  }, [pipelines]);

  const { filter, filterFunction, setFilterItem } = useFilterContext();

  const handleTypeChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      setFilterItem(pipelineFilterControlNames.PIPELINE_TYPE, value);
    },
    [setFilterItem]
  );

  const typesLabel = pipelineTypes
    .slice(0, 5)
    .map((el) => capitalizeFirstLetter(el))
    .join('/')
    .concat('...');

  return (
    <LoadingWrapper isLoading={triggerTemplates.isLoading}>
      <Table
        id={TABLE.PIPELINE_LIST.id}
        name={TABLE.PIPELINE_LIST.name}
        blockerError={pipelines.error}
        columns={columns}
        data={sortedPipelines}
        isLoading={pipelines.isLoading}
        filterFunction={filterFunction}
        emptyListComponent={<EmptyList missingItemName={'pipelines'} />}
        slots={{
          header: (
            <Filter
              controls={{
                search: {
                  component: <SearchControl />,
                },
                ...((getClusterSettings()?.allowedNamespaces || []).length > 1
                  ? {
                      namespace: {
                        component: <NamespaceControl />,
                      },
                    }
                  : {}),
                pipelineType: {
                  gridXs: 2,
                  component: (
                    <>
                      <Select
                        onChange={handleTypeChange}
                        name="type"
                        value={(filter.values.pipelineType as string) ?? PIPELINE_TYPE.ALL}
                        label={'Type'}
                        fullWidth
                        sx={{
                          height: (t) => t.typography.pxToRem(32),
                          mt: (t) => t.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT),
                        }}
                      >
                        {pipelineTypes.map((value) => (
                          <MenuItem value={value} key={value}>
                            <ListItemText>{capitalizeFirstLetter(value)}</ListItemText>
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{typesLabel}</FormHelperText>
                    </>
                  ),
                },
              }}
            />
          ),
        }}
      />
    </LoadingWrapper>
  );
};

import { Autocomplete, FormHelperText, TextField } from '@mui/material';
import React from 'react';
import { CDPipelineKubeObjectInterface } from '../../../../../k8s/groups/EDP/CDPipeline/types';
import { NamespaceControl } from '../../../../../providers/Filter/components/Filter/components/NamespaceControl';
import { SearchControl } from '../../../../../providers/Filter/components/Filter/components/SearchControl';
import { FilterControls } from '../../../../../providers/Filter/components/Filter/types';
import { useFilterContext } from '../../../../../providers/Filter/hooks';
import { getClusterSettings } from '../../../../../utils/getClusterSettings';
import { cdPipelineFilterControlNames } from '../../../constants';
import { CDPipelineFilterControlNames } from '../../../types';

type FilterControlsType = FilterControls<CDPipelineFilterControlNames>;

export const useFilter = ({
  cdPipelines,
}: {
  cdPipelines: CDPipelineKubeObjectInterface[] | null;
}): {
  controls: FilterControlsType;
  filterFunction: (...args: CDPipelineKubeObjectInterface[]) => boolean;
} => {
  const { filter, setFilterItem, filterFunction } = useFilterContext<
    CDPipelineKubeObjectInterface,
    CDPipelineFilterControlNames
  >();

  const handleCodebasesChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
      setFilterItem(cdPipelineFilterControlNames.CODEBASES, values);
    },
    [setFilterItem]
  );

  const cdPipelineCodebases = React.useMemo(() => {
    if (!cdPipelines) {
      return [] as string[];
    }

    return Array.from(
      cdPipelines.reduce((acc, cur) => {
        const curCdPipelineCodebases = cur.spec.applications;

        curCdPipelineCodebases.forEach((codebase) => {
          acc.add(codebase);
        });

        return acc;
      }, new Set())
    ) as string[];
  }, [cdPipelines]);

  const controls: FilterControlsType = React.useMemo(() => {
    return {
      search: {
        component: (
          <div>
            <SearchControl />
            <FormHelperText> </FormHelperText>
          </div>
        ),
      },
      ...((getClusterSettings()?.allowedNamespaces || []).length > 1
        ? {
            namespace: {
              component: (
                <div>
                  <NamespaceControl />
                  <FormHelperText> </FormHelperText>
                </div>
              ),
            },
          }
        : {}),
      codebases: {
        gridXs: 8,
        component: (
          <Autocomplete
            multiple
            options={cdPipelineCodebases}
            freeSolo
            getOptionLabel={(option) => option}
            onChange={handleCodebasesChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Codebases"
                placeholder="Select codebases"
                helperText="Applications, libraries, autotests and infrastructures pipelines."
              />
            )}
            // TODO: fix types
            // @ts-ignore
            value={(filter.values.codebases as string[]) ?? []}
            ChipProps={{
              size: 'small',
              color: 'primary',
            }}
          />
        ),
      },
    };
  }, [cdPipelineCodebases, filter.values.codebases, handleCodebasesChange]);

  return { controls, filterFunction };
};

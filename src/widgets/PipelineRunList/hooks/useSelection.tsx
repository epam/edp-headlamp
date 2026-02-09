import React from 'react';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';

export const useSelection = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      paginatedItems: PipelineRunKubeObjectInterface[]
    ) => {
      if (event.target.checked) {
        const newSelected = paginatedItems.map(({ metadata: { name } }) => name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    []
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: PipelineRunKubeObjectInterface) => {
      const name = row.metadata.name;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  return { selected, setSelected, handleSelectAllClick, handleSelectRowClick };
};

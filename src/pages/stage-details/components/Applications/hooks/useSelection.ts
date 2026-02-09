import React from 'react';
import { EnrichedApplicationWithArgoApplication } from '../../../types';

export const useSelection = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleClickSelectAll = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      paginatedItems: EnrichedApplicationWithArgoApplication[]
    ) => {
      if (event.target.checked) {
        const newSelected = paginatedItems.map(
          ({
            application: {
              metadata: { name },
            },
          }) => name
        );
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [setSelected]
  );

  const handleClickSelectRow = React.useCallback(
    (event: React.MouseEvent<unknown>, row: EnrichedApplicationWithArgoApplication) => {
      const name = row.application.metadata.name;
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
    [selected, setSelected]
  );

  return {
    selected,
    setSelected,
    handleClickSelectAll,
    handleClickSelectRow,
  };
};

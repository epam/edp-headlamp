import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, TextField } from '@mui/material';
import React from 'react';
import { SearchControlProps } from './types';

export const searchFunction = (item: KubeObjectInterface, value: string) => {
  if (!item || !value) {
    return true;
  }

  const usedMatchCriteria = [
    item.metadata.uid.toLowerCase(),
    item.metadata.namespace ? item.metadata.namespace.toLowerCase() : '',
    item.metadata.name.toLowerCase(),
    item?.spec?.displayName?.toLowerCase(),
    ...Object.keys(item.metadata.labels || {}).map((item) => item.toLowerCase()),
    ...Object.values(item.metadata.labels || {}).map((item) => item.toLowerCase()),
  ].filter(Boolean);

  return usedMatchCriteria.some((item) => item.includes(value.toLowerCase()));
};

export const SearchControl = ({ filter, setFilter }: SearchControlProps) => {
  const focusedRef = React.useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  return (
    <Box width="15rem">
      <TextField
        fullWidth
        id="standard-search"
        label={'Search'}
        type="search"
        value={filter.values.search}
        InputLabelProps={{ shrink: true }}
        InputProps={{ role: 'search' }}
        placeholder={'Type to search'}
        onChange={(event) => {
          setFilter((prev) => ({
            ...prev,
            values: {
              ...prev.values,
              search: event.target.value,
            },
            matchFunctions: {
              ...prev.matchFunctions,
              search: (item) => searchFunction(item, event.target.value),
            },
          }));
          setFilter((prev) => ({ ...prev, search: event.target.value }));
        }}
        inputRef={focusedRef}
      />
    </Box>
  );
};

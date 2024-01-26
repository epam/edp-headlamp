import { Icon } from '@iconify/react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { Box, Checkbox, TextField, Typography, useTheme } from '@mui/material';
import { Autocomplete } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { getClusterSettings } from '../../../../../../utils/getClusterSettings';
import { useAddQuery } from '../../hooks/useAddQuery';
import { NamespaceControlProps } from './types';

const clusterSettings = getClusterSettings();
const allowedNamespaces = clusterSettings?.allowedNamespaces || [];

export const NamespaceControlWithAllowedNamespaces = (props: NamespaceControlProps) => {
  const [namespaceNames, setNamespaceNames] = React.useState<string[]>(allowedNamespaces);

  return (
    <_NamespaceControl {...props} namespaces={namespaceNames} setNamespaces={setNamespaceNames} />
  );
};

export const NamespaceControlWithClusterNamespaces = (props: NamespaceControlProps) => {
  const [namespaceNames, setNamespaceNames] = React.useState<string[]>([]);

  K8s.namespace.default.useApiList((namespaces: K8s.namespace.default[]) => {
    setNamespaceNames(namespaces.map((namespace) => namespace.metadata.name));
  });

  return (
    <_NamespaceControl {...props} namespaces={namespaceNames} setNamespaces={setNamespaceNames} />
  );
};

export const _NamespaceControl = ({
  filter,
  setFilter,
  namespaces,
  setNamespaces,
}: NamespaceControlProps) => {
  const addQuery = useAddQuery();
  const location = useLocation();
  const theme = useTheme();

  const [namespaceInput, setNamespaceInput] = React.useState<string>('');
  const maxNamespacesChars = 12;

  const onInputChange = (event: object, value: string, reason: string) => {
    // For some reason, the AutoComplete component resets the text after a short
    // delay, so we need to avoid that or the user won't be able to edit/use what they type.
    if (reason !== 'reset') {
      setNamespaceInput(value);
    }
  };

  const onChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
    // Now we reset the input so it won't show next to the selected namespaces.
    addQuery({ namespace: newValue.join(' ') }, { namespace: '' });
    setNamespaceInput('');
    setFilter((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        namespace: new Set(newValue),
      },
      matchFunctions: {
        ...prev.matchFunctions,
        namespace: (item) => newValue.length === 0 || newValue.includes(item.metadata.namespace),
      },
    }));
  };

  const filterNamespacesValue: Set<string> =
    (filter.values.namespace as Set<string>) || new Set([]);

  const filterNamespacesArray = [...filterNamespacesValue.values()];

  React.useEffect(() => {
    const clusterSettings = getClusterSettings();
    const allowedNamespaces = clusterSettings?.allowedNamespaces || [];
    if (allowedNamespaces.length > 0) {
      setNamespaces(allowedNamespaces);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Autocomplete
      multiple
      id="namespaces-filter"
      autoComplete
      options={namespaces}
      onChange={onChange}
      onInputChange={onInputChange}
      inputValue={namespaceInput}
      // We reverse the namespaces so the last chosen appear as the first in the label. This
      // is useful since the label is ellipsized and this we get to see it change.
      value={filterNamespacesArray.reverse()}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<Icon icon="mdi:checkbox-blank-outline" />}
            checkedIcon={<Icon icon="mdi:check-box-outline" />}
            style={{
              color: selected ? theme.palette.primary.main : theme.palette.text.primary,
            }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderTags={(tags: string[]) => {
        if (tags.length === 0) {
          return <Typography variant="body2">All namespaces</Typography>;
        }

        let namespacesToShow = tags[0];
        const joiner = ', ';
        const joinerLength = joiner.length;
        let joinedNamespaces = 1;

        tags.slice(1).forEach((tag) => {
          if (namespacesToShow.length + tag.length + joinerLength <= maxNamespacesChars) {
            namespacesToShow += joiner + tag;
            joinedNamespaces++;
          }
        });

        return (
          <Typography style={{ overflowWrap: 'anywhere' }}>
            {namespacesToShow.length > maxNamespacesChars
              ? namespacesToShow.slice(0, maxNamespacesChars) + '…'
              : namespacesToShow}
            {tags.length > joinedNamespaces && (
              <>
                <span>,&nbsp;</span>
                <b>{`+${tags.length - joinedNamespaces}`}</b>
              </>
            )}
          </Typography>
        );
      }}
      renderInput={(params) => (
        <Box width="15rem">
          <TextField
            {...params}
            variant="standard"
            label={'Namespaces'}
            fullWidth
            InputLabelProps={{ shrink: true }}
            style={{ marginTop: 0 }}
            placeholder={filterNamespacesArray.length > 0 ? '' : 'Filter'}
          />
        </Box>
      )}
    />
  );
};

export const NamespaceControl =
  allowedNamespaces.length > 0
    ? NamespaceControlWithAllowedNamespaces
    : NamespaceControlWithClusterNamespaces;

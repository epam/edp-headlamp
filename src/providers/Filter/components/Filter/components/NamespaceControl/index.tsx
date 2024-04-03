import { Icon } from '@iconify/react';
import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { Checkbox, Chip, TextField, useTheme } from '@mui/material';
import { Autocomplete } from '@mui/material';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLocation } from 'react-router-dom';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { getClusterSettings } from '../../../../../../utils/getClusterSettings';
import { useFilterContext } from '../../../../hooks';
import { useAddQuery } from '../../hooks/useAddQuery';
import { getFilterValueByNameFromURL } from '../../utilts';
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

export const _NamespaceControl = ({ namespaces, setNamespaces }: NamespaceControlProps) => {
  const { filter, setFilterItem, setShowFilter } = useFilterContext<unknown, 'namespace'>();
  const addQuery = useAddQuery();
  const location = useLocation();
  const theme = useTheme();

  const [namespaceInput, setNamespaceInput] = React.useState<string>('');

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
    setFilterItem('namespace', newValue);
  };
  const filterNamespacesValue: string[] = (filter.values.namespace as string[]) || [];

  const filterNamespacesArray = [...filterNamespacesValue.values()];

  React.useEffect(() => {
    const clusterSettings = getClusterSettings();
    const allowedNamespaces = clusterSettings?.allowedNamespaces || [];
    if (allowedNamespaces.length > 0) {
      setNamespaces(allowedNamespaces);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useHotkeys('ctrl+shift+f', () => {
    if (filter.values.namespace) {
      setShowFilter(true);
    }
  });

  React.useEffect(
    () => {
      const namespace = getFilterValueByNameFromURL('namespace', location);

      const stateNamespaces = (filter.values.namespace as string[]) || [];

      if (namespace.length > 0) {
        const namespaceFromStore = [...stateNamespaces].sort();
        if (
          namespace
            .slice()
            .sort()
            .every((value: string, index: number) => value !== namespaceFromStore[index])
        ) {
          setFilterItem('namespace', namespace);

          if (filter.values.namespace) {
            setShowFilter(true);
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props} style={{ height: '36px' }}>
            <Checkbox
              icon={
                <Icon
                  icon={ICONS.CHECK}
                  width={24}
                  height={24}
                  color={theme.palette.action.active}
                />
              }
              checkedIcon={
                <Icon
                  icon={ICONS.CHECK}
                  width={24}
                  height={24}
                  color={theme.palette.primary.main}
                />
              }
              style={{
                color: selected ? theme.palette.primary.main : theme.palette.text.primary,
              }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={'Namespaces'}
          fullWidth
          style={{ marginTop: 0 }}
          placeholder={filterNamespacesArray.length > 0 ? '' : 'Namespaces'}
        />
      )}
      renderTags={(value, getTagProps) => {
        const numTags = value.length;
        const limitTags = 1;

        return (
          <>
            {value.slice(0, limitTags).map((option, index) => (
              <Chip {...getTagProps({ index })} key={index} label={option} color="primary" />
            ))}

            {numTags > limitTags && ` +${numTags - limitTags}`}
          </>
        );
      }}
      sx={{ '& .MuiChip-root': { height: '24px' } }}
    />
  );
};

export const NamespaceControl =
  allowedNamespaces.length > 0
    ? NamespaceControlWithAllowedNamespaces
    : NamespaceControlWithClusterNamespaces;

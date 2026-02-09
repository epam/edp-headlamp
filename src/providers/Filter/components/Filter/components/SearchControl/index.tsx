import { Icon } from '@iconify/react';
import { InputAdornment, TextField, useTheme } from '@mui/material';
import React from 'react';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useFilterContext } from '../../../../hooks';

export const SearchControl = () => {
  const theme = useTheme();
  const { filter, setFilterItem } = useFilterContext<unknown, 'search'>();
  const [shrink, setShrink] = React.useState(!!filter.values.search || false);

  return (
    <TextField
      sx={{
        '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
          transform: 'translate(30px, 20px)',
        },
      }}
      fullWidth
      id="standard-search"
      label={'Search'}
      type="search"
      value={filter.values.search || ''}
      onFocus={() => setShrink(true)}
      onBlur={(e) => {
        !e.target.value && setShrink(false);
      }}
      InputLabelProps={{
        shrink: shrink,
      }}
      InputProps={{
        role: 'search',
        startAdornment: (
          <InputAdornment position="start">
            <Icon icon={ICONS.SEARCH} width={18} color={theme.palette.action.active} />
          </InputAdornment>
        ),
      }}
      placeholder={'Search'}
      onChange={(event) => {
        setFilterItem('search', event.target.value);
      }}
    />
  );
};

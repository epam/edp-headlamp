import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../../../../components/DocLink';
import { CODEBASE_TYPES } from '../../../../../../../../constants/codebaseTypes';
import { EDP_USER_GUIDE } from '../../../../../../../../constants/urls';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { createCodebaseInstance } from '../../../../../../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { capitalizeFirstLetter } from '../../../../../../../../utils/format/capitalizeFirstLetter';
import { getUsedValues } from '../../../../../../../../utils/forms/getUsedValues';
import { CODEBASE_FORM_NAMES } from '../../../../../../names';
import { CreateCodebaseFormValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
  const { watch, getValues } = useFormContext<CreateCodebaseFormValues>();

  const handleOpenEditor = React.useCallback(() => {
    setEditorOpen(true);
    const formValues = getValues();
    const usedValues = getUsedValues(formValues, CODEBASE_FORM_NAMES);
    const newCodebaseData = createCodebaseInstance(CODEBASE_FORM_NAMES, usedValues);
    setEditorData(newCodebaseData);
  }, [getValues, setEditorData, setEditorOpen]);

  const typeFieldValue = watch(CODEBASE_FORM_NAMES.type.name);
  const capitalizedType = capitalizeFirstLetter(typeFieldValue);
  const docLink = React.useMemo(() => {
    switch (typeFieldValue) {
      case CODEBASE_TYPES.APPLICATION:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
      case CODEBASE_TYPES.AUTOTEST:
        return EDP_USER_GUIDE.AUTOTEST_CREATE.url;
      case CODEBASE_TYPES.LIBRARY:
        return EDP_USER_GUIDE.LIBRARY_CREATE.url;
      case CODEBASE_TYPES.INFRASTRUCTURE:
        return EDP_USER_GUIDE.INFRASTRUCTURE_CREATE.url;
      default:
        return EDP_USER_GUIDE.APPLICATION_CREATE.url;
    }
  }, [typeFieldValue]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
      <Grid item>
        <Grid container spacing={1} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h5'}>{`Create ${capitalizedType}`}</Typography>
          </Grid>
          <Grid item>
            <DocLink href={docLink} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          startIcon={<Icon icon={ICONS.PENCIL} />}
          size="small"
          component={'button'}
          onClick={handleOpenEditor}
          style={{ flexShrink: 0 }}
        >
          Edit YAML
        </Button>
      </Grid>
    </Grid>
  );
};

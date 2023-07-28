import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../../../../components/DocLink';
import { CODEBASE_TYPES } from '../../../../../../../../constants/codebaseTypes';
import {
    URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD,
    URL_EDP_HEADLAMP_USER_GUIDE_AUTOTEST_ADD,
    URL_EDP_HEADLAMP_USER_GUIDE_LIBRARY_ADD,
} from '../../../../../../../../constants/urls';
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
                return URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD;
            case CODEBASE_TYPES.AUTOTEST:
                return URL_EDP_HEADLAMP_USER_GUIDE_AUTOTEST_ADD;
            case CODEBASE_TYPES.LIBRARY:
                return URL_EDP_HEADLAMP_USER_GUIDE_LIBRARY_ADD;
            default:
                return URL_EDP_HEADLAMP_USER_GUIDE_APPLICATION_ADD;
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

import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../k8s/common/editResource';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentValues } from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ EDPComponent, setEditorData, setEditorOpen }: DialogHeaderProps) => {
    const { getValues } = useFormContext<ManageEDPComponentValues>();

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, EDP_COMPONENT_FORM_NAMES);
        const editedEDPComponent = editResource(EDP_COMPONENT_FORM_NAMES, EDPComponent, usedValues);
        setEditorData(editedEDPComponent);
    }, [EDPComponent, getValues, setEditorData, setEditorOpen]);

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'h5'}>Edit</Typography>
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

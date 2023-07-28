import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/createCDPipelineInstance';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
    const { getValues } = useFormContext<CreateEditCDPipelineFormValues>();

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, CDPIPELINE_FORM_NAMES);
        const newCDPipelineData = createCDPipelineInstance(CDPIPELINE_FORM_NAMES, usedValues);
        setEditorData(newCDPipelineData);
    }, [getValues, setEditorData, setEditorOpen]);

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'h5'}>Create CD Pipeline</Typography>
                    </Grid>
                    <Grid item>
                        <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_CD_PIPELINES} />
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

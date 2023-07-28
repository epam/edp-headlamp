import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_STAGE_ADD } from '../../../../../../constants/urls';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { createCDPipelineStageInstance } from '../../../../../../k8s/EDPCDPipelineStage/utils/createCDPipelineStageInstance';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
    const { dialogProviderState } = useDialogContext<CreateEditStageDialogForwardedProps>();
    const CDPipelineData =
        dialogProviderState?.[CREATE_EDIT_STAGE_DIALOG_NAME].forwardedProps?.CDPipelineData;
    const { getValues } = useFormContext<CreateEditStageFormValues>();

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, STAGE_FORM_NAMES);
        const newCDPipelineData = createCDPipelineStageInstance(
            STAGE_FORM_NAMES,
            usedValues,
            CDPipelineData
        );
        setEditorData(newCDPipelineData);
    }, [CDPipelineData, getValues, setEditorData, setEditorOpen]);

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography
                            variant={'h5'}
                        >{`Create stage for "${CDPipelineData?.metadata.name}"`}</Typography>
                    </Grid>
                    <Grid item>
                        <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_STAGE_ADD} />
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

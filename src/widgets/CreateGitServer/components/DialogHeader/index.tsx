import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DocLink } from '../../../../components/DocLink';
import { URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { createGitServerInstance } from '../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { CreateGitServerFormValues } from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
    const { getValues } = useFormContext<CreateGitServerFormValues>();

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const usedValues = getUsedValues(formValues, GIT_SERVER_FORM_NAMES);
        const gitServerData = createGitServerInstance(GIT_SERVER_FORM_NAMES, usedValues);
        setEditorData(gitServerData);
    }, [getValues, setEditorData, setEditorOpen]);

    return (
        <>
            <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                <Grid item>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item>
                            <Typography variant={'h5'}>Create Git Server</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={URL_EDP_HEADLAMP_USER_GUIDE_GIT_SERVER_ADD} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        startIcon={<Icon icon={ICONS['PENCIL']} />}
                        size="small"
                        component={'button'}
                        onClick={handleOpenEditor}
                        style={{ flexShrink: 0 }}
                    >
                        Edit YAML
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

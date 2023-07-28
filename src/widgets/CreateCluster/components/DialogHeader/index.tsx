import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { createClusterSecretInstance } from '../../../../k8s/Secret/utils/createClusterSecretInstance';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CLUSTER_CREATION_FORM_NAMES } from '../../names';
import { CreateClusterFormValues } from '../../types';
import { DialogHeaderProps } from './types';

export const DialogHeader = ({ setEditorOpen, setEditorData }: DialogHeaderProps) => {
    const { getValues } = useFormContext<CreateClusterFormValues>();

    const handleOpenEditor = React.useCallback(() => {
        setEditorOpen(true);
        const formValues = getValues();
        const { clusterName, clusterHost, clusterToken, clusterCertificate } = getUsedValues(
            formValues,
            CLUSTER_CREATION_FORM_NAMES
        );
        const newClusterSecretData = createClusterSecretInstance({
            clusterName,
            clusterHost,
            clusterToken,
            clusterCertificate,
        });
        setEditorData(newClusterSecretData);
    }, [getValues, setEditorData, setEditorOpen]);

    return (
        <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={1}>
            <Grid item>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'h5'}>Create New Branch</Typography>
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

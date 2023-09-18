import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../../../components/Render';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { ServiceAccountKubeObject } from '../../../../../../k8s/ServiceAccount';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { ManageECRServiceAccount } from '../../../../../../widgets/ManageECRServiceAccount';

export const ECRList = () => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const dockerRegistryURL = EDPComponentsURLS?.['container-registry'];

    const [items] = ServiceAccountKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const tektonSecret = items?.find(el => el?.metadata?.name === 'tekton')?.jsonData;
    const itemsArray = [tektonSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            itemsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata?.name,
                    ownerReference,
                    component: (
                        <ManageECRServiceAccount
                            formData={{
                                currentElement: el,
                                registryEndpoint: dockerRegistryURL,
                            }}
                        />
                    ),
                };
            }),
        [itemsArray, dockerRegistryURL]
    );

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const isLoading = items === null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {isLoading ? (
                        <Grid item xs={12}>
                            <Grid container justifyContent={'center'}>
                                <Grid item>
                                    <CircularProgress />
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : itemsArray.length ? (
                        configurationItemList.map(configurationItem => {
                            const key = configurationItem?.id;
                            const ownerReference = configurationItem?.ownerReference;

                            return (
                                <Grid item xs={12} key={key}>
                                    <Accordion
                                        expanded={expandedPanel === key}
                                        onChange={handleChange(key)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                        >
                                            <Grid container spacing={3} alignItems={'center'}>
                                                <Grid item>
                                                    <Typography variant={'h6'}>
                                                        {configurationItem.title}
                                                    </Typography>
                                                </Grid>
                                                <Render condition={!!ownerReference}>
                                                    <Grid item>
                                                        <Tooltip
                                                            title={`Managed by ${ownerReference}`}
                                                        >
                                                            <Icon
                                                                icon={ICONS.CLOUD_LOCK}
                                                                width={20}
                                                                style={{
                                                                    display: 'block',
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </Grid>
                                                </Render>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    {configurationItem.component}
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            );
                        })
                    ) : (
                        <Grid item xs={12}>
                            <EmptyContent color={'textSecondary'}>
                                No ECR Service Accounts found
                            </EmptyContent>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

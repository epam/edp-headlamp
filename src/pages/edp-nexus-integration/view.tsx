import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { rem } from '../../utils/styling/rem';
import { ManageNexusIntegrationSecret } from '../../widgets/ManageNexusIntegrationSecret';
import { routeEDPConfiguration } from '../edp-configuration-list/route';

const findNexusIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'nexus-ci.user');

export const PageView = () => {
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [nexusSecret, setNexusSecret] = React.useState<SecretKubeObjectInterface>(null);
    const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamNexusIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const nexusSecret = findNexusIntegrationSecret(data);

                setNexusSecret(nexusSecret);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, []);

    const creationButtonDisabled = React.useMemo(
        () => !!nexusSecret || showPlaceholder,
        [showPlaceholder, nexusSecret]
    );

    const handleCreateClick = () => {
        setShowPlaceholder(true);
        setExpandedPanel('placeholder');
    };

    const handleDeleteRow = (isPlaceholder: boolean) => {
        if (isPlaceholder) {
            setShowPlaceholder(false);
        }
    };

    const nexusSecretName = nexusSecret?.metadata.name;
    const nexusSecretOwnerReference = nexusSecret?.metadata?.ownerReferences?.[0].kind;

    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Configuration',
                    url: {
                        pathname: routeEDPConfiguration.path,
                    },
                },
                {
                    label: 'Nexus Integration',
                },
            ]}
        >
            <Box style={{ paddingTop: rem(40) }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            alignItems={'center'}
                            spacing={2}
                            justifyContent={'space-between'}
                        >
                            <Grid item>
                                <Typography variant={'h5'}>Nexus Integration</Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title={'Create registry item'}>
                                    <Button
                                        startIcon={<Icon icon={ICONS.DOCUMENT_ADD} />}
                                        onClick={handleCreateClick}
                                        disabled={creationButtonDisabled}
                                    >
                                        <Typography>Create</Typography>
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {nexusSecret ? (
                                <Grid item xs={12} key={nexusSecretName}>
                                    <Accordion
                                        expanded={expandedPanel === nexusSecretName}
                                        onChange={handleChange(nexusSecretName)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                        >
                                            <Grid container spacing={3} alignItems={'center'}>
                                                <Grid item>
                                                    <Typography variant={'h6'}>
                                                        {nexusSecret?.metadata.name}
                                                    </Typography>
                                                </Grid>
                                                <Render condition={!!nexusSecretOwnerReference}>
                                                    <Grid item>
                                                        <Tooltip
                                                            title={`Managed by ${nexusSecretOwnerReference}`}
                                                        >
                                                            <Icon
                                                                icon={ICONS.CLOUD_LOCK}
                                                                width={20}
                                                                style={{ display: 'block' }}
                                                            />
                                                        </Tooltip>
                                                    </Grid>
                                                </Render>
                                            </Grid>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <ManageNexusIntegrationSecret
                                                        formData={{
                                                            isReadOnly: !!nexusSecretOwnerReference,
                                                            currentElement: nexusSecret,
                                                            handleDeleteRow,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ) : (
                                <Grid item xs={12}>
                                    <EmptyContent color={'textSecondary'}>
                                        No integration found
                                    </EmptyContent>
                                </Grid>
                            )}
                            {showPlaceholder ? (
                                <Grid item xs={12}>
                                    <Accordion
                                        expanded={expandedPanel === 'placeholder'}
                                        onChange={handleChange('placeholder')}
                                    >
                                        <AccordionSummary
                                            expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                        >
                                            <Typography variant={'h6'}>
                                                Create Service Account
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <ManageNexusIntegrationSecret
                                                        formData={{
                                                            currentElement: 'placeholder',
                                                            handleDeleteRow,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </PageWrapper>
    );
};

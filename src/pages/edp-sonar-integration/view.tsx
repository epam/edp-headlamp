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
import { ManageSonarIntegrationSecret } from '../../widgets/ManageSonarIntegrationSecret';
import { routeEDPConfiguration } from '../edp-configuration-list/route';

const findSonarIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'sonar-ciuser-token');

export const PageView = () => {
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [sonarSecret, setSonarSecret] = React.useState<SecretKubeObjectInterface>(null);
    const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSonarIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const sonarSecret = findSonarIntegrationSecret(data);

                setSonarSecret(sonarSecret);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, []);

    const creationButtonDisabled = React.useMemo(
        () => !!sonarSecret || showPlaceholder,
        [showPlaceholder, sonarSecret]
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

    const sonarSecretName = sonarSecret?.metadata.name;
    const sonarSecretOwnerReference = sonarSecret?.metadata?.ownerReferences?.[0].kind;

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
                    label: 'Sonar Integration',
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
                                <Typography variant={'h5'}>Sonar Integration</Typography>
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
                            {sonarSecret ? (
                                <Grid item xs={12} key={sonarSecretName}>
                                    <Accordion
                                        expanded={expandedPanel === sonarSecretName}
                                        onChange={handleChange(sonarSecretName)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                        >
                                            <Grid container spacing={3} alignItems={'center'}>
                                                <Grid item>
                                                    <Typography variant={'h6'}>
                                                        {sonarSecret?.metadata.name}
                                                    </Typography>
                                                </Grid>
                                                <Render condition={!!sonarSecretOwnerReference}>
                                                    <Grid item>
                                                        <Tooltip
                                                            title={`Managed by ${sonarSecretOwnerReference}`}
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
                                                    <ManageSonarIntegrationSecret
                                                        formData={{
                                                            isReadOnly: !!sonarSecretOwnerReference,
                                                            currentElement: sonarSecret,
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
                                                    <ManageSonarIntegrationSecret
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

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
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { SecretKubeObject } from '../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { rem } from '../../utils/styling/rem';
import { ManageRegistrySecret } from '../../widgets/ManageRegistrySecret';
import { routeEDPConfiguration } from '../edp-configuration-list/route';

const findKanikoRegistrySecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'kaniko-docker-config');

const findRegcredRegistrySecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'regcred');

const generateItemName = (el: SecretKubeObjectInterface) =>
    el?.metadata?.name === 'kaniko-docker-config'
        ? 'Read / Write'
        : el?.metadata?.name === 'regcred'
        ? 'Read Only'
        : el?.metadata?.name;

const findKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) =>
    secrets.filter(
        el => el.metadata.name === 'kaniko-docker-config' || el.metadata.name === 'regcred'
    );

const sortKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) =>
    secrets.sort(a => (a.metadata.name === 'kaniko-docker-config' ? -1 : 1));

export const PageView = () => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const dockerRegistryURL = EDPComponentsURLS?.['docker-registry'];
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [secrets, setSecrets] = React.useState<SecretKubeObjectInterface[]>([]);
    const [showPlaceholder, setShowPlaceholder] = React.useState<boolean>(false);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamRegistrySecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const kanikoAndRegcredSecrets = findKanikoAndRegcredSecrets(data);
                const sortedKanikoAndRegcredSecrets =
                    sortKanikoAndRegcredSecrets(kanikoAndRegcredSecrets);

                setSecrets(sortedKanikoAndRegcredSecrets);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, []);

    const kanikoDockerConfigSecret = findKanikoRegistrySecret(secrets);
    const regcredSecret = findRegcredRegistrySecret(secrets);

    const creationButtonDisabled = React.useMemo(
        () => (!!kanikoDockerConfigSecret && !!regcredSecret) || showPlaceholder,
        [kanikoDockerConfigSecret, regcredSecret, showPlaceholder]
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
                    label: 'Container Registry',
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
                                <Typography variant={'h5'}>Container Registry</Typography>
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
                            {secrets && secrets.length ? (
                                secrets.map(el => {
                                    const key = el?.metadata?.name || el?.metadata?.uid;
                                    const name = generateItemName(el);
                                    const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                                    return (
                                        <Grid item xs={12} key={key}>
                                            <Accordion
                                                expanded={expandedPanel === key}
                                                onChange={handleChange(key)}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                                >
                                                    <Grid
                                                        container
                                                        spacing={3}
                                                        alignItems={'center'}
                                                    >
                                                        <Grid item>
                                                            <Typography variant={'h6'}>
                                                                {name}
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
                                                            <Render condition={!!dockerRegistryURL}>
                                                                <ManageRegistrySecret
                                                                    formData={{
                                                                        isReadOnly:
                                                                            !!ownerReference,
                                                                        currentElement: el,
                                                                        secrets: [
                                                                            kanikoDockerConfigSecret,
                                                                            regcredSecret,
                                                                        ],
                                                                        registryEndpoint:
                                                                            dockerRegistryURL,
                                                                        handleDeleteRow,
                                                                    }}
                                                                />
                                                            </Render>
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
                                        No registry items
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
                                                    <Render condition={!!dockerRegistryURL}>
                                                        <ManageRegistrySecret
                                                            formData={{
                                                                currentElement: 'placeholder',
                                                                secrets: [
                                                                    kanikoDockerConfigSecret,
                                                                    regcredSecret,
                                                                ],
                                                                registryEndpoint: dockerRegistryURL,
                                                                handleDeleteRow,
                                                            }}
                                                        />
                                                    </Render>
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

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
import { routeEDPConfiguration } from '../edp-configuration/route';

const findKanikoRegistrySecret = (items: Array<SecretKubeObjectInterface | 'placeholder'>) =>
    items.find(el => typeof el !== 'string' && el.metadata.name === 'kaniko-docker-config');

const findRegcredRegistrySecret = (items: Array<SecretKubeObjectInterface | 'placeholder'>) =>
    items.find(el => typeof el !== 'string' && el.metadata.name === 'regcred');

const generateItemName = (isPlaceholder: boolean, el: SecretKubeObjectInterface | 'placeholder') =>
    el === 'placeholder'
        ? 'Create Service Account'
        : el?.metadata?.name === 'kaniko-docker-config'
        ? 'Read/write'
        : el?.metadata?.name === 'regcred'
        ? 'Read-only'
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

    const [items, setItems] = React.useState<Array<SecretKubeObjectInterface | 'placeholder'>>([]);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamRegistrySecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const kanikoAndRegcredSecrets = findKanikoAndRegcredSecrets(data);
                const sortedKanikoAndRegcredSecrets =
                    sortKanikoAndRegcredSecrets(kanikoAndRegcredSecrets);

                setItems(sortedKanikoAndRegcredSecrets);
            },
            errorHandler: error => console.error(error),
        });

        return () => {
            cancelStream();
        };
    }, []);

    const kanikoDockerConfigSecret = findKanikoRegistrySecret(items);
    const regcredSecret = findRegcredRegistrySecret(items);

    const creationButtonDisabled = React.useMemo(
        () => (!!kanikoDockerConfigSecret && !!regcredSecret) || items.includes('placeholder'),
        [items, kanikoDockerConfigSecret, regcredSecret]
    );

    const handleCreateClick = () => {
        setItems(prev => [...prev, 'placeholder']);
        handleChange('placeholder')(null, true);
    };

    const handleDeleteRow = (isPlaceholder: boolean) => {
        if (isPlaceholder) {
            setItems(prev => prev.filter(el => el !== 'placeholder'));
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
                            {items && items.length ? (
                                items.map(el => {
                                    const isPlaceholder = el === 'placeholder';
                                    const key = isPlaceholder
                                        ? 'placeholder'
                                        : el?.metadata?.name || el?.metadata?.uid;
                                    const name = generateItemName(isPlaceholder, el);

                                    return (
                                        <Grid item xs={12} key={key}>
                                            <Accordion
                                                expanded={expandedPanel === key}
                                                onChange={handleChange(key)}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                                >
                                                    <Typography variant={'h6'}>{name}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <Render condition={!!dockerRegistryURL}>
                                                                <ManageRegistrySecret
                                                                    formData={{
                                                                        currentElement: el,
                                                                        secrets: [
                                                                            kanikoDockerConfigSecret as SecretKubeObjectInterface,
                                                                            regcredSecret as SecretKubeObjectInterface,
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
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </PageWrapper>
    );
};

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
import { CreateItemAccordion } from '../../../../../../components/CreateItemAccordion';
import { Render } from '../../../../../../components/Render';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { ManageRegistrySecret } from '../../../../../../widgets/ManageRegistrySecret';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
    regcred: SecretKubeObjectInterface;
}

const generateItemName = (el: SecretKubeObjectInterface) =>
    el?.metadata?.name === 'kaniko-docker-config'
        ? 'kaniko-docker-config (Read / Write)'
        : el?.metadata?.name === 'regcred'
        ? 'regcred (Read Only)'
        : el?.metadata?.name;

const findKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) => {
    return secrets.reduce(
        (acc, el) => {
            if (el?.metadata?.name === 'kaniko-docker-config') {
                acc.kanikoDockerConfig = el;
            } else if (el?.metadata?.name === 'regcred') {
                acc.regcred = el;
            }
            return acc;
        },
        {
            kanikoDockerConfig: undefined,
            regcred: undefined,
        } as Secrets
    );
};

export const HarborList = () => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const dockerRegistryURL = EDPComponentsURLS?.['container-registry'];

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'registry',
            dataHandler: data => {
                const { kanikoDockerConfig, regcred } = findKanikoAndRegcredSecrets(data);

                setSecrets({
                    kanikoDockerConfig,
                    regcred,
                });
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const kanikoDockerConfigSecret = secrets.kanikoDockerConfig;
    const regcredSecret = secrets.regcred;
    const secretsArray = [kanikoDockerConfigSecret, regcredSecret].filter(Boolean);
    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: generateItemName(el),
                    ownerReference,
                    component: (
                        <ManageRegistrySecret
                            formData={{
                                isReadOnly: !!ownerReference,
                                currentElement: el,
                                secrets: [kanikoDockerConfigSecret, regcredSecret],
                                registryEndpoint: dockerRegistryURL,
                            }}
                        />
                    ),
                };
            }),
        [secretsArray, dockerRegistryURL, kanikoDockerConfigSecret, regcredSecret]
    );

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleClosePlaceholder = () => {
        setExpandedPanel(null);
    };

    const creationDisabled = React.useMemo(() => {
        if (kanikoDockerConfigSecret === null && regcredSecret === null) {
            return true;
        }

        return !!kanikoDockerConfigSecret && !!regcredSecret;
    }, [kanikoDockerConfigSecret, regcredSecret]);

    const items =
        kanikoDockerConfigSecret === null || regcredSecret === null ? null : configurationItemList;

    const isLoading = items === null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CreateItemAccordion
                    isExpanded={expandedPanel === 'placeholder'}
                    onChange={handleChange('placeholder')}
                    disabled={creationDisabled}
                    title={'Create service account'}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ManageRegistrySecret
                                formData={{
                                    currentElement: 'placeholder',
                                    secrets: [kanikoDockerConfigSecret, regcredSecret],
                                    registryEndpoint: dockerRegistryURL,
                                    handleClosePlaceholder,
                                }}
                            />
                        </Grid>
                    </Grid>
                </CreateItemAccordion>
            </Grid>
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
                    ) : items && items.length ? (
                        items.map(configurationItem => {
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
                                No Registry secrets found
                            </EmptyContent>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

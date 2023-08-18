import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Link,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Render } from '../../../../components/Render';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageRegistrySecret } from '../../../../widgets/ManageRegistrySecret';
import { menu } from '../../menu';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
    regcred: SecretKubeObjectInterface;
}

const generateItemName = (el: SecretKubeObjectInterface) =>
    el?.metadata?.name === 'kaniko-docker-config'
        ? 'Read / Write'
        : el?.metadata?.name === 'regcred'
        ? 'Read Only'
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
            kanikoDockerConfig: null,
            regcred: null,
        } as Secrets
    );
};

export const PageView = () => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const dockerRegistryURL = EDPComponentsURLS?.['docker-registry'];
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamRegistrySecrets({
            namespace: getDefaultNamespace(),

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

    const creationDisabled = React.useMemo(() => {
        if (kanikoDockerConfigSecret === null && regcredSecret === null) {
            return true;
        }

        return !!kanikoDockerConfigSecret && !!regcredSecret;
    }, [kanikoDockerConfigSecret, regcredSecret]);

    const handleClosePlaceholder = () => {
        setExpandedPanel(null);
    };

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {REGISTRY_LIST_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_USER_GUIDE.OVERVIEW.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CreateItemAccordion
                            isExpanded={expandedPanel === 'placeholder'}
                            onChange={handleChange('placeholder')}
                            disabled={creationDisabled}
                            title={'Create service account'}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Render condition={!!dockerRegistryURL}>
                                        <ManageRegistrySecret
                                            formData={{
                                                currentElement: 'placeholder',
                                                secrets: [kanikoDockerConfigSecret, regcredSecret],
                                                registryEndpoint: dockerRegistryURL,
                                                handleClosePlaceholder,
                                            }}
                                        />
                                    </Render>
                                </Grid>
                            </Grid>
                        </CreateItemAccordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {secretsArray && secretsArray.length ? (
                                secretsArray.map(el => {
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
            </PageWrapper>
        </PageWithSubMenu>
    );
};

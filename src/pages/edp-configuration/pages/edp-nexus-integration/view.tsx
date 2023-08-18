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
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageNexusIntegrationSecret } from '../../../../widgets/ManageNexusIntegrationSecret';
import { menu } from '../../menu';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findNexusIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'nexus-ci.user');

export const PageView = () => {
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [nexusSecret, setNexusSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamNexusIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const nexusSecret = findNexusIntegrationSecret(data);
                setNexusSecret(nexusSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const handleClosePlaceholder = () => {
        setExpandedPanel(null);
    };

    const nexusSecretName = nexusSecret?.metadata.name;
    const nexusSecretOwnerReference = nexusSecret?.metadata?.ownerReferences?.[0].kind;

    const creationDisabled = React.useMemo(
        () => (nexusSecret === null ? true : !!nexusSecret),
        [nexusSecret]
    );

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {NEXUS_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {NEXUS_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
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
                                    <ManageNexusIntegrationSecret
                                        formData={{
                                            currentElement: 'placeholder',
                                            handleClosePlaceholder,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CreateItemAccordion>
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
                        </Grid>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

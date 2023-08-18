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
import { ManageDefectDojoIntegrationSecret } from '../../../../widgets/ManageDefectDojoIntegrationSecret';
import { menu } from '../../menu';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDefectDojoIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === 'defectdojo-ciuser-token');

export const PageView = () => {
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [defectDojoSecret, setDefectDojoSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamDefectDojoIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const defectDojoSecret = findDefectDojoIntegrationSecret(data);
                setDefectDojoSecret(defectDojoSecret);
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

    const defectDojoSecretName = defectDojoSecret?.metadata.name;
    const defectDojoSecretOwnerReference = defectDojoSecret?.metadata?.ownerReferences?.[0].kind;

    const creationDisabled = React.useMemo(
        () => (defectDojoSecret === null ? true : !!defectDojoSecret),
        [defectDojoSecret]
    );

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
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
                                    <ManageDefectDojoIntegrationSecret
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
                            {defectDojoSecret ? (
                                <Grid item xs={12} key={defectDojoSecretName}>
                                    <Accordion
                                        expanded={expandedPanel === defectDojoSecretName}
                                        onChange={handleChange(defectDojoSecretName)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                        >
                                            <Grid container spacing={3} alignItems={'center'}>
                                                <Grid item>
                                                    <Typography variant={'h6'}>
                                                        {defectDojoSecretName}
                                                    </Typography>
                                                </Grid>
                                                <Render
                                                    condition={!!defectDojoSecretOwnerReference}
                                                >
                                                    <Grid item>
                                                        <Tooltip
                                                            title={`Managed by ${defectDojoSecretOwnerReference}`}
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
                                                    <ManageDefectDojoIntegrationSecret
                                                        formData={{
                                                            isReadOnly:
                                                                !!defectDojoSecretOwnerReference,
                                                            currentElement: defectDojoSecret,
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

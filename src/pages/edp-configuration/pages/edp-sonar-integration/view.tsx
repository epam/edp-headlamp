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
import { URL_EDP_HEADLAMP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSonarIntegrationSecret } from '../../../../widgets/ManageSonarIntegrationSecret';
import { menu } from '../../menu';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findSonarIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === 'sonar-ciuser-token');

export const PageView = () => {
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const [sonarSecret, setSonarSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSonarIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const sonarSecret = findSonarIntegrationSecret(data);
                setSonarSecret(sonarSecret);
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

    const sonarSecretName = sonarSecret?.metadata.name;
    const sonarSecretOwnerReference = sonarSecret?.metadata?.ownerReferences?.[0].kind;

    const creationDisabled = React.useMemo(
        () => (sonarSecret === null ? true : !!sonarSecret),
        [sonarSecret]
    );

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'md'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {SONAR_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {SONAR_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={URL_EDP_HEADLAMP_USER_GUIDE} target={'_blank'}>
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
                                    <ManageSonarIntegrationSecret
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

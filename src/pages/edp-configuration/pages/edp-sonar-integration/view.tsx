import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSonarCI } from '../../../../widgets/ManageSonarCI';
import { menu } from '../../menu';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findSonarIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.SONAR);

export const PageView = () => {
    const [sonarSecret, setSonarSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'sonar',
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

    const mode = !!sonarSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = sonarSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = sonarSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {SONAR_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {SONAR_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.SONAR.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageSonarCI
                                formData={{
                                    sonarSecret,
                                    ownerReference,
                                    isReadOnly: !!ownerReference,
                                    mode,
                                }}
                            />
                        </LoadingWrapper>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

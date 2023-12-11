import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSSOCI } from '../../../../widgets/ManageSSOCI';
import { menu } from '../../menu';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findSSOIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.SSO);

export const PageView = () => {
    const [ssoSecret, setSSOSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'keycloak',
            dataHandler: data => {
                const ssoSecret = findSSOIntegrationSecret(data);
                setSSOSecret(ssoSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const mode = !!ssoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = ssoSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = ssoSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {SSO_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {SSO_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageSSOCI
                                formData={{
                                    ssoSecret,
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

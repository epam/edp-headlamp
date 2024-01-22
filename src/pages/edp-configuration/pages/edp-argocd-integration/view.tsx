import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { EDPComponentKubeObject } from '../../../../k8s/EDPComponent';
import { SYSTEM_EDP_COMPONENTS } from '../../../../k8s/EDPComponent/constants';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageArgoCDCI } from '../../../../widgets/ManageArgoCDCI';
import { menu } from '../../menu';
import { ARGOCD_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [argoCDSecrets] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_EDP_COMPONENTS.ARGOCD}`,
    });

    const [argoCDEDPComponent] = EDPComponentKubeObject.useGet(
        SYSTEM_EDP_COMPONENTS.ARGOCD,
        getDefaultNamespace()
    );

    const argoCDSecret = argoCDSecrets?.[0]?.jsonData;

    const mode = !!argoCDSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = argoCDSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = argoCDSecrets === null || argoCDEDPComponent === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {ARGOCD_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {ARGOCD_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.ARGO_CD.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageArgoCDCI
                                formData={{
                                    argoCDSecret,
                                    argoCDEDPComponent: argoCDEDPComponent?.jsonData,
                                    ownerReference,
                                    mode,
                                }}
                            />
                        </LoadingWrapper>
                    </Grid>
                    {!argoCDSecret && !isLoading && (
                        <Grid item xs={12}>
                            <EmptyContent color={'textSecondary'}>
                                No Argo CD integration secrets found
                            </EmptyContent>
                        </Grid>
                    )}
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageNexusCI } from '../../../../widgets/ManageNexusCI';
import { menu } from '../../menu';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [nexusSecrets] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${SECRET_LABEL_SECRET_TYPE}=nexus`,
    });

    const nexusSecret = nexusSecrets?.[0]?.jsonData;

    const mode = !!nexusSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = nexusSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = nexusSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {NEXUS_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {NEXUS_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.NEXUS.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageNexusCI
                                formData={{
                                    nexusSecret,
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

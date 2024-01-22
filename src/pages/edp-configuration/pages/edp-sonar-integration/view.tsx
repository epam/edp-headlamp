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
import { ManageSonarCI } from '../../../../widgets/ManageSonarCI';
import { menu } from '../../menu';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [sonarSecrets] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_EDP_COMPONENTS.SONAR}`,
    });

    const [sonarEDPComponent] = EDPComponentKubeObject.useGet(
        SYSTEM_EDP_COMPONENTS.SONAR,
        getDefaultNamespace()
    );

    const sonarSecret = sonarSecrets?.[0]?.jsonData;

    const mode = !!sonarSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = sonarSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = sonarSecrets === null || sonarEDPComponent === null;

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
                                    sonarEDPComponent: sonarEDPComponent?.jsonData,
                                    ownerReference,
                                    mode,
                                }}
                            />
                        </LoadingWrapper>
                    </Grid>
                    {!sonarSecret && !isLoading && (
                        <Grid item xs={12}>
                            <EmptyContent color={'textSecondary'}>
                                No SonarQube integration secrets found
                            </EmptyContent>
                        </Grid>
                    )}
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

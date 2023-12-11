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
import { ManageDependencyTrackCI } from '../../../../widgets/ManageDependencyTrackCI';
import { menu } from '../../menu';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDependencyTrackIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.DEPENDENCY_TRACK);

export const PageView = () => {
    const [dependencyTrackSecret, setDependencyTrackSecret] =
        React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'dependency-track',
            dataHandler: data => {
                const dependencyTrackSecret = findDependencyTrackIntegrationSecret(data);
                setDependencyTrackSecret(dependencyTrackSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const mode = !!dependencyTrackSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = dependencyTrackSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = dependencyTrackSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.DEPENDENCY_TRACK.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageDependencyTrackCI
                                formData={{
                                    dependencyTrackSecret,
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

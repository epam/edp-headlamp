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
import { ManageNexusCI } from '../../../../widgets/ManageNexusCI';
import { menu } from '../../menu';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findNexusIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.NEXUS);

export const PageView = () => {
    const [nexusSecret, setNexusSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'nexus',
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

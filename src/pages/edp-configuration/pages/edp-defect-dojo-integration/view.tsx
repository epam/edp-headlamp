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
import { ManageDefectDojoCI } from '../../../../widgets/ManageDefectDojoCI';
import { menu } from '../../menu';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDefectDojoIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.DEFECT_DOJO);

export const PageView = () => {
    const [defectDojoSecret, setDefectDojoSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'defectdojo',

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

    const mode = !!defectDojoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = defectDojoSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = defectDojoSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.DEFECT_DOJO.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageDefectDojoCI
                                formData={{
                                    defectDojoSecret,
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

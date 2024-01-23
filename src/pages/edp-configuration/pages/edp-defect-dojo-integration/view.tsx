import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Link, Typography } from '@mui/material';
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
import { ManageDefectDojoCI } from '../../../../widgets/ManageDefectDojoCI';
import { menu } from '../../menu';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
  const [defectDojoSecrets] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_EDP_COMPONENTS.DEFECT_DOJO}`,
  });

  const [defectDojoEDPComponent] = EDPComponentKubeObject.useGet(
    SYSTEM_EDP_COMPONENTS.DEFECT_DOJO,
    getDefaultNamespace()
  );

  const defectDojoSecret = defectDojoSecrets?.[0]?.jsonData;

  const mode = !!defectDojoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = defectDojoSecret?.metadata?.ownerReferences?.[0]?.kind;
  const isLoading = defectDojoSecrets === null || defectDojoEDPComponent === null;

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
                  defectDojoEDPComponent: defectDojoEDPComponent?.jsonData,
                  ownerReference,
                  mode,
                }}
              />
            </LoadingWrapper>
          </Grid>
          {!defectDojoSecret && !isLoading && (
            <Grid item xs={12}>
              <EmptyContent color={'textSecondary'}>
                No DefectDojo integration secrets found
              </EmptyContent>
            </Grid>
          )}
        </Grid>
      </PageWrapper>
    </PageWithSubMenu>
  );
};

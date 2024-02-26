import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { LearnMoreLink } from '../../../../components/LearnMoreLink';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../k8s/QuickLink/constants';
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
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=${SYSTEM_QUICK_LINKS.DEFECT_DOJO}`,
  });

  const [defectDojoQuickLink, error] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.DEFECT_DOJO,
    getDefaultNamespace()
  );

  const defectDojoSecret = defectDojoSecrets?.[0]?.jsonData;

  const mode = !!defectDojoSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
  const ownerReference = defectDojoSecret?.metadata?.ownerReferences?.[0]?.kind;
  const isLoading = defectDojoSecrets === null || (!defectDojoQuickLink && !error);

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
              <LearnMoreLink url={EDP_OPERATOR_GUIDE.DEFECT_DOJO.url} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LoadingWrapper isLoading={isLoading}>
              <ManageDefectDojoCI
                formData={{
                  defectDojoSecret,
                  defectDojoQuickLink: defectDojoQuickLink?.jsonData,
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

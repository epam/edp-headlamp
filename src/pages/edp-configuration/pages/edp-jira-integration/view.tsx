import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { useJiraServerListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerListQuery';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageJiraCI } from '../../../../widgets/ManageJiraCI';
import { menu } from '../../menu';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const { data: jiraServer } = useJiraServerListQuery({
        props: {
            namespace: getDefaultNamespace(),
        },
        options: {
            select: data => data.items?.[0],
        },
    });

    const [jiraServerSecrets] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${SECRET_LABEL_SECRET_TYPE}=jira`,
    });

    const jiraServerSecret = jiraServerSecrets?.[0]?.jsonData;

    const mode = !!jiraServer && !!jiraServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;
    const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0]?.kind;
    const isLoading = !jiraServer && jiraServerSecret === null;

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} gutterBottom>
                            {JIRA_INTEGRATION_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {JIRA_INTEGRATION_PAGE_DESCRIPTION.description}{' '}
                            <Link href={EDP_OPERATOR_GUIDE.JIRA.url} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingWrapper isLoading={isLoading}>
                            <ManageJiraCI
                                formData={{
                                    jiraServer,
                                    jiraServerSecret,
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

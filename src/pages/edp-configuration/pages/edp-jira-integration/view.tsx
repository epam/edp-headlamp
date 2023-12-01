import { Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { useJiraServerListQuery } from '../../../../k8s/JiraServer/hooks/useJiraServerListQuery';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES } from '../../../../types/forms';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageJiraIntegrationSecret } from '../../../../widgets/ManageJiraIntegrationSecret';
import { menu } from '../../menu';
import { JIRA_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findJiraIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.JIRA);

export const PageView = () => {
    const { data: jiraServer } = useJiraServerListQuery({
        props: {
            namespace: getDefaultNamespace(),
        },
        options: {
            select: data => data.items?.[0],
        },
    });

    const [jiraServerSecret, setJiraServerSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'jira',
            dataHandler: data => {
                const jiraServerSecret = findJiraIntegrationSecret(data);
                setJiraServerSecret(jiraServerSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const mode = !!jiraServer && !!jiraServerSecret ? FORM_MODES.EDIT : FORM_MODES.CREATE;

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
                            <ManageJiraIntegrationSecret
                                formData={{
                                    jiraServer,
                                    jiraServerSecret,
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

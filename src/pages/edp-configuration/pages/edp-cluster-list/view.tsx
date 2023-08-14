import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Link,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Render } from '../../../../components/Render';
import { URL_EDP_HEADLAMP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE } from '../../../../k8s/Secret/labels';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageClusterSecret } from '../../../../widgets/ManageClusterSecret';
import { menu } from '../../menu';
import { CLUSTER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = SecretKubeObject.useList({
        namespace: getDefaultNamespace(),
        labelSelector: `${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`,
    });

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleClosePlaceholder = () => {
        setExpandedPanel(null);
    };

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'md'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {CLUSTER_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {CLUSTER_LIST_PAGE_DESCRIPTION.description}{' '}
                            <Link href={URL_EDP_HEADLAMP_USER_GUIDE} target={'_blank'}>
                                <Typography variant={'body2'} component={'span'}>
                                    Learn more.
                                </Typography>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CreateItemAccordion
                            isExpanded={expandedPanel === 'placeholder'}
                            onChange={handleChange('placeholder')}
                            title={'Add Cluster'}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ManageClusterSecret
                                        formData={{
                                            currentElement: 'placeholder',
                                            handleClosePlaceholder,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CreateItemAccordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {items && items.length ? (
                                items.map(el => {
                                    const key = el?.metadata?.name || el?.metadata?.uid;
                                    const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                                    return (
                                        <Grid item xs={12} key={key}>
                                            <Accordion
                                                expanded={expandedPanel === key}
                                                onChange={handleChange(key)}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}
                                                >
                                                    <Grid
                                                        container
                                                        spacing={3}
                                                        alignItems={'center'}
                                                    >
                                                        <Grid item>
                                                            <Typography variant={'h6'}>
                                                                {el?.metadata?.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Render condition={!!ownerReference}>
                                                            <Grid item>
                                                                <Tooltip
                                                                    title={`Managed by ${ownerReference}`}
                                                                >
                                                                    <Icon
                                                                        icon={ICONS.CLOUD_LOCK}
                                                                        width={20}
                                                                        style={{
                                                                            display: 'block',
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </Grid>
                                                        </Render>
                                                    </Grid>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <ManageClusterSecret
                                                                formData={{
                                                                    currentElement: el,
                                                                    isReadOnly: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    );
                                })
                            ) : (
                                <Grid item xs={12}>
                                    <EmptyContent color={'textSecondary'}>No clusters</EmptyContent>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

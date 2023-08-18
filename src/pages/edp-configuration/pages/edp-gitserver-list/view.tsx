import { Icon } from '@iconify/react';
import { EmptyContent } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Link,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { CreateItemAccordion } from '../../../../components/CreateItemAccordion';
import { PageWithSubMenu } from '../../../../components/PageWithSubMenu';
import { PageWrapper } from '../../../../components/PageWrapper';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageGitServer } from '../../../../widgets/ManageGitServer';
import { menu } from '../../menu';
import { GIT_SERVER_LIST_PAGE_DESCRIPTION } from './constants';

export const PageView = () => {
    const [items] = EDPGitServerKubeObject.useList({
        namespace: getDefaultNamespace(),
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
            <PageWrapper containerMaxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {GIT_SERVER_LIST_PAGE_DESCRIPTION.label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {GIT_SERVER_LIST_PAGE_DESCRIPTION.description}{' '}
                            <Link
                                href={EDP_USER_GUIDE.GIT_SERVER_MANAGE.anchors.VIEW_DATA.url}
                                target={'_blank'}
                            >
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
                            title={'Create Git Server'}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ManageGitServer
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
                                    const key = el?.spce?.gitHost || el?.metadata?.uid;

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
                                                    </Grid>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <ManageGitServer
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
                                    <EmptyContent color={'textSecondary'}>
                                        No Git Servers
                                    </EmptyContent>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </PageWrapper>
        </PageWithSubMenu>
    );
};

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
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { menu } from '../../menu';
import { ConfigurationBodyProps } from './types';

export const ConfigurationBody = ({
    pageData,
    renderPlaceHolderData,
    items,
    emptyMessage,
}: ConfigurationBodyProps) => {
    const { label, description, docUrl } = pageData;
    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleClosePlaceholder = () => {
        setExpandedPanel(null);
    };

    const placeholderData = React.useMemo(
        () => renderPlaceHolderData({ handleClosePlaceholder }),
        [renderPlaceHolderData]
    );

    return (
        <PageWithSubMenu list={menu}>
            <PageWrapper containerMaxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} gutterBottom>
                            {label}
                        </Typography>
                        <Typography variant={'body1'}>
                            {description}{' '}
                            <Render condition={!!docUrl}>
                                <Link href={docUrl} target={'_blank'}>
                                    <Typography variant={'body2'} component={'span'}>
                                        Learn more.
                                    </Typography>
                                </Link>
                            </Render>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CreateItemAccordion
                            isExpanded={expandedPanel === 'placeholder'}
                            onChange={handleChange('placeholder')}
                            disabled={placeholderData.disabled}
                            title={placeholderData.title}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {placeholderData.component}
                                </Grid>
                            </Grid>
                        </CreateItemAccordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {items && items.length ? (
                                items.map(configurationItem => {
                                    const key = configurationItem?.id;
                                    const ownerReference = configurationItem?.ownerReference;

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
                                                                {configurationItem.title}
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
                                                            {configurationItem.component}
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
                                        {emptyMessage}
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

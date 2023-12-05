import { Icon } from '@iconify/react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Grid,
    GridSize,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { UseSpriteSymbol } from '../../icons/UseSpriteSymbol';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { LS_KEY_SHOW_INFO_COLUMNS_BY_DEFAULT } from '../../services/local-storage/keys';
import { useStyles } from './styles';
import { InfoColumnsAccordionProps, InfoColumnsProps } from './types';

const toShowValueFromLocalStorage: 'true' | 'false' = LOCAL_STORAGE_SERVICE.getItem(
    LS_KEY_SHOW_INFO_COLUMNS_BY_DEFAULT
);

const InfoColumnsRenderer = ({ infoRows }: InfoColumnsProps) => {
    return (
        <Grid container spacing={4}>
            {infoRows ? (
                infoRows.map((row, index) => (
                    <Grid item xs={12} key={`row::${index}`}>
                        <Grid container spacing={2}>
                            {row.map(({ label, text, icon, columnXs = 2 }, index) => (
                                <React.Fragment key={`column::${index}`}>
                                    {!!label && !!text && (
                                        <Grid item xs={columnXs as GridSize}>
                                            <Typography variant={'body2'} gutterBottom>
                                                {label}
                                            </Typography>
                                            <Grid container spacing={1} alignItems={'center'}>
                                                {!!icon && (
                                                    <Grid item>
                                                        {typeof icon === 'string' ? (
                                                            <UseSpriteSymbol
                                                                name={icon}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        ) : (
                                                            icon
                                                        )}
                                                    </Grid>
                                                )}
                                                <Grid item>
                                                    <Typography
                                                        variant={'caption'}
                                                        style={{ lineHeight: 1 }}
                                                    >
                                                        {text}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                ))
            ) : (
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
            )}
        </Grid>
    );
};

export const InfoColumnsAccordion = ({ infoRows, title }: InfoColumnsAccordionProps) => {
    const classes = useStyles();
    const [expandedPanel, setExpandedPanel] = React.useState<string>(
        toShowValueFromLocalStorage === 'true' ? 'info_columns' : null
    );

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
        LOCAL_STORAGE_SERVICE.setItem(LS_KEY_SHOW_INFO_COLUMNS_BY_DEFAULT, String(isExpanded));
    };

    const toShow = expandedPanel === 'info_columns';

    return (
        <Accordion elevation={1} expanded={toShow} onChange={handleChange('info_columns')}>
            <AccordionSummary
                expandIcon={<Icon icon={toShow ? ICONS.MINUS : ICONS.PLUS} />}
                className={classes.accordionSummary}
            >
                <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <InfoColumnsRenderer infoRows={infoRows} />
            </AccordionDetails>
        </Accordion>
    );
};

export const InfoColumns = ({ infoRows }: InfoColumnsProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <InfoColumnsRenderer infoRows={infoRows} />
        </div>
    );
};

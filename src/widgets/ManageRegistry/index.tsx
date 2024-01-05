import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { CONTAINER_REGISTRY_TYPE_LABEL_MAP } from '../../k8s/ConfigMap/constants';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageRegistryProps } from './types';

export const ManageRegistry = ({ formData }: ManageRegistryProps) => {
    const { EDPConfigMap } = formData;
    const registryType = EDPConfigMap && EDPConfigMap.data.container_registry_type;
    const mode = !!registryType ? FORM_MODES.EDIT : FORM_MODES.CREATE;

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleClosePanel = () => setExpandedPanel(null);

    const _formData = React.useMemo(() => ({ ...formData, handleClosePanel }), [formData]);

    return (
        <Grid container spacing={2} data-testid="form">
            <Grid item xs={12}>
                <CreateItemAccordion
                    isExpanded={expandedPanel === mode}
                    onChange={handleChange(mode)}
                    title={'Add Registry'}
                    disabled={mode === FORM_MODES.EDIT}
                >
                    {mode === FORM_MODES.CREATE && <Create formData={_formData} />}
                </CreateItemAccordion>
            </Grid>
            {mode === FORM_MODES.EDIT ? (
                <Grid item xs={12}>
                    <Accordion expanded>
                        <AccordionSummary style={{ cursor: 'default' }}>
                            <Typography variant={'h6'}>
                                {CONTAINER_REGISTRY_TYPE_LABEL_MAP[registryType]}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Edit formData={_formData} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ) : null}
        </Grid>
    );
};

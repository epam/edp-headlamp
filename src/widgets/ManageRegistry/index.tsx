import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { CreateItemAccordion } from '../../components/CreateItemAccordion';
import { Render } from '../../components/Render';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { CONTAINER_REGISTRY_TYPE } from '../../k8s/ConfigMap/constants';
import { FORM_MODES } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageRegistryProps } from './types';

const generateNameBasedOnType = (type: ValueOf<typeof CONTAINER_REGISTRY_TYPE>) => {
    switch (type) {
        case CONTAINER_REGISTRY_TYPE.ECR:
            return 'ECR';
        case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
            return 'DockerHub';
        case CONTAINER_REGISTRY_TYPE.HARBOR:
            return 'Harbor';
        case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
            return 'Openshift Registry';
    }
};

export const ManageRegistry = ({ formData }: ManageRegistryProps) => {
    const { EDPConfigMap } = formData;
    const registryType = EDPConfigMap?.data.container_registry_type;
    const mode = registryType ? FORM_MODES.EDIT : FORM_MODES.CREATE;

    const [expandedPanel, setExpandedPanel] = React.useState<string>(null);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleClosePanel = () => setExpandedPanel(null);

    const _formData = React.useMemo(() => ({ ...formData, handleClosePanel }), [formData]);

    return (
        <Grid container spacing={2} data-testid="form">
            <Render condition={mode === FORM_MODES.CREATE}>
                <Grid item xs={12}>
                    <CreateItemAccordion
                        isExpanded={expandedPanel === mode}
                        onChange={handleChange(mode)}
                        title={'Add Registry'}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Create formData={_formData} />
                            </Grid>
                        </Grid>
                    </CreateItemAccordion>
                </Grid>
            </Render>
            <Render condition={mode === FORM_MODES.EDIT}>
                <Grid item xs={12}>
                    <Accordion expanded={expandedPanel === mode} onChange={handleChange(mode)}>
                        <AccordionSummary expandIcon={<Icon icon={ICONS.ARROW_DOWN} />}>
                            <Typography variant={'h6'}>
                                {generateNameBasedOnType(registryType)}
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
            </Render>
        </Grid>
    );
};

import { DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { DEPLOYMENT_TYPES } from '../../../../constants/deploymentTypes';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { FormContextProvider } from '../../../../providers/Form';
import {
    FORM_PART_APPLICATIONS,
    FORM_PART_PIPELINE,
    FORM_PART_STAGES,
    TAB_INDEXES,
} from '../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../names';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useStyles } from './styles';

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export const Create = () => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

    const [editorData, setEditorData] = React.useState<EDPCDPipelineKubeObjectInterface>(null);

    const [formActiveTabIdx, setFormActiveTabIdx] = React.useState<number>(
        TAB_INDEXES[FORM_PART_PIPELINE]
    );
    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => {
            setFormActiveTabIdx(newActiveTabIdx);
        },
        []
    );

    const [stages, setStages] = React.useState<EDPCDPipelineStageKubeObjectInterface[]>([]);

    const defaultValues = React.useMemo(
        () => ({
            [CDPIPELINE_FORM_NAMES.deploymentType.name]: DEPLOYMENT_TYPES.CONTAINER,
        }),
        []
    );

    return (
        <FormContextProvider
            formSettings={{
                mode: 'onBlur',
                defaultValues: defaultValues,
            }}
        >
            <DialogTitle>
                <DialogHeader setEditorData={setEditorData} setEditorOpen={setEditorOpen} />
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <div className={classes.dialogContentTabs}>
                    <Tabs
                        orientation="vertical"
                        value={formActiveTabIdx}
                        onChange={handleChangeTab}
                        aria-label="simple tabs example"
                        indicatorColor={'primary'}
                        textColor={'primary'}
                    >
                        <Tab label="Pipeline" {...a11yProps(TAB_INDEXES[FORM_PART_PIPELINE])} />
                        <Tab
                            label={`Applications`}
                            {...a11yProps(TAB_INDEXES[FORM_PART_APPLICATIONS])}
                        />
                        <Tab label="Stages" {...a11yProps(TAB_INDEXES[FORM_PART_STAGES])} />
                    </Tabs>
                </div>
                <div className={classes.dialogContentForm}>
                    <Form
                        formActiveTabIdx={formActiveTabIdx}
                        editorData={editorData}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                        stages={stages}
                        setStages={setStages}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <FormActions
                    formActiveTabIdx={formActiveTabIdx}
                    setFormActiveTabIdx={setFormActiveTabIdx}
                    stages={stages}
                    setStages={setStages}
                />
            </DialogActions>
        </FormContextProvider>
    );
};

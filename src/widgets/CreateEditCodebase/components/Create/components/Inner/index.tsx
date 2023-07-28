import {
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../../components/Render';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { DEPLOYMENT_SCRIPTS } from '../../../../../../constants/deploymentScripts';
import { TEST_REPORT_FRAMEWORKS } from '../../../../../../constants/testReportFrameworks';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { MainRadioGroup } from '../../../../../../providers/Form/components/MainRadioGroup';
import { FieldEvent } from '../../../../../../types/forms';
import { rem } from '../../../../../../utils/styling/rem';
import {
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    TAB_INDEXES,
} from '../../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { CreateCodebaseFormValues } from '../../types';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useCodebaseCreationStrategies } from './hooks/useCodebaseCreationStrategies';
import { useCodebaseTypeOptions } from './hooks/useCodebaseTypes';
import { useStyles } from './styles';

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export const Inner = ({ baseDefaultValues }) => {
    const classes = useStyles();
    const {
        register,
        setValue,
        control,
        formState: { errors },
    } = useFormContext<CreateCodebaseFormValues>();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorData, setEditorData] = React.useState<EDPCodebaseKubeObjectInterface>(null);
    const [modalActiveTabIdx, setModalActiveTabIdx] = React.useState<number>(0);
    const [formActiveTabIdx, setFormActiveTabIdx] = React.useState<number>(
        TAB_INDEXES[FORM_PART_CODEBASE_INFO]
    );

    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => {
            setFormActiveTabIdx(newActiveTabIdx);
        },
        []
    );

    const codebaseTypeOptions = useCodebaseTypeOptions();
    const codebaseCreationStrategies = useCodebaseCreationStrategies();

    return (
        <>
            <Render condition={modalActiveTabIdx === 0}>
                <Box p={rem(20)}>
                    <Typography variant={'h4'} style={{ marginBottom: rem(20) }}>
                        Create new component
                    </Typography>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MainRadioGroup
                                    {...register(CODEBASE_FORM_NAMES.type.name, {
                                        onChange: ({ target: { value } }: FieldEvent) => {
                                            switch (value) {
                                                case CODEBASE_TYPES.APPLICATION:
                                                    setValue(
                                                        CODEBASE_FORM_NAMES.deploymentScript.name,
                                                        DEPLOYMENT_SCRIPTS.HELM_CHART
                                                    );
                                                    break;
                                                case CODEBASE_TYPES.AUTOTEST:
                                                    setValue(
                                                        CODEBASE_FORM_NAMES.testReportFramework
                                                            .name,
                                                        TEST_REPORT_FRAMEWORKS.ALLURE
                                                    );
                                                    break;
                                            }
                                        },
                                    })}
                                    control={control}
                                    errors={errors}
                                    options={codebaseTypeOptions}
                                    gridItemSize={6}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider style={{ margin: '0 auto', width: '70%' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <MainRadioGroup
                                    {...register(CODEBASE_FORM_NAMES.strategy.name, {
                                        onChange: () => setModalActiveTabIdx(1),
                                    })}
                                    control={control}
                                    errors={errors}
                                    options={codebaseCreationStrategies}
                                    gridItemSize={4}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Render>
            <Render condition={modalActiveTabIdx === 1}>
                <>
                    <DialogTitle>
                        <DialogHeader setEditorOpen={setEditorOpen} setEditorData={setEditorData} />
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
                                <Tab
                                    label="Codebase info"
                                    {...a11yProps(TAB_INDEXES[FORM_PART_CODEBASE_INFO])}
                                />
                                <Tab
                                    label="Advanced settings"
                                    {...a11yProps(TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS])}
                                />
                            </Tabs>
                        </div>
                        <div className={classes.dialogContentForm}>
                            <Form
                                editorData={editorData}
                                setEditorOpen={setEditorOpen}
                                editorOpen={editorOpen}
                                formActiveTabIdx={formActiveTabIdx}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <FormActions
                            baseDefaultValues={baseDefaultValues}
                            formActiveTabIdx={formActiveTabIdx}
                            setFormActiveTabIdx={setFormActiveTabIdx}
                            setModalActiveTabIdx={setModalActiveTabIdx}
                        />
                    </DialogActions>
                </>
            </Render>
        </>
    );
};

import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { Render } from '../../../Render';
import { stageQAMock } from '../../hooks/mocks/stageQA.mock';
import { stageSitMock } from '../../hooks/mocks/stageSit.mock';
import { ApplicationsFormPart } from './components/ApplicationsFormPart';
import { PipelineInfoFormPart } from './components/PipelineFormPart';
import { StagesFormPart } from './components/StagesFormPart';
import { TabPanel } from './components/TabPanel';
import { FORM_PART_APPLICATIONS, FORM_PART_PIPELINE, FORM_PART_STAGES } from './constants';
import { TAB_INDEXES } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorReturnValues } from './hooks/useEditorCode';
import { CDPIPELINE_BACKWARDS_NAME_MAPPING, CDPIPELINE_CREATION_FORM_NAMES } from './names';
import { useStyles } from './styles';
import { CreateCDPipelineFormProps } from './types';

const { Tabs, Tab, Button } = MuiCore;

const {
    CommonComponents: { EditorDialog },
} = pluginLib;

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const TAB_INDEXES_LAST_INDEX = Object.keys(TAB_INDEXES).length - 1;

export const CreateCDPipelineForm = ({
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
}: CreateCDPipelineFormProps): React.ReactElement => {
    const classes = useStyles();

    const [activeTabIdx, setActiveTabIdx] = React.useState<string>(TAB_INDEXES[FORM_PART_PIPELINE]);

    const { baseDefaultValues } = useDefaultValues({ names: CDPIPELINE_CREATION_FORM_NAMES });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCDPipelineKubeObjectInterface>>(baseDefaultValues);

    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => {
            setActiveTabIdx(newActiveTabIdx);
        },
        []
    );

    const methods = useForm({
        defaultValues: baseDefaultValues,
    });

    const {
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty },
        trigger,
        setValue,
    } = methods;

    const getFirstErrorTabName = React.useCallback(errors => {
        const [firstErrorFieldName] = Object.keys(errors);
        return CDPIPELINE_CREATION_FORM_NAMES[firstErrorFieldName].formPart;
    }, []);

    const handleFormFieldChange = React.useCallback(({ target: { name, value } }) => {
        setFormValues(prev => {
            if (Object.hasOwn(CDPIPELINE_CREATION_FORM_NAMES[name], 'notUsedInFormData')) {
                return prev;
            }

            if (value === undefined) {
                return lodashOmit(prev, name);
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    }, []);

    const handleResetFields = React.useCallback(() => {
        setFormValues(baseDefaultValues);
        reset();
    }, [baseDefaultValues, reset]);

    const { handleEditorSave } = useHandleEditorSave({
        names: CDPIPELINE_CREATION_FORM_NAMES,
        backwardNames: CDPIPELINE_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorReturnValues({
        names: CDPIPELINE_CREATION_FORM_NAMES,
        formValues,
    });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPCDPipelineKubeObjectInterface) => {
            handleEditorSave(editorPropsObject);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const handleValidationError = React.useCallback(
        (errors: Object) => {
            if (errors) {
                const firstErrorTabName = getFirstErrorTabName(errors);
                setActiveTabIdx(TAB_INDEXES[firstErrorTabName]);
            }
        },
        [getFirstErrorTabName]
    );

    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const handleProceed = React.useCallback(async () => {
        const hasNoErrors = await trigger();

        if (hasNoErrors) {
            setActiveTabIdx(activeTabIdx + 1);
        }
    }, [activeTabIdx, trigger]);

    const onSubmit = React.useCallback(() => {
        handleApply(editorReturnValues, [stageSitMock, stageQAMock]);
    }, [editorReturnValues, handleApply]);

    return (
        <FormProvider {...methods}>
            <Tabs
                orientation="vertical"
                value={activeTabIdx}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
                indicatorColor={'primary'}
                textColor={'primary'}
                className={classes.tabs}
            >
                <Tab label="Pipeline" {...a11yProps(TAB_INDEXES[FORM_PART_PIPELINE])} />
                <Tab label={`Applications`} {...a11yProps(TAB_INDEXES[FORM_PART_APPLICATIONS])} />
                <Tab label="Stages" {...a11yProps(TAB_INDEXES[FORM_PART_STAGES])} />
            </Tabs>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit, handleValidationError)}>
                    <div className={classes.formInner}>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_PIPELINE]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <PipelineInfoFormPart
                                    names={CDPIPELINE_CREATION_FORM_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_APPLICATIONS]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <ApplicationsFormPart
                                    names={CDPIPELINE_CREATION_FORM_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_STAGES]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <StagesFormPart
                                    names={CDPIPELINE_CREATION_FORM_NAMES}
                                    handleFormFieldChange={handleFormFieldChange}
                                />
                            </div>
                        </TabPanel>
                    </div>
                    <div className={classes.tabPanelActions}>
                        <Button
                            onClick={handleResetFields}
                            size="small"
                            component={'button'}
                            disabled={!isDirty}
                        >
                            undo changes
                        </Button>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            size="small"
                            component={'button'}
                            style={{ marginLeft: 'auto' }}
                        >
                            cancel
                        </Button>
                        <Render condition={activeTabIdx < TAB_INDEXES_LAST_INDEX}>
                            <Button
                                onClick={handleProceed}
                                variant={'contained'}
                                color={'primary'}
                                size="small"
                            >
                                proceed
                            </Button>
                        </Render>
                        <Render condition={activeTabIdx === TAB_INDEXES_LAST_INDEX}>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                size="small"
                                disabled={!isDirty}
                            >
                                apply
                            </Button>
                        </Render>
                    </div>
                </form>
            </div>
            <Render condition={!!editorOpen}>
                <EditorDialog
                    {...muDialogProps}
                    item={editorReturnValues}
                    onClose={() => setEditorOpen(false)}
                    onSave={onEditorSave}
                />
            </Render>
        </FormProvider>
    );
};

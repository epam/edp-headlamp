import clsx from 'clsx';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPTS } from '../../constants/deploymentScripts';
import { ICONS } from '../../constants/icons';
import { useHandleEditorSave } from '../../hooks/useHandleEditorSave';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { Iconify, MuiCore, pluginLib, React } from '../../plugin.globals';
import { KubeObjectInterface } from '../../plugin.types';
import { FieldEvent, FieldEventTarget, FormNameObject } from '../../types/forms';
import { DeepPartial } from '../../types/global';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { rem } from '../../utils/styling/rem';
import { Render } from '../Render';
import { AdvancedSettings } from './components/AdvancedSettings';
import { CodebaseInfo } from './components/CodebaseInfo';
import { MainRadioGroup } from './components/MainRadioGroup';
import { TabPanel } from './components/TabPanel';
import { FORM_PART_ADVANCED_SETTINGS, FORM_PART_CODEBASE_INFO, TAB_INDEXES } from './constants';
import { useCodebaseCreationStrategies } from './hooks/useCodebaseCreationStrategies';
import { useCodebaseTypeOptions } from './hooks/useCodebaseTypeOptions';
import { useCreateCodebase } from './hooks/useCreateCodebase';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useUpdateFieldsDependingOnChosenCITool } from './hooks/useUpdateFieldsDependingOnChosenCITool';
import { useUpdateJiraServerIntegrationValue } from './hooks/useUpdateJiraServerIntegrationValue';
import { useUpdateVersioningFields } from './hooks/useUpdateVersioningFields';
import { CODEBASE_BACKWARDS_NAME_MAPPING, CODEBASE_NAMES as names } from './names';
import { useStyles } from './styles';
import { CodebaseAuthData, CreateCodebaseProps } from './types';

const { Grid, Dialog, Divider, DialogContent, Typography, Button, Box, Tabs, Tab } = MuiCore;
const { Icon } = Iconify;
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

export const FormDataContext = React.createContext<{
    formValues: any;
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange: ({ name, value }: FieldEventTarget) => void;
}>(null);

export const CreateCodebase = ({
    createDialogOpen,
    setCreateDialogOpen,
}: CreateCodebaseProps): React.ReactElement => {
    const classes = useStyles();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [modalActiveTabIdx, setModalActiveTabIdx] = React.useState<number>(0);
    const [formActiveTabIdx, setFormActiveTabIdx] = React.useState<number>(
        TAB_INDEXES[FORM_PART_CODEBASE_INFO]
    );

    const { baseDefaultValues } = useDefaultValues();

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseKubeObjectInterface>>(baseDefaultValues);

    const createCodebaseForm = useForm<any>({
        defaultValues: baseDefaultValues,
    });

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState: { isDirty, errors },
        trigger,
        setValue,
        watch,
        control,
    } = createCodebaseForm;

    React.useEffect(() => {
        reset(baseDefaultValues);
    }, [baseDefaultValues, reset]);

    const typeFieldValue = watch(names.type.name);
    const strategyFieldValue = watch(names.strategy.name);

    const [codebaseAuthData, setCodebaseAuthData] = React.useState<CodebaseAuthData>({
        repositoryLogin: '',
        repositoryPasswordOrApiToken: '',
    });

    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: number) => {
            setFormActiveTabIdx(newActiveTabIdx);
        },
        []
    );

    const getFirstErrorTabName = React.useCallback(errors => {
        const [firstErrorFieldName] = Object.keys(errors);
        return names[firstErrorFieldName].formPart;
    }, []);

    const handleFormFieldChange = React.useCallback(({ name, value }: FieldEventTarget) => {
        setCodebaseAuthData(prev => {
            if (Object.hasOwn(names[name], 'notUsedInFormData') && name === 'repositoryLogin') {
                return {
                    ...prev,
                    repositoryLogin: value,
                };
            }

            if (
                Object.hasOwn(names[name], 'notUsedInFormData') &&
                name === 'repositoryPasswordOrApiToken'
            ) {
                return {
                    ...prev,
                    repositoryPasswordOrApiToken: value,
                };
            }

            return prev;
        });
        setFormValues(prev => {
            if (Object.hasOwn(names[name], 'notUsedInFormData')) {
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
        reset({
            ...baseDefaultValues,
            [names.strategy.name]: strategyFieldValue,
            [names.type.name]: typeFieldValue,
        });
    }, [reset, baseDefaultValues, strategyFieldValue, typeFieldValue]);

    const { handleEditorSave } = useHandleEditorSave({
        names,
        backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({ names, formValues, type: typeFieldValue });

    const onEditorSave = React.useCallback(
        (editorReturnValues: EDPCodebaseKubeObjectInterface) => {
            handleEditorSave(editorReturnValues);
            setEditorOpen(false);
        },
        [handleEditorSave, setEditorOpen]
    );

    const handleValidationError = React.useCallback(
        (errors: Object) => {
            if (errors) {
                const firstErrorTabName = getFirstErrorTabName(errors);
                setFormActiveTabIdx(TAB_INDEXES[firstErrorTabName]);
            }
        },
        [getFirstErrorTabName]
    );

    const activeTabFormPartName = React.useMemo(() => {
        const [validEntry] = Object.entries(TAB_INDEXES).filter(
            ([, idx]) => idx === formActiveTabIdx
        );
        const [activeTabName] = validEntry;

        return activeTabName;
    }, [formActiveTabIdx]);

    const handleProceed = React.useCallback(async () => {
        const activeTabFormPartNames = Object.values(names)
            .filter(({ formPart }) => formPart === activeTabFormPartName)
            .map(({ name }) => name);
        const hasNoErrors = await trigger(activeTabFormPartNames);
        if (hasNoErrors) {
            setFormActiveTabIdx(formActiveTabIdx + 1);
        }
    }, [activeTabFormPartName, formActiveTabIdx, trigger]);

    const handleClose = React.useCallback(() => {
        setCreateDialogOpen(false);
        setTimeout(() => {
            reset({
                ...baseDefaultValues,
                [names.strategy.name]: undefined,
                [names.type.name]: undefined,
            });
            setFormActiveTabIdx(TAB_INDEXES[FORM_PART_CODEBASE_INFO]);
            setModalActiveTabIdx(0);
        }, 500);
    }, [setCreateDialogOpen, reset, baseDefaultValues]);

    const {
        createCodebase,
        mutations: {
            codebaseCreateMutation,
            codebaseSecretCreateMutation,
            codebaseSecretDeleteMutation,
        },
    } = useCreateCodebase({
        onSuccess: handleClose,
        onError: () => setCreateDialogOpen(true),
    });

    const onSubmit = React.useCallback(async () => {
        const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;

        if (repositoryLogin && repositoryPasswordOrApiToken) {
            await createCodebase({
                codebaseData: editorReturnValues,
                codebaseAuthData: codebaseAuthData,
            });
        } else {
            await createCodebase({
                codebaseData: editorReturnValues,
                codebaseAuthData: null,
            });
        }
    }, [codebaseAuthData, editorReturnValues, createCodebase]);

    const isApplying = React.useMemo(
        () =>
            codebaseCreateMutation.isLoading ||
            codebaseSecretCreateMutation.isLoading ||
            codebaseSecretDeleteMutation.isLoading,
        [
            codebaseCreateMutation.isLoading,
            codebaseSecretCreateMutation.isLoading,
            codebaseSecretDeleteMutation.isLoading,
        ]
    );

    const codebaseTypeOptions = useCodebaseTypeOptions();
    const codebaseCreationStrategies = useCodebaseCreationStrategies({ typeFieldValue });

    useUpdateJiraServerIntegrationValue({ watch, setValue, names });
    useUpdateVersioningFields({ watch, setValue, names, handleFormFieldChange });
    useUpdateFieldsDependingOnChosenCITool({ watch, names, handleFormFieldChange });

    return (
        <Dialog
            open={createDialogOpen}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth
            className={clsx({
                [classes.dialogRoot]: modalActiveTabIdx !== 0,
            })}
        >
            <FormProvider {...createCodebaseForm}>
                <TabPanel value={modalActiveTabIdx} className={classes.tabPanel} index={0}>
                    <Box p={rem(20)}>
                        <Typography variant={'h4'} style={{ marginBottom: rem(20) }}>
                            Create new component
                        </Typography>
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <MainRadioGroup
                                        {...register(names.type.name, {
                                            onChange: ({ target: { name, value } }: FieldEvent) => {
                                                handleFormFieldChange({ name, value });

                                                switch (value) {
                                                    case CODEBASE_TYPES.APPLICATION:
                                                        setValue(
                                                            names.deploymentScript.name,
                                                            DEPLOYMENT_SCRIPTS.HELM_CHART
                                                        );
                                                        handleFormFieldChange({
                                                            name: names.deploymentScript.name,
                                                            value: DEPLOYMENT_SCRIPTS.HELM_CHART,
                                                        });
                                                        break;
                                                    default:
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
                                        {...register(names.strategy.name, {
                                            onChange: ({ target: { name, value } }: FieldEvent) => {
                                                handleFormFieldChange({ name, value });
                                                switch (value) {
                                                    case CODEBASE_CREATION_STRATEGIES.CLONE:
                                                        handleFormFieldChange({
                                                            name: names.emptyProject.name,
                                                            value: false,
                                                        });
                                                        break;

                                                    case CODEBASE_CREATION_STRATEGIES.IMPORT:
                                                        handleFormFieldChange({
                                                            name: names.emptyProject.name,
                                                            value: false,
                                                        });
                                                        break;
                                                    default:
                                                        break;
                                                }

                                                setModalActiveTabIdx(1);
                                            },
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
                </TabPanel>
                <TabPanel value={modalActiveTabIdx} className={classes.tabPanel} index={1}>
                    <div className={classes.dialog} data-testid={'create-codebase'}>
                        <div className={classes.dialogTitle}>
                            <Typography variant={'h5'}>{`Create ${capitalizeFirstLetter(
                                typeFieldValue
                            )}`}</Typography>
                            <Button
                                startIcon={<Icon icon={ICONS['PENCIL']} />}
                                size="small"
                                component={'button'}
                                onClick={() => setEditorOpen(true)}
                            >
                                Edit YAML
                            </Button>
                        </div>
                        <DialogContent className={classes.dialogContent}>
                            <>
                                <Tabs
                                    orientation="vertical"
                                    value={formActiveTabIdx}
                                    onChange={handleChangeTab}
                                    aria-label="simple tabs example"
                                    indicatorColor={'primary'}
                                    textColor={'primary'}
                                    className={classes.tabs}
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
                                <div className={classes.form}>
                                    <form onSubmit={handleSubmit(onSubmit, handleValidationError)}>
                                        <FormDataContext.Provider
                                            value={{
                                                formValues,
                                                names,
                                                handleFormFieldChange,
                                            }}
                                        >
                                            <div className={classes.formInner}>
                                                <TabPanel
                                                    value={formActiveTabIdx}
                                                    index={TAB_INDEXES[FORM_PART_CODEBASE_INFO]}
                                                    className={classes.tabPanel}
                                                >
                                                    <div className={classes.tabPanelInner}>
                                                        <CodebaseInfo />
                                                    </div>
                                                </TabPanel>
                                                <TabPanel
                                                    value={formActiveTabIdx}
                                                    index={TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS]}
                                                    className={classes.tabPanel}
                                                >
                                                    <div className={classes.tabPanelInner}>
                                                        <AdvancedSettings />
                                                    </div>
                                                </TabPanel>
                                            </div>
                                        </FormDataContext.Provider>
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
                                                onClick={handleClose}
                                                size="small"
                                                component={'button'}
                                                style={{ marginLeft: 'auto' }}
                                            >
                                                cancel
                                            </Button>
                                            <Render
                                                condition={
                                                    formActiveTabIdx < TAB_INDEXES_LAST_INDEX
                                                }
                                            >
                                                <Button
                                                    onClick={handleProceed}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size="small"
                                                >
                                                    proceed
                                                </Button>
                                            </Render>
                                            <Render
                                                condition={
                                                    formActiveTabIdx === TAB_INDEXES_LAST_INDEX
                                                }
                                            >
                                                <Button
                                                    type={'submit'}
                                                    variant={'contained'}
                                                    color={'primary'}
                                                    size="small"
                                                    disabled={!isDirty || isApplying}
                                                >
                                                    apply
                                                </Button>
                                            </Render>
                                        </div>
                                    </form>
                                </div>
                                <EditorDialog
                                    open={editorOpen}
                                    item={editorReturnValues as unknown as KubeObjectInterface}
                                    onClose={() => setEditorOpen(false)}
                                    onSave={onEditorSave}
                                />
                            </>
                        </DialogContent>
                    </div>
                </TabPanel>
            </FormProvider>
        </Dialog>
    );
};

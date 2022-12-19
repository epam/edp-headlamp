import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { useGitServers } from '../../../../hooks/useGitServers';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { useNamespace } from '../../../../hooks/useNamespace';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { Render } from '../../../Render';
import { ApplicationAdvancedSettingsFormPart } from './components/ApplicationAdvancedSettingsFormPart';
import { ApplicationCodebaseInfoFormPart } from './components/ApplicationCodebaseInfoFormPart';
import { ApplicationCodebaseTypeInfoFormPart } from './components/ApplicationCodebaseTypeInfoFormPart';
import { AutotestAdvancedSettingsFormPart } from './components/AutotestAdvancedSettingsFormPart';
import { AutotestCodebaseInfoFormPart } from './components/AutotestCodebaseInfoFormPart';
import { AutotestCodebaseTypeInfoFormPart } from './components/AutotestCodebaseTypeInfoFormPart';
import { LibraryAdvancedSettingsFormPart } from './components/LibraryAdvancedSettingsFormPart';
import { LibraryCodebaseInfoFormPart } from './components/LibraryCodebaseInfoFormPart';
import { LibraryCodebaseTypeInfoFormPart } from './components/LibraryCodebaseTypeInfoFormPart';
import { TabPanel } from './components/TabPanel';
import {
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    FORM_PART_CODEBASE_TYPE_INFO,
    TAB_INDEXES,
} from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useNames } from './hooks/useNames';
import { CODEBASE_BACKWARDS_NAME_MAPPING } from './names';
import { useStyles } from './styles';
import { CreateCodebaseFormProps } from './types';

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

export const GitServersDataContext = React.createContext<EDPGitServerKubeObjectInterface[]>(null);

export const CreateCodebaseForm = ({
    type,
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
    isApplying,
}: CreateCodebaseFormProps): React.ReactElement => {
    const classes = useStyles();
    const muDialogProps: DialogProps = {
        open: editorOpen,
    };

    const [activeTabIdx, setActiveTabIdx] = React.useState<number>(
        TAB_INDEXES[FORM_PART_CODEBASE_INFO]
    );

    const { names } = useNames({ type });
    const { namespace } = useNamespace();
    const { gitServers } = useGitServers({ namespace });

    const { baseDefaultValues } = useDefaultValues({ names, type, gitServers });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseKubeObjectInterface>>(baseDefaultValues);
    const [codebaseAuthData, setCodebaseAuthData] = React.useState<{
        repositoryLogin: string;
        repositoryPasswordOrApiToken: string;
    }>({
        repositoryLogin: '',
        repositoryPasswordOrApiToken: '',
    });

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

    const getFirstErrorTabName = React.useCallback(
        errors => {
            const [firstErrorFieldName] = Object.keys(errors);
            return names[firstErrorFieldName].formPart;
        },
        [names]
    );

    const handleFormFieldChange = React.useCallback(
        ({ name, value }: FieldEventTarget) => {
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
        },
        [names]
    );

    const handleResetFields = React.useCallback(() => {
        setFormValues(baseDefaultValues);
        reset();
    }, [baseDefaultValues, reset]);

    const { handleEditorSave } = useHandleEditorSave({
        names,
        backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
        setValue,
        handleFormFieldChange,
        formValues,
        resetField,
    });

    const { editorReturnValues } = useEditorCode({ names, formValues, type });

    const onEditorSave = React.useCallback(
        (editorPropsObject: EDPCodebaseKubeObjectInterface) => {
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

    const activeTabFormPartName = React.useMemo(() => {
        const [validEntry] = Object.entries(TAB_INDEXES).filter(([, idx]) => idx === activeTabIdx);
        const [activeTabName] = validEntry;

        return activeTabName;
    }, [activeTabIdx]);

    const handleProceed = React.useCallback(async () => {
        const activeTabFormPartNames = Object.values(names)
            .filter(({ formPart }) => formPart === activeTabFormPartName)
            .map(({ name }) => name);
        const hasNoErrors = await trigger(activeTabFormPartNames);
        if (hasNoErrors) {
            setActiveTabIdx(activeTabIdx + 1);
        }
    }, [activeTabFormPartName, activeTabIdx, names, trigger]);

    const onSubmit = React.useCallback(() => {
        const { repositoryLogin, repositoryPasswordOrApiToken } = codebaseAuthData;

        if (repositoryLogin && repositoryPasswordOrApiToken) {
            handleApply(editorReturnValues, codebaseAuthData);
        } else {
            handleApply(editorReturnValues, null);
        }
    }, [codebaseAuthData, editorReturnValues, handleApply]);

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
                <Tab label="Codebase info" {...a11yProps(TAB_INDEXES[FORM_PART_CODEBASE_INFO])} />
                <Tab
                    label={`${capitalizeFirstLetter(type)} info`}
                    {...a11yProps(TAB_INDEXES[FORM_PART_CODEBASE_TYPE_INFO])}
                />
                <Tab
                    label="Advanced settings"
                    {...a11yProps(TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS])}
                />
            </Tabs>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit, handleValidationError)}>
                    <div className={classes.formInner}>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_CODEBASE_INFO]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <GitServersDataContext.Provider value={gitServers}>
                                    <Render condition={type === CODEBASE_TYPES['APPLICATION']}>
                                        <ApplicationCodebaseInfoFormPart
                                            type={type}
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Render>
                                    <Render condition={type === CODEBASE_TYPES['LIBRARY']}>
                                        <LibraryCodebaseInfoFormPart
                                            type={type}
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Render>
                                    <Render condition={type === CODEBASE_TYPES['AUTOTEST']}>
                                        <AutotestCodebaseInfoFormPart
                                            type={type}
                                            names={names}
                                            handleFormFieldChange={handleFormFieldChange}
                                        />
                                    </Render>
                                </GitServersDataContext.Provider>
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_CODEBASE_TYPE_INFO]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <Render condition={type === CODEBASE_TYPES['APPLICATION']}>
                                    <ApplicationCodebaseTypeInfoFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        type={type}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPES['LIBRARY']}>
                                    <LibraryCodebaseTypeInfoFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        type={type}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPES['AUTOTEST']}>
                                    <AutotestCodebaseTypeInfoFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        type={type}
                                    />
                                </Render>
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <Render condition={type === CODEBASE_TYPES['APPLICATION']}>
                                    <ApplicationAdvancedSettingsFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPES['LIBRARY']}>
                                    <LibraryAdvancedSettingsFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPES['AUTOTEST']}>
                                    <AutotestAdvancedSettingsFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
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
                                disabled={!isDirty || isApplying}
                            >
                                apply
                            </Button>
                        </Render>
                    </div>
                </form>
            </div>
            <EditorDialog
                {...muDialogProps}
                item={editorReturnValues}
                onClose={() => setEditorOpen(false)}
                onSave={onEditorSave}
            />
        </FormProvider>
    );
};

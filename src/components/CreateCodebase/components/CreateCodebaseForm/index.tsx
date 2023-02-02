import type { DialogProps } from '@material-ui/core/Dialog';
import lodashOmit from 'lodash.omit';
import { FormProvider, useForm } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { GIT_SERVERS } from '../../../../constants/gitServers';
import { useGitServers } from '../../../../hooks/useGitServers';
import { useHandleEditorSave } from '../../../../hooks/useHandleEditorSave';
import { useNamespace } from '../../../../hooks/useNamespace';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { Render } from '../../../Render';
import { CodebaseAuthData } from '../../types';
import { AdvancedSettings } from './components/AdvancedSettings';
import { CodebaseInfo } from './components/CodebaseInfo';
import { CodebaseTypeInfo } from './components/CodebaseTypeInfo';
import { TabPanel } from './components/TabPanel';
import {
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    FORM_PART_CODEBASE_TYPE_INFO,
    TAB_INDEXES,
} from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useEditorCode } from './hooks/useEditorCode';
import { useUpdateFieldsDependingOnCodebaseType } from './hooks/useUpdateFieldsDependingOnCodebaseType';
import { CODEBASE_BACKWARDS_NAME_MAPPING, CODEBASE_NAMES as names } from './names';
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
export const FormDataContext = React.createContext<{
    formValues: any;
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange: ({ name, value }: FieldEventTarget) => void;
    setType: React.Dispatch<React.SetStateAction<CODEBASE_TYPES>>;
}>(null);

export const CreateCodebaseForm = ({
    setType,
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

    const { namespace } = useNamespace();
    const { gitServers } = useGitServers({ namespace });
    const hasGerritGitServer = React.useMemo(() => {
        if (!gitServers) {
            return true;
        }

        return !!gitServers.find(el => el.spec.gitProvider === GIT_SERVERS['GERRIT']);
    }, [gitServers]);

    const { baseDefaultValues } = useDefaultValues({ names, hasGerritGitServer });

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseKubeObjectInterface>>(baseDefaultValues);

    const [codebaseAuthData, setCodebaseAuthData] = React.useState<CodebaseAuthData>({
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
        watch,
    } = methods;

    const typeFieldValue = watch(names.type.name);

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

    const { editorReturnValues } = useEditorCode({ names, formValues, type: typeFieldValue });

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
    }, [activeTabFormPartName, activeTabIdx, trigger]);

    useUpdateFieldsDependingOnCodebaseType({
        watch,
        names,
        setValue,
        resetField,
        handleFormFieldChange,
        hasGerritGitServer,
    });

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
                    label={`${capitalizeFirstLetter(typeFieldValue)} info`}
                    {...a11yProps(TAB_INDEXES[FORM_PART_CODEBASE_TYPE_INFO])}
                />
                <Tab
                    label="Advanced settings"
                    {...a11yProps(TAB_INDEXES[FORM_PART_ADVANCED_SETTINGS])}
                />
            </Tabs>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit, handleValidationError)}>
                    <FormDataContext.Provider
                        value={{ formValues, names, handleFormFieldChange, setType }}
                    >
                        <div className={classes.formInner}>
                            <TabPanel
                                value={activeTabIdx}
                                index={TAB_INDEXES[FORM_PART_CODEBASE_INFO]}
                                className={classes.tabPanel}
                            >
                                <div className={classes.tabPanelInner}>
                                    <GitServersDataContext.Provider value={gitServers}>
                                        <CodebaseInfo />
                                    </GitServersDataContext.Provider>
                                </div>
                            </TabPanel>
                            <TabPanel
                                value={activeTabIdx}
                                index={TAB_INDEXES[FORM_PART_CODEBASE_TYPE_INFO]}
                                className={classes.tabPanel}
                            >
                                <div className={classes.tabPanelInner}>
                                    <CodebaseTypeInfo />
                                </div>
                            </TabPanel>
                            <TabPanel
                                value={activeTabIdx}
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

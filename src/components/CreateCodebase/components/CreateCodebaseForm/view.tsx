import type { DialogProps } from '@material-ui/core/Dialog';
import hasLodash from 'lodash.has';
import { FormProvider, useForm } from 'react-hook-form';
import { creationStrategies } from '../../../../configs/creationStrategies';
import { createApplicationExample } from '../../../../configs/kube-examples/edp-application';
import { createAutotestExample } from '../../../../configs/kube-examples/edp-autotest';
import { createLibraryExample } from '../../../../configs/kube-examples/edp-library';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { MuiCore, pluginLib, React } from '../../../../plugin.globals';
import { DeepPartial } from '../../../../types/global';
import { capitalizeFirstLetter } from '../../../../utils/format/capitalizeFirstLetter';
import { Render } from '../../../Render';
import {
    BACKWARDS_NAME_MAPPING,
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
    FORM_PART_ADVANCED_SETTINGS,
    FORM_PART_CODEBASE_INFO,
    FORM_PART_CODEBASE_TYPE_INFO,
} from '../../constants';
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
import { APPLICATION_NAMES, AUTOTEST_NAMES, LIBRARY_NAMES, TAB_INDEXES } from './constants';
import { useStyles } from './styles';
import { CreateCodebasenFormProps } from './types';

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

export const CreateCodebaseForm = ({
    type,
    editorOpen,
    setEditorOpen,
    handleApply,
    setDialogOpen,
}: CreateCodebasenFormProps): React.ReactElement => {
    const classes = useStyles();

    const [activeTabIdx, setActiveTabIdx] = React.useState<string>(
        TAB_INDEXES[FORM_PART_CODEBASE_INFO]
    );

    const names = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return APPLICATION_NAMES;
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return LIBRARY_NAMES;
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return AUTOTEST_NAMES;
        }
    }, [type]);

    const baseDefaultValues = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return {
                [names.strategy.name]: creationStrategies.create.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
                [names.emptyProject.name]: false,
            };
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return {
                [names.strategy.name]: creationStrategies.create.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
                [names.emptyProject.name]: false,
            };
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return {
                [names.strategy.name]: creationStrategies.clone.value,
                [names.gitServer.name]: 'gerrit',
                [names.ciTool.name]: 'jenkins',
            };
        }
    }, [names, type]);

    const [formValues, setFormValues] =
        React.useState<DeepPartial<EDPCodebaseKubeObjectInterface>>(baseDefaultValues);

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
        ({ target: { name, value } }) => {
            setFormValues(prev => {
                if ('notUsedInFormData' in names[name]) {
                    return prev;
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

    const handleEditorSave = React.useCallback(
        editorPropsObject => {
            /*
            This is the example of values we get on editorSave

                {
                    "apiVersion": "v2.edp.epam.com/v1",
                    "kind": "Codebase",
                    "spec": {
                        "type": "application",
                        "versioning": {
                            "type": "default"
                        },
                    },
                    "metadata": {
                        "name": "app-test",
                        "namespace": "edp-delivery-vp-delivery-dev"
                    }
                }

            The value objects like versioning have to be mapped to form names in order to setValues in form state and so on
            for example value object versioning: {type: 'default'} have to be mapped to versioningType form name value


             */
            for (const editorPropsObjectKey in editorPropsObject) {
                if (editorPropsObjectKey === 'spec' || editorPropsObjectKey === 'metadata') {
                    // we don't have to handle any other values except spec and metadata for now
                    const editorRootProp = editorPropsObject[editorPropsObjectKey]; // spec or metadata object
                    for (const editorRootPropKey in editorRootProp) {
                        if (editorRootPropKey in BACKWARDS_NAME_MAPPING) {
                            // if spec prop is a complex object like versioning that has children i.e. type, startFrom
                            const complexNameObject = BACKWARDS_NAME_MAPPING[editorRootPropKey];
                            const complexObject = editorRootProp[editorRootPropKey];

                            for (const complexObjectKey in complexObject) {
                                //loop through complex object mapping to setValue based on children name
                                if (complexObjectKey in complexNameObject.children) {
                                    const { formItemName } =
                                        complexNameObject.children[complexObjectKey];

                                    setValue(
                                        names[formItemName].name,
                                        complexObject[complexObjectKey]
                                    );
                                    handleFormFieldChange({
                                        target: {
                                            name: names[formItemName].name,
                                            value: complexObject[complexObjectKey],
                                        },
                                    });
                                }
                            }
                        } else {
                            // for simple flat values
                            setValue(
                                names[editorRootPropKey].name,
                                editorRootProp[editorRootPropKey]
                            );
                            handleFormFieldChange({
                                target: {
                                    name: names[editorRootPropKey].name,
                                    value: editorRootProp[editorRootPropKey],
                                },
                            });
                        }
                    }
                }
            }
            /*
                Deletion process

                When comparing formValues from state and the values we get on editorSave
                we check if formValue still exists in those values and if not we delete it from form state

            */
            for (const prop in formValues) {
                const propNameObjectPath = names[prop].path;
                if (!hasLodash(editorPropsObject, propNameObjectPath)) {
                    resetField(names[prop].name);
                    const propTargetObject = {
                        target: {
                            name: names[prop].name,
                            value: undefined,
                        },
                    };
                    handleFormFieldChange(propTargetObject);
                }
            }
            setEditorOpen(false);
        },
        [formValues, handleFormFieldChange, names, resetField, setEditorOpen, setValue]
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

    const editorDialogCode = React.useMemo(() => {
        if (type === CODEBASE_TYPE_APPLICATION) {
            return createApplicationExample(names, formValues);
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return createLibraryExample(names, formValues);
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return createAutotestExample(names, formValues);
        }
    }, [formValues, names, type]);

    const onSubmit = React.useCallback(() => {
        handleApply(editorDialogCode);
    }, [editorDialogCode, handleApply]);

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
                                <Render condition={type === CODEBASE_TYPE_APPLICATION}>
                                    <ApplicationCodebaseInfoFormPart
                                        type={type}
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_LIBRARY}>
                                    <LibraryCodebaseInfoFormPart
                                        type={type}
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_AUTOTEST}>
                                    <AutotestCodebaseInfoFormPart
                                        type={type}
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                            </div>
                        </TabPanel>
                        <TabPanel
                            value={activeTabIdx}
                            index={TAB_INDEXES[FORM_PART_CODEBASE_TYPE_INFO]}
                            className={classes.tabPanel}
                        >
                            <div className={classes.tabPanelInner}>
                                <Render condition={type === CODEBASE_TYPE_APPLICATION}>
                                    <ApplicationCodebaseTypeInfoFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        type={type}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_LIBRARY}>
                                    <LibraryCodebaseTypeInfoFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                        type={type}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_AUTOTEST}>
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
                                <Render condition={type === CODEBASE_TYPE_APPLICATION}>
                                    <ApplicationAdvancedSettingsFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_LIBRARY}>
                                    <LibraryAdvancedSettingsFormPart
                                        names={names}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                </Render>
                                <Render condition={type === CODEBASE_TYPE_AUTOTEST}>
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
                                onClick={() => setActiveTabIdx(activeTabIdx + 1)}
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
                    item={editorDialogCode}
                    onClose={() => setEditorOpen(false)}
                    onSave={handleEditorSave}
                />
            </Render>
        </FormProvider>
    );
};

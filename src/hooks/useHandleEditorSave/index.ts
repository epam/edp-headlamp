import hasLodash from 'lodash.has';
import { FieldValues } from 'react-hook-form';
import { React } from '../../plugin.globals';
import { KubeObjectInterface } from '../../plugin.types';
import { BackwardNameMappingChildren, FieldEventTarget, FormNameObject } from '../../types/forms';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

interface useHandleEditorSaveProps {
    names: { [key: string]: FormNameObject };
    backwardNames?: {};
    setValue: (name: string, value: any) => void;
    handleFormFieldChange: ({ name, value }: FieldEventTarget) => void;
    formValues: {
        [key: string]: any;
    };
    resetField: (name: string) => void;
}

export const useHandleEditorSave = ({
    names,
    backwardNames = {},
    setValue,
    handleFormFieldChange,
    formValues,
    resetField,
}: useHandleEditorSaveProps): {
    handleEditorSave: (editorPropsObject: DeepPartial<EDPKubeObjectInterface>) => void;
} => {
    const setFormStateFieldValue = React.useCallback(
        (name: string, value: any): void => {
            setValue(name, value);
            handleFormFieldChange({
                name: name,
                value: value,
            });
        },
        [handleFormFieldChange, setValue]
    );

    const cleanFormStateFromUnusedProps = React.useCallback(
        editorPropsObject => {
            for (const formValueKey of Object.keys(formValues)) {
                const propNameObjectPath = names[formValueKey].path;

                if (hasLodash(editorPropsObject, propNameObjectPath)) {
                    continue;
                }

                resetField(names[formValueKey].name);
                handleFormFieldChange({
                    name: names[formValueKey].name,
                    value: undefined,
                });
            }
        },
        [formValues, handleFormFieldChange, names, resetField]
    );

    const recursiveSetFieldValueBasedOnBackwardsMappingName = React.useCallback(
        (children: BackwardNameMappingChildren, value: any): void => {
            if (Object.hasOwn(children, 'formItemName')) {
                setFormStateFieldValue(names[children['formItemName']].name, value);
            }

            if (Object.hasOwn(children, 'children')) {
                for (const [childKey, childValue] of Object.entries(children.children)) {
                    recursiveSetFieldValueBasedOnBackwardsMappingName(childValue, value[childKey]);
                }
            }
        },
        [names, setFormStateFieldValue]
    );

    const handleEditorSave = React.useCallback(
        (editorResultValues: EDPKubeObjectInterface[]) => {
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

            // we need to process only spec and metadata since createInstance function already has apiVersion and kind in its config
            const [editorResultValue] = editorResultValues;
            const { spec, metadata } = editorResultValue;
            const specAndMetadata = { ...spec, ...metadata };

            // we don't have to handle any other values except spec and metadata for now
            for (const [editorRootPropKey, editorRootPropValue] of Object.entries(
                specAndMetadata
            )) {
                if (Object.hasOwn(backwardNames, editorRootPropKey)) {
                    const backwardNamesObject = backwardNames[editorRootPropKey];

                    recursiveSetFieldValueBasedOnBackwardsMappingName(
                        backwardNamesObject,
                        editorRootPropValue
                    );
                } else {
                    // for simple flat values or arrays
                    setFormStateFieldValue(names[editorRootPropKey].name, editorRootPropValue);
                }
            }
            /*
				Deletion process

				When comparing formValues from state and the values we get on editorSave
				we check if formValue still exists in those values and if not we delete it from form state

			*/
            cleanFormStateFromUnusedProps(editorResultValue);
        },
        [
            backwardNames,
            cleanFormStateFromUnusedProps,
            names,
            recursiveSetFieldValueBasedOnBackwardsMappingName,
            setFormStateFieldValue,
        ]
    );

    return { handleEditorSave };
};

interface useHandleEditorSavePropsNew {
    names: { [key: string]: FormNameObject };
    backwardNames?: {};
    setValue: (name: string, value: any) => void;
    resetField: (name: string) => void;
}

export const useHandleEditorSaveNew = ({
    names,
    backwardNames = {},
    setValue,
    resetField,
}: useHandleEditorSavePropsNew) => {
    const cleanFormStateFromUnusedProps = React.useCallback(
        (editorPropsObject: KubeObjectInterface, formValues: FieldValues) => {
            for (const formValueKey of Object.keys(formValues)) {
                const propNameObjectPath = names[formValueKey].path;

                if (hasLodash(editorPropsObject, propNameObjectPath)) {
                    continue;
                }

                resetField(names[formValueKey].name);
            }
        },
        [names, resetField]
    );

    const recursiveSetFieldValueBasedOnBackwardsMappingName = React.useCallback(
        (children: BackwardNameMappingChildren, value: any): void => {
            if (Object.hasOwn(children, 'formItemName')) {
                setValue(names[children['formItemName']].name, value);
            }

            if (Object.hasOwn(children, 'children')) {
                for (const [childKey, childValue] of Object.entries(children.children)) {
                    recursiveSetFieldValueBasedOnBackwardsMappingName(childValue, value[childKey]);
                }
            }
        },
        [names, setValue]
    );

    const handleEditorSave = React.useCallback(
        (editorResultValues: KubeObjectInterface[], formValues: FieldValues) => {
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

            // we need to process only spec and metadata since createInstance function already has apiVersion and kind in its config
            const [editorResultValue] = editorResultValues;
            const { spec, metadata } = editorResultValue;
            const specAndMetadata = { ...spec, ...metadata };

            // we don't have to handle any other values except spec and metadata for now
            for (const [editorRootPropKey, editorRootPropValue] of Object.entries(
                specAndMetadata
            )) {
                if (!Object.hasOwn(names, editorRootPropKey)) {
                    continue;
                }

                if (Object.hasOwn(backwardNames, editorRootPropKey)) {
                    const backwardNamesObject = backwardNames[editorRootPropKey];

                    recursiveSetFieldValueBasedOnBackwardsMappingName(
                        backwardNamesObject,
                        editorRootPropValue
                    );
                } else {
                    // for simple flat values or arrays
                    setValue(names[editorRootPropKey].name, editorRootPropValue);
                }
            }
            /*
				Deletion process

				When comparing formValues from state and the values we get on editorSave
				we check if formValue still exists in those values and if not we delete it from form state

			*/
            cleanFormStateFromUnusedProps(editorResultValue, formValues);
        },
        [
            backwardNames,
            cleanFormStateFromUnusedProps,
            names,
            recursiveSetFieldValueBasedOnBackwardsMappingName,
            setValue,
        ]
    );

    return { handleEditorSave };
};

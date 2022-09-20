import hasLodash from 'lodash.has';
import { React } from '../../plugin.globals';
import { FieldEventTarget, FormNameObject } from '../../types/forms';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

interface UseHandleEditorSaveProps {
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
}: UseHandleEditorSaveProps): {
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

    const handleEditorSave = React.useCallback(
        (editorPropsObject: DeepPartial<EDPKubeObjectInterface>) => {
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

            // we need to process only spec and metadata as createInstance function already has apiVersion and kind in its config
            const { spec, metadata } = editorPropsObject;
            const specAndMetadata = { ...spec, ...metadata };

            // we don't have to handle any other values except spec and metadata for now
            for (const [editorRootPropKey, editorRootPropValue] of Object.entries(
                specAndMetadata
            )) {
                if (!Object.hasOwn(backwardNames, editorRootPropKey)) {
                    // for simple flat values or arrays
                    setFormStateFieldValue(names[editorRootPropKey].name, editorRootPropValue);

                    continue;
                }

                const backwardNamesObject = backwardNames[editorRootPropKey];
                for (const [complexObjectKey, complexObjectValue] of Object.entries(
                    editorRootPropValue
                )) {
                    const { children } = backwardNamesObject;

                    if (isPlainObject(complexObjectValue)) {
                        for (const [
                            complexObjectValueKey,
                            complexObjectValueValue,
                        ] of Object.entries(complexObjectValue)) {
                            const { formItemName } =
                                children[complexObjectKey].children[complexObjectValueKey];
                            setFormStateFieldValue(
                                names[formItemName].name,
                                complexObjectValueValue
                            );
                        }

                        continue;
                    }

                    // loop through complex object mapping to setValue based on children name
                    if (Object.hasOwn(children, complexObjectKey)) {
                        const complexObjectChild = children[complexObjectKey];

                        const { formItemName } = complexObjectChild;
                        setFormStateFieldValue(names[formItemName].name, complexObjectValue);
                    }
                }
            }
            /*
				Deletion process

				When comparing formValues from state and the values we get on editorSave
				we check if formValue still exists in those values and if not we delete it from form state

			*/
            cleanFormStateFromUnusedProps(editorPropsObject);
        },
        [backwardNames, cleanFormStateFromUnusedProps, names, setFormStateFieldValue]
    );

    return { handleEditorSave };
};

const isPlainObject = (obj: unknown): boolean => {
    return typeof obj === 'object' && !Array.isArray(obj);
};

import hasLodash from 'lodash.has';
import { React } from '../../plugin.globals';
import { FormNameObject } from '../../types/forms';
import { DeepPartial } from '../../types/global';
import { EDPKubeObjectInterface } from '../../types/k8s';

interface useHandleEditorSaveProps {
    names: { [key: string]: FormNameObject };
    backwardNames?: {};
    setValue: (name: string, value: any) => void;
    handleFormFieldChange: ({ target: { name, value } }) => void;
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
            for (const [editorPropsObjectKey, editorPropsObjectValue] of Object.entries(
                editorPropsObject
            )) {
                if (editorPropsObjectKey !== 'spec' && editorPropsObjectKey !== 'metadata') {
                    continue;
                }

                // we don't have to handle any other values except spec and metadata for now
                for (const [editorRootPropKey, editorRootPropValue] of Object.entries(
                    editorPropsObjectValue
                )) {
                    if (Object.hasOwn(backwardNames, editorRootPropKey)) {
                        // if spec prop is a complex object like versioning that has children i.e. type, startFrom
                        const complexNameObject = backwardNames[editorRootPropKey];

                        for (const [complexObjectKey, complexObjectValue] of Object.entries(
                            editorRootPropValue
                        )) {
                            const { children } = complexNameObject;
                            //loop through complex object mapping to setValue based on children name
                            if (Object.hasOwn(children, complexObjectKey)) {
                                const { formItemName } = children[complexObjectKey];

                                setValue(names[formItemName].name, complexObjectValue);
                                handleFormFieldChange({
                                    target: {
                                        name: names[formItemName].name,
                                        value: complexObjectValue,
                                    },
                                });
                            }
                        }
                    } else {
                        // for simple flat values
                        setValue(names[editorRootPropKey].name, editorRootPropValue);
                        handleFormFieldChange({
                            target: {
                                name: names[editorRootPropKey].name,
                                value: editorRootPropValue,
                            },
                        });
                    }
                }
            }
            /*
				Deletion process

				When comparing formValues from state and the values we get on editorSave
				we check if formValue still exists in those values and if not we delete it from form state

			*/
            for (const formValueKey of Object.keys(formValues)) {
                const propNameObjectPath = names[formValueKey].path;

                if (hasLodash(editorPropsObject, propNameObjectPath)) {
                    continue;
                }

                resetField(names[formValueKey].name);
                const propTargetObject = {
                    target: {
                        name: names[formValueKey].name,
                        value: undefined,
                    },
                };
                handleFormFieldChange(propTargetObject);
            }
        },
        [backwardNames, formValues, handleFormFieldChange, names, resetField, setValue]
    );

    return { handleEditorSave };
};

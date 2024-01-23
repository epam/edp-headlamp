import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { has } from 'lodash';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import {
  BackwardNameMapping,
  BackwardNameMappingChildren,
  FormNameObject,
} from '../../types/forms';

interface useHandleEditorSaveProps {
  names: { [key: string]: FormNameObject };
  backwardNames?: BackwardNameMapping;
  setValue: (name: string, value: any, options?: any) => void;
  resetField: (name: string) => void;
}

export const useHandleEditorSave = ({
  names,
  backwardNames = {},
  setValue,
  resetField,
}: useHandleEditorSaveProps) => {
  const cleanFormStateFromUnusedProps = React.useCallback(
    (editorPropsObject: KubeObjectInterface, formValues: FieldValues) => {
      for (const formValueKey of Object.keys(formValues)) {
        const propNameObjectPath = names[formValueKey].path;

        if (has(editorPropsObject, propNameObjectPath)) {
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
      for (const [editorRootPropKey, editorRootPropValue] of Object.entries(specAndMetadata)) {
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

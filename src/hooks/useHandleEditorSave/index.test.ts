/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import {
  CODEBASE_BACKWARDS_NAME_MAPPING,
  CODEBASE_FORM_NAMES,
} from '../../widgets/dialogs/ManageCodebase/names';
import {
  CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING,
  CODEBASE_BRANCH_FORM_NAMES,
} from '../../widgets/dialogs/ManageCodebaseBranch/names';
import { useHandleEditorSave } from './index';
import {
  applicationCloneStrategyEditorPropsObjectMock,
  applicationCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationCloneStrategyEditorPropsObject.mock';
import {
  applicationCreateStrategyEditorPropsObjectMock,
  applicationCreateStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationCreateStrategyEditorPropsObject.mock';
import {
  applicationImportStrategyEditorPropsObjectMock,
  applicationImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationImportStrategyEditorPropsObject.mock';
import {
  autotestCloneStrategyEditorPropsObjectMock,
  autotestCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/autotestCloneStrategyEditorPropsObject.mock';
import {
  autotestImportStrategyEditorPropsObjectMock,
  autotestImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/autotestImportStrategyEditorPropsObject.mock';
import {
  codebaseBranchEditorPropsObjectMock,
  codebaseBranchEditorPropsObjectMockExpectedOutput,
} from './mocks/codebaseBranchEditorPropsObject.mock';
import {
  libraryCloneStrategyEditorPropsObjectMock,
  libraryCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryCloneStrategyEditorPropsObject.mock';
import {
  libraryCreateStrategyEditorPropsObjectMock,
  libraryCreateStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryCreateStrategyEditorPropsObject.mock';
import {
  libraryImportStrategyEditorPropsObjectMock,
  libraryImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryImportStrategyEditorPropsObject.mock';

const executeMockState = () => {
  const formState = {}; // react-hook-form state
  const formValues = {}; // form&editor state

  const setValue = (name: string, value: any): void => {
    formState[name] = value;
    formValues[name] = value;
  };
  const resetField = (name: string): void => {
    formState[name] = undefined;
  };

  return {
    formState,
    formValues,
    setValue,
    resetField,
  };
};

describe('testing handleEditorSave function', () => {
  describe('APPLICATION CREATE STRATEGY', () => {
    it(`should result with similar values object as in react hook form state so on in formValues state`, () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      handleEditorSave(
        // @ts-ignore
        applicationCreateStrategyEditorPropsObjectMock,
        formValues
      );

      expect(formState).toMatchObject(applicationCreateStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(
        applicationCreateStrategyEditorPropsObjectMockExpectedOutput
      );
    });
  });
  describe('APPLICATION CLONE STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(applicationCloneStrategyEditorPropsObjectMock, formValues);
      expect(formState).toMatchObject(applicationCloneStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(applicationCloneStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('APPLICATION IMPORT STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(applicationImportStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(applicationImportStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(
        applicationImportStrategyEditorPropsObjectMockExpectedOutput
      );
    });
  });
  describe('LIBRARY CREATE STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(libraryCreateStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(libraryCreateStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(libraryCreateStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('LIBRARY CLONE STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(libraryCloneStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(libraryCloneStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(libraryCloneStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('LIBRARY IMPORT STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(libraryImportStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(libraryImportStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(libraryImportStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('AUTOTEST CLONE STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(autotestCloneStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(autotestCloneStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(autotestCloneStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('AUTOTEST IMPORT STRATEGY', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_FORM_NAMES,
          backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(autotestImportStrategyEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(autotestImportStrategyEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(autotestImportStrategyEditorPropsObjectMockExpectedOutput);
    });
  });
  describe('CODEBASE BRANCH', () => {
    it('should result with similar values object as in react hook form state so on in formValues state', () => {
      const { formState, formValues, setValue, resetField } = executeMockState();

      const {
        result: {
          current: { handleEditorSave },
        },
      } = renderHook(() =>
        useHandleEditorSave({
          names: CODEBASE_BRANCH_FORM_NAMES,
          backwardNames: CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING,
          setValue,
          resetField,
        })
      );

      // @ts-ignore
      handleEditorSave(codebaseBranchEditorPropsObjectMock, formValues);

      expect(formState).toMatchObject(codebaseBranchEditorPropsObjectMockExpectedOutput);

      expect(formValues).toMatchObject(codebaseBranchEditorPropsObjectMockExpectedOutput);
    });
  });
});

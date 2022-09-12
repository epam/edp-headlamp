/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import {
    APPLICATION_NAMES,
    AUTOTEST_NAMES,
    CODEBASE_BACKWARDS_NAME_MAPPING,
    LIBRARY_NAMES,
} from '../../components/CreateCodebase/components/CreateCodebaseForm/names';
import {
    CODEBASE_BRANCH_BACKWARDS_NAME_MAPPING,
    CODEBASE_BRANCH_NAMES,
} from '../../components/CreateCodebaseBranch/components/CreateCodebaseBranchForm/names';
import { EDPCodebaseKubeObjectInterface } from '../../k8s/EDPCodebase/types';
import { FieldEventTarget } from '../../types/forms';
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
    const handleFormFieldChange = ({ name, value }: FieldEventTarget): void => {
        formValues[name] = value;
    };
    const setValue = (name: string, value: any): void => {
        formState[name] = value;
    };
    const resetField = (name: string): void => {
        formState[name] = undefined;
    };

    return {
        formState,
        formValues,
        handleFormFieldChange,
        setValue,
        resetField,
    };
};

describe('testing handleEditorSave function', () => {
    describe('APPLICATION CREATE STRATEGY', () => {
        it(`should result with similar values object as in react hook form state so on in formValues state`, () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: APPLICATION_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                applicationCreateStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );
            expect(formState).toMatchObject(
                applicationCreateStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                applicationCreateStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('APPLICATION CLONE STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: APPLICATION_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                applicationCloneStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );
            expect(formState).toMatchObject(
                applicationCloneStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                applicationCloneStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('APPLICATION IMPORT STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: APPLICATION_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                applicationImportStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                applicationImportStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                applicationImportStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('LIBRARY CREATE STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: LIBRARY_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                libraryCreateStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                libraryCreateStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                libraryCreateStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('LIBRARY CLONE STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: LIBRARY_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                libraryCloneStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                libraryCloneStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                libraryCloneStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('LIBRARY IMPORT STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: LIBRARY_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                libraryImportStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                libraryImportStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                libraryImportStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('AUTOTEST CLONE STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: AUTOTEST_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                autotestCloneStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                autotestCloneStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                autotestCloneStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('AUTOTEST IMPORT STRATEGY', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: AUTOTEST_NAMES,
                    backwardNames: CODEBASE_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(
                autotestImportStrategyEditorPropsObjectMock as EDPCodebaseKubeObjectInterface
            );

            expect(formState).toMatchObject(
                autotestImportStrategyEditorPropsObjectMockExpectedOutput
            );

            expect(formValues).toMatchObject(
                autotestImportStrategyEditorPropsObjectMockExpectedOutput
            );
        });
    });
    describe('CODEBASE BRANCH', () => {
        it('should result with similar values object as in react hook form state so on in formValues state', () => {
            const { formState, formValues, handleFormFieldChange, setValue, resetField } =
                executeMockState();

            const {
                result: {
                    current: { handleEditorSave },
                },
            } = renderHook(() =>
                useHandleEditorSave({
                    names: CODEBASE_BRANCH_NAMES,
                    backwardNames: CODEBASE_BRANCH_BACKWARDS_NAME_MAPPING,
                    setValue,
                    handleFormFieldChange,
                    formValues,
                    resetField,
                })
            );

            handleEditorSave(codebaseBranchEditorPropsObjectMock as EDPCodebaseKubeObjectInterface);

            expect(formState).toMatchObject(codebaseBranchEditorPropsObjectMockExpectedOutput);

            expect(formValues).toMatchObject(codebaseBranchEditorPropsObjectMockExpectedOutput);
        });
    });
});

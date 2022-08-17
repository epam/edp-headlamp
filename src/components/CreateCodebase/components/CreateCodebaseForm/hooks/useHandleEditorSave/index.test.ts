/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react-hooks';
import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';
import { APPLICATION_NAMES, AUTOTEST_NAMES, LIBRARY_NAMES } from '../../constants';
import { useHandleEditorSave } from './index';
import {
    applicationCloneStrategyEditorPropsObjectMock,
    applicationCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationCloneStrategyEditorPropsObjectMock';
import {
    applicationCreateStrategyEditorPropsObjectMock,
    applicationCreateStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationCreateStrategyEditorPropsObjectMock';
import {
    applicationImportStrategyEditorPropsObjectMock,
    applicationImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/applicationImportStrategyEditorPropsObjectMock';
import {
    autotestCloneStrategyEditorPropsObjectMock,
    autotestCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/autotestCloneStrategyEditorPropsObjectMock';
import {
    autotestImportStrategyEditorPropsObjectMock,
    autotestImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/autotestImportStrategyEditorPropsObjectMock';
import {
    libraryCloneStrategyEditorPropsObjectMock,
    libraryCloneStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryCloneStrategyEditorPropsObjectMock';
import {
    libraryCreateStrategyEditorPropsObjectMock,
    libraryCreateStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryCreateStrategyEditorPropsObjectMock';
import {
    libraryImportStrategyEditorPropsObjectMock,
    libraryImportStrategyEditorPropsObjectMockExpectedOutput,
} from './mocks/libraryImportStrategyEditorPropsObjectMock';

const executeMockState = () => {
    const formState = {}; // react-hook-form state
    const formValues = {}; // form&editor state
    const handleFormFieldChange = ({ target: { name, value } }): void => {
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
});

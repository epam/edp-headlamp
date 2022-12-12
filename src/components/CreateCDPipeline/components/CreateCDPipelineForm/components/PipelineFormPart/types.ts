import { FieldEventTarget, FormNameObject } from '../../../../../../types/forms';

export interface PipelineInfoFormPartProps {
    names: {
        [key: string]: FormNameObject;
    };
    handleFormFieldChange(eventTarget: FieldEventTarget): void;
    onPipelineNameChange: (pipelineNameFieldValue: string) => void;
}

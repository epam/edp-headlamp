import { CreationFormFieldInterface } from '../../../../types/forms';

export interface PipelineNameProps extends CreationFormFieldInterface {
    onPipelineNameChange: (pipelineNameFieldValue: string) => void;
}

import { FormNameObject } from '../../../../types/forms';

export const CDPIPELINE_STAGE_NAME_TRIGGER_TYPE: FormNameObject = {
    name: 'triggerType',
    path: ['spec', 'triggerType'],
};

export const CDPIPELINE_STAGE_EDIT_FORM_NAMES: { [key: string]: FormNameObject } = {
    triggerType: CDPIPELINE_STAGE_NAME_TRIGGER_TYPE,
};

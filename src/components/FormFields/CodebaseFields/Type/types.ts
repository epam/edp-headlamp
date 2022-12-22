import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { React } from '../../../../plugin.globals';
import { CreationFormFieldInterface } from '../../../../types/forms';

export interface TypeProps extends CreationFormFieldInterface {
    setType: React.Dispatch<React.SetStateAction<CODEBASE_TYPES>>;
}

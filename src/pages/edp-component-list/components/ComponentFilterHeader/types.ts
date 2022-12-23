import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { React } from '../../../../plugin.globals';

export interface ComponentFilterHeaderProps {
    setType: React.Dispatch<React.SetStateAction<CODEBASE_TYPES>>;
    defaultValues: {
        [key: string]: any;
    };
}

import { CreationFormFieldInterface } from '../../../../types/forms';

export interface ApplicationsProps extends CreationFormFieldInterface {}

export interface Application {
    label: string;
    value: string;
    availableBranches: string[];
    isUsed: boolean;
    chosenBranch: string;
    toPromote: boolean;
}

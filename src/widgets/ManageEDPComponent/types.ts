import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { FormValues } from '../../types/forms';
import { EDP_COMPONENT_FORM_NAMES } from './names';

export interface ManageEDPComponentDataContext {
    currentElement: EDPComponentKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageEDPComponentProps {
    formData: ManageEDPComponentDataContext;
}

export type ManageEDPComponentValues = FormValues<typeof EDP_COMPONENT_FORM_NAMES>;

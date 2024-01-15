import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { EDP_COMPONENT_FORM_NAMES } from './names';

export interface EditEDPComponentFormProps {
    EDPComponent: EDPComponentKubeObjectInterface;
}

export interface ManageEDPComponentDialogForwardedProps {
    EDPComponent?: EDPComponentKubeObjectInterface;
    mode: ValueOf<typeof FORM_MODES>;
    handleApply?: ({
        EDPComponentData,
    }: {
        EDPComponentData: EDPComponentKubeObjectInterface;
    }) => void;
}

export type ManageEDPComponentValues = FormValues<typeof EDP_COMPONENT_FORM_NAMES>;

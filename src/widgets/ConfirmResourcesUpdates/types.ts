import { CRUD_TYPES } from '../../constants/crudTypes';

export interface ResourceToUpdate {
    actionType: CRUD_TYPES;
    kind: string;
    name: string;
}

export interface ConfirmResourcesUpdatesDialogForwardedProps {
    deleteCallback: (...any) => Promise<void>;
    text?: string;
    resourcesArray: ResourceToUpdate[];
}

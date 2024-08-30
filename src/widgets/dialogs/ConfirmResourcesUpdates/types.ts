import { CRUD_TYPES } from '../../../constants/crudTypes';
import { DialogProps } from '../../../providers/Dialog/types';

export interface ResourceToUpdate {
  actionType: CRUD_TYPES;
  kind: string;
  name: string;
}

export interface ConfirmResourcesUpdatesDialogProps
  extends DialogProps<{
    deleteCallback: (...any) => void;
    text?: string;
    resourcesArray: ResourceToUpdate[];
  }> {}

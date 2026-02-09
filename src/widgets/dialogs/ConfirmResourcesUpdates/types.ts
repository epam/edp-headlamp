import { CRUDType } from '../../../constants/crudTypes';
import { DialogProps } from '../../../providers/Dialog/types';

export interface ResourceToUpdate {
  actionType: CRUDType;
  kind: string;
  name: string;
}

export interface ConfirmResourcesUpdatesDialogProps
  extends DialogProps<{
    deleteCallback: () => void;
    text?: string;
    resourcesArray: ResourceToUpdate[];
  }> {}

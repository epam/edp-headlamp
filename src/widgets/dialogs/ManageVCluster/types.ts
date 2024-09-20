import { DialogProps } from '../../../providers/Dialog/types';
import { FormValues } from '../../../types/forms';
import { V_CLUSTER_FORM_NAMES } from './names';

export interface ManageVClusterDialogProps extends DialogProps<{}> {}

export type ManageVClusterFormValues = FormValues<typeof V_CLUSTER_FORM_NAMES>;

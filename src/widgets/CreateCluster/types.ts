import { FormValues } from '../../types/forms';
import { CLUSTER_CREATION_FORM_NAMES } from './names';

export type CreateClusterFormValues = FormValues<typeof CLUSTER_CREATION_FORM_NAMES>;

import { CreationFormFieldInterface, FormData, FormNameKeys } from '../../types/forms';
import { CLUSTER_CREATION_FORM_NAMES } from './names';

export type CreateClusterFormNames = FormData<typeof CLUSTER_CREATION_FORM_NAMES>;
export type CreateClusterFormKeys = FormNameKeys<typeof CLUSTER_CREATION_FORM_NAMES>;
export type ClusterCreationFormFieldInterface = CreationFormFieldInterface<
    typeof CLUSTER_CREATION_FORM_NAMES
>;

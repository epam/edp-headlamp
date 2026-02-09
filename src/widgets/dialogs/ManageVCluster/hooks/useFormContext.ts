import { useFormContext } from 'react-hook-form';
import { ManageVClusterFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageVClusterFormValues>();

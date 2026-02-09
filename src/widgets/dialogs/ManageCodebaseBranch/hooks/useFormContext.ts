import { useFormContext } from 'react-hook-form';
import { ManageCodebaseBranchFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageCodebaseBranchFormValues>();

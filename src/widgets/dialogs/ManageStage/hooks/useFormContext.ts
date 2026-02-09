import { useFormContext } from 'react-hook-form';
import { ManageStageFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageStageFormValues>();

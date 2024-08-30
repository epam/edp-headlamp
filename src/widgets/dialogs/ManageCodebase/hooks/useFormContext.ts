import { useFormContext } from 'react-hook-form';
import { ManageCodebaseFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageCodebaseFormValues>();

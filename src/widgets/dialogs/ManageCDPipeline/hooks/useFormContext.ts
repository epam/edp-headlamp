import { useFormContext } from 'react-hook-form';
import { ManageCDPipelineFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageCDPipelineFormValues>();

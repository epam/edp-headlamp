import { useFormContext } from 'react-hook-form';
import { CreateCodebaseFromTemplateFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<CreateCodebaseFromTemplateFormValues>();

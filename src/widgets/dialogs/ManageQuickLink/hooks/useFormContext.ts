import { useFormContext } from 'react-hook-form';
import { ManageQuickLinkFormValues } from '../types';

export const useTypedFormContext = () => useFormContext<ManageQuickLinkFormValues>();

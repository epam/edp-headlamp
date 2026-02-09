import { useMultiFormContext } from '../../../providers/MultiForm/hooks';
import { FormNames } from '../types';

export const useFormsContext = () => useMultiFormContext<FormNames>();

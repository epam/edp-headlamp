import { useMultiFormContext } from '../../../providers/MultiForm/hooks';
import { FormNames } from '../types';

export const useGitServerFormsContext = () => useMultiFormContext<FormNames>();

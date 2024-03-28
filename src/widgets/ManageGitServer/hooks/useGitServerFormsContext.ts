import { useMultiFormContext } from '../../../providers/MultiForm/hooks';
import { FormName } from '../types';

export const useGitServerFormsContext = () => useMultiFormContext<FormName>();

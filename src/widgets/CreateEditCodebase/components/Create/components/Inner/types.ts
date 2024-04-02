import { ValueOf } from '../../../../../../types/global';
import { MAIN_TABS } from '../../../../constants';
import { CreateCodebaseFormValues } from '../../types';

export interface ConfigurationProps {
  setActiveTab: React.Dispatch<React.SetStateAction<ValueOf<typeof MAIN_TABS>>>;
  baseDefaultValues: Partial<CreateCodebaseFormValues>;
}

import { ValueOf } from '../../../../../../../types/global';
import { MAIN_TABS } from '../../../../constants';

export interface SelectionProps {
  setActiveTab: React.Dispatch<React.SetStateAction<ValueOf<typeof MAIN_TABS>>>;
}

import { ControlKey, ControlValue, DefaultControlKeys } from '../../types';

export interface FilterProps<ExtraControlsKeys extends string = DefaultControlKeys> {
  controls: Record<ControlKey<ExtraControlsKeys>, ControlValue>;
  hideFilter?: boolean;
}

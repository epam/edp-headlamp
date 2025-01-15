import { ControlValue } from '../../types';

export interface FilterProps<ControlNames extends string> {
  controls: {
    [key in ControlNames]?: ControlValue;
  };
  hideFilter?: boolean;
}

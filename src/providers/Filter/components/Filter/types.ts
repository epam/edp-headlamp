import { ControlValue } from '../../types';

export type FilterControls<ControlNames extends string> = {
  [key in ControlNames]?: ControlValue;
};

export interface FilterProps<ControlNames extends string> {
  controls: {
    [key in ControlNames]?: ControlValue;
  };
  hideFilter?: boolean;
}

import { FORM_MODES } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';

export interface GitServerProps {
  mode: ValueOf<typeof FORM_MODES>;
}

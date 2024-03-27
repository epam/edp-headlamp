import { FORM_MODES, FormValues } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';
import { GIT_SERVER_FORM_NAMES } from './names';

export type GitServerFormValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;

export interface GitServerFormProps {
  mode: ValueOf<typeof FORM_MODES>;
  formRef: React.MutableRefObject<HTMLFormElement>;
}

import { FormValues } from '../../types/forms';
import { GIT_SERVER_FORM_NAMES } from './names';

export type CreateGitServerFormValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;

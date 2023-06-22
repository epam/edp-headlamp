import { React } from '../../plugin.globals';
import { DialogContext } from './context';

export const useDialogContext = () => React.useContext(DialogContext);

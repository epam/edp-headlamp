import { React } from '../../plugin.globals';
import { ViewModeContext } from './context';

export const useViewModeContext = () => React.useContext(ViewModeContext);

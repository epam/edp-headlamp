import { React } from '../../../../plugin.globals';
import { EnrichedApplicationsContext } from './context';

export const useEnrichedApplicationsContext = () => React.useContext(EnrichedApplicationsContext);

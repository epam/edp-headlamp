import { withErrorBoundary } from '../../hocs/WithErrorBoundary';
import { withQueryClient } from '../../hocs/WithQueryClient';
import { PageView } from './view';

export default withQueryClient(withErrorBoundary(PageView));

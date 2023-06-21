import ErrorBoundary from '../../components/ErrorBoundary';
import { React } from '../../plugin.globals';

export const withErrorBoundary = WrappedComponent => props =>
    (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );

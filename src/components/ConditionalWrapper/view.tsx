import { React } from '../../plugin.globals';
import { ConditionalWrapperProps } from './types';

export const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
}: ConditionalWrapperProps): JSX.Element => {
    return <>{condition ? wrapper(children) : children}</>;
};

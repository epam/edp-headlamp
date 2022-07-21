import { React } from '../../plugin.globals';
import { ConditionalWrapperProps } from './types';

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
    condition,
    wrapper,
    children,
}): JSX.Element => {
    return <>{condition ? wrapper(children) : children}</>;
};

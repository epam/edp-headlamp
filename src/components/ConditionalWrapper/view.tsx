import { ConditionalWrapperProps } from './types';

const {
    pluginLib: { React },
} = globalThis;

export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
    condition,
    wrapper,
    children,
}): JSX.Element => {
    return <>{condition ? wrapper(children) : children}</>;
};

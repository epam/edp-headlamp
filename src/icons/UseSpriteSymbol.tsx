import { React } from '../plugin.globals';

interface UseSpriteSymbolProps {
    name: string;
    [key: string]: any;
}

export const UseSpriteSymbol = ({ name, ...props }: UseSpriteSymbolProps): React.ReactElement => {
    return (
        <span style={{ lineHeight: 0 }}>
            <svg {...props}>
                <use xlinkHref={`#${name}`} />
            </svg>
        </span>
    );
};

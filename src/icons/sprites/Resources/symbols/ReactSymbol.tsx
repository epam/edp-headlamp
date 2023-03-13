import { RESOURCES_ICON_MAPPING } from '../../../../configs/icon-mappings';
import { React } from '../../../../plugin.globals';

export const ReactSymbol = (): React.ReactElement => {
    return (
        <symbol
            id={RESOURCES_ICON_MAPPING.react}
            viewBox="-11.5 -12.13 23 24.25"
            xmlSpace="preserve"
        >
            <circle r="2.05" fill="#61dafb" />
            <g fill="none" stroke="#61dafb">
                <ellipse rx={11} ry="4.2" />
                <ellipse rx={11} ry="4.2" transform="rotate(60)" />
                <ellipse rx={11} ry="4.2" transform="rotate(120)" />
            </g>
        </symbol>
    );
};

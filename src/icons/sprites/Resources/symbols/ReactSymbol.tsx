import { React } from '../../../../plugin.globals';
import { RESOURCE_ICON_NAMES } from '../names';

export const ReactSymbol = () => {
    return (
        <symbol id={RESOURCE_ICON_NAMES.REACT} viewBox="-11.5 -12.13 23 24.25" xmlSpace="preserve">
            <circle r="2.05" fill="#61dafb" />
            <g fill="none" stroke="#61dafb">
                <ellipse rx={11} ry="4.2" />
                <ellipse rx={11} ry="4.2" transform="rotate(60)" />
                <ellipse rx={11} ry="4.2" transform="rotate(120)" />
            </g>
        </symbol>
    );
};

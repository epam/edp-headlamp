import React from 'react';

export const NoDataSvg = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 20" className={className}>
            <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stopOpacity=".1" stopColor="#EEE" />
                <stop offset="1" stopOpacity=".1" />
            </linearGradient>
            <mask id="m">
                <rect width="144" height="20" rx="3" fill="#FFF" />
            </mask>
            <g mask="url(#m)">
                <rect width="84" height="20" fill="#555" />
                <rect width="60" height="20" fill="#357abd" x="84" />
            </g>
            <g fill="#fff" textAnchor="start" fontFamily="sans-serif" fontSize="11">
                <text x="6" y="15" fill="#000" opacity="0.25">
                    dependencies
                </text>
                <text x="5" y="14">
                    dependencies
                </text>
                <text x="91" y="15" fill="#000" opacity="0.25">
                    no info
                </text>
                <text x="90" y="14">
                    no info
                </text>
            </g>
        </svg>
    );
};

import { RootState } from '@kinvolk/headlamp-plugin/lib/redux/stores/store';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Logo = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Layer_1"
            x={0}
            y={0}
            style={{
                display: 'block',
                enableBackground: 'new 0 0 1024 1024',
                width: '30px',
            }}
            viewBox="106.2 34.53 811.6 955.97"
            {...props}
        >
            <style>
                {
                    '.st0{fill:#fff}.st3{fill:none;stroke:#000;stroke-width:17;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
                }
            </style>
            <g id="XMLID_00000132079764758705948430000012857685154314153618_">
                <path d="m892.3 699.2.2.1c-49.2 163.5-201 282.6-380.5 282.6S180.8 862.8 131.5 699.4l.4-.1c19 50.4 67.8 86.3 124.8 86.3 73.7 0 133.4-59.7 133.4-133.4v-58h73v200.7c0 13.7 5.5 26 14.5 35s21.3 14.5 35 14.5c27.3 0 49.5-22.2 49.5-49.5V594.2h72v58c0 73.7 59.7 133.4 133.4 133.4 57.1-.1 105.8-35.9 124.8-86.4z" />
                <path
                    d="m655.2 422.8 26.4 24.6c20.1 18.8 31.5 45.1 31.5 72.6v19.2H597.3V368.7l57.9 54.1zm-18.1 116.6 13 54.8H544.5l14-54.8zm-39.8-63.8v63.6H426.7v-63.6H512zm-85.3 0h-85.3V162.9c0-7.8 1.8-15.4 5.2-22.4l25.3-51.2h109.5l25.3 51.2c3.4 7 5.2 14.6 5.2 22.4v312.7H512z"
                    className="st0"
                />
                <path
                    d="m555.2 65.8 11.6 23.4H457.3l11.6-23.4c20.6-30.6 65.6-30.6 86.3 0z"
                    style={{
                        fill: '#39c2d5',
                    }}
                />
                <path d="m466.2 539.4 13 54.8H373.6l14-54.8z" className="st0" />
                <linearGradient
                    id="SVGID_1_"
                    x1={511.998}
                    x2={511.998}
                    y1={186.653}
                    y2={839.857}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        offset={0}
                        style={{
                            stopColor: '#65c6be',
                        }}
                    />
                    <stop
                        offset={0.735}
                        style={{
                            stopColor: '#59c7d9',
                        }}
                    />
                </linearGradient>
                <path
                    d="M598.6 196.7h-1.3v172l57.9 54.1 26.4 24.6c20.1 18.8 31.5 45.1 31.5 72.6v19.1H310.9V520c0-27.5 11.4-53.8 31.5-72.6l26.4-24.6 57.9-54.1v-172l-7.2 1.3c-174.9 41.7-304.9 198.9-304.9 386.5 0 39.9 5.9 78.5 16.8 114.8l.4-.1c19 50.4 67.8 86.3 124.8 86.3 73.7 0 133.4-59.7 133.4-133.4v-58h-16.5l14-54.8h78.6l13 54.8H463v200.7c0 13.7 5.5 26.1 14.5 35 9 9 21.3 14.5 35 14.5 27.3 0 49.5-22.2 49.5-49.5V594.2h-17.7l14-54.8h78.6l13 54.8h-16v58c0 73.7 59.7 133.4 133.4 133.4 57.1 0 105.8-35.9 124.8-86.3l.2.1c10.9-36.3 16.8-74.9 16.8-114.8.3-189.8-132.7-348.4-310.5-387.9z"
                    style={{
                        fill: 'url(#SVGID_1_)',
                    }}
                />
                <path
                    d="m368.8 422.8 57.9-54.1v170.5H310.9V520c0-27.5 11.4-53.8 31.5-72.6l26.4-24.6z"
                    className="st0"
                />
                <path
                    d="M598.6 196.7c177.8 39.5 310.7 198.2 310.7 387.9 0 39.9-5.9 78.4-16.8 114.8C843.3 862.9 691.5 982 512 982S180.8 862.9 131.5 699.5c-11-36.3-16.8-74.9-16.8-114.8 0-187.6 130-344.9 304.9-386.5l7.2-1.3"
                    className="st3"
                />
                <path
                    d="M426.7 539.2H310.9V520c0-27.5 11.4-53.8 31.5-72.6l26.4-24.6 57.9-54.1m170.6 0V162.9c0-7.8-1.8-15.4-5.2-22.4l-25.3-51.2-11.6-23.4c-20.7-30.5-65.7-30.5-86.3 0l-11.6 23.4-25.3 51.2c-3.4 7-5.2 14.6-5.2 22.4v376.3h170.6m-170.7-63.6h170.6M512 266.8v208.8m-143.2-52.8v82"
                    className="st3"
                />
                <path
                    d="M597.3 539.2h115.8V520c0-27.5-11.4-53.8-31.5-72.6l-26.4-24.6-57.9-54.1v170.5zm57.9-116.4v82M464.9 187.2c0-26 21.1-47.1 47.1-47.1s47.1 21.1 47.1 47.1m-92.9 352.2 13 54.8H373.6l14-54.8zm170.9 0 13 54.8H544.5l14-54.8z"
                    className="st3"
                />
                <path
                    d="M131.9 699.2c19 50.4 67.8 86.3 124.8 86.3 73.7 0 133.4-59.7 133.4-133.4v-58m502.2 105.1c-19 50.4-67.7 86.3-124.8 86.3-73.7 0-133.4-59.7-133.4-133.4v-58m-72 .1v200.7c0 27.3-22.2 49.5-49.5 49.5-13.7 0-26.1-5.5-35-14.5-9-9-14.5-21.3-14.5-35V594.2m-5.8-505h109.4"
                    className="st3"
                />
            </g>
        </svg>
    );
};

export const LogoWithText = () => {
    const sidebar = useTypedSelector(state => state.ui.sidebar);
    const isSidebarOpen = sidebar.isSidebarOpen;

    return (
        <>
            {isSidebarOpen && (
                <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
                    <Grid item>
                        <Logo />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">EDP Portal</Typography>
                    </Grid>
                </Grid>
            )}
            {!isSidebarOpen && <Logo />}
        </>
    );
};

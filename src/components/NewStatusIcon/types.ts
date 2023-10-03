import React from 'react';

export interface StatusIconProps {
    Title: string | React.ReactElement;
    icon: string;
    color: string;
    isRotating?: boolean;
    width?: number;
}

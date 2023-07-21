import React from 'react';

export interface Breadcrumb {
    label: string | React.ReactElement;
    url?: {
        pathname: string;
        params?: { [key: string]: string };
    };
}

export interface PageWrapperProps {
    breadcrumbs?: Breadcrumb[];
    headerSlot?: React.ReactElement;
    breadcrumbsExtraContent?: React.ReactElement;
}

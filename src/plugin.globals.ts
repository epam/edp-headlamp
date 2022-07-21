import * as Iconify from '@iconify/react';
import { ApiProxy, k8s, Router, Utils } from '@kinvolk/headlamp-plugin/lib';
import * as CommonComponents from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import * as MuiCore from '@material-ui/core';
import * as Notistack from 'notistack';
import React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';

export const pluginLib = {
    ApiProxy,
    Cluster: k8s.cluster,
    Router,
    Utils,
    CommonComponents,
};

export { React, ReactRouter, ReactRedux, MuiCore, Iconify, Notistack };

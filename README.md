[![codecov](https://codecov.io/gh/epam/edp-headlamp/branch/master/graph/badge.svg?token=14I4A446VF)](https://codecov.io/gh/epam/edp-headlamp)

# EDP Admin Console v2.0

<p align="center">
    <em>Central management tool in the EDP ecosystem. Powered by <a href="https://github.com/kinvolk/headlamp">Headlamp</a>.</em>
    <a href="https://github.com/kinvolk/headlamp"><img width=384 src="docs/headlamp_light.svg"></a>
</p>
<p align="center">
    <img alt="Licence" src="https://img.shields.io/github/license/epam/edp-headlamp">
    <a href="https://codecov.io/gh/epam/edp-headlamp"><img alt="Coverage" src="https://codecov.io/gh/epam/edp-headlamp/branch/master/graph/badge.svg?token=14I4A446VF"></a>
</p>

| :heavy_exclamation_mark: Please refer to [EDP documentation](https://epam.github.io/edp-install/) to get the notion of the main concepts and guidelines. |
| --- |

## Overview

EDP Admin Console v2.0 is a new version of [EDP Admin Console](https://github.com/epam/edp-admin-console), built on the top of [Headlamp](https://github.com/kinvolk/headlamp). All EDP-specific functionality is written as Headlamp plugins.

https://user-images.githubusercontent.com/4813007/178267935-1a87d0dc-d015-4184-8109-d375030671d4.mp4

### Assets

<table>
    <tr>
        <td>
            <img alt="EDP overview page screenshot" src="docs/assets/headlamp_edp_overview_page.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="EDP CD pipelines page screenshot" src="docs/assets/headlamp_edp_cd_pipelines_page.png">
        </td>
        <td>
            <img alt="EDP applications page screenshot" src="docs/assets/headlamp_edp_applications_page.png">
        </td>
    </tr>
</table>

## Local Development

### Requirements

* [NodeJS LTS v16.16.0](https://nodejs.org) or higher.
* [Headlamp Desktop App v0.10](https://kinvolk.github.io/headlamp/docs/latest/installation/desktop) or higher.
* [`KUBECONFIG` environment variable](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig) is configured.

### Start Local Development

* Run the `npm run start` command.
* Open the Headlamp desktop application.

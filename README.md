[![codecov](https://codecov.io/gh/epam/edp-headlamp/branch/master/graph/badge.svg?token=14I4A446VF)](https://codecov.io/gh/epam/edp-headlamp)

# KubeRocketCI Portal

<p align="center">
    <em>Central management tool in the the KubeRocketCI (aka EDP) ecosystem. Powered by <a href="https://github.com/kinvolk/headlamp">Headlamp</a>.</em>
    <a href="https://github.com/kinvolk/headlamp"><img width=384 src="docs/headlamp_light.svg"></a>
</p>
<p align="center">
    <img alt="License" src="https://img.shields.io/github/license/epam/edp-headlamp">
    <a href="https://codecov.io/gh/epam/edp-headlamp"><img alt="Coverage" src="https://codecov.io/gh/epam/edp-headlamp/branch/master/graph/badge.svg?token=14I4A446VF"></a>
</p>

| :heavy_exclamation_mark: Please refer to [KubeRocketCI documentation](https://docs.kuberocketci.io) to get the notion of the main concepts and guidelines. |
| --- |

## Overview

KubeRocketCI Portal is  built on the top of [Headlamp](https://github.com/headlamp-k8s/headlamp). All the platform-specific functionality is written as Headlamp plugins.

<https://github-production-user-asset-6210df.s3.amazonaws.com/42180137/285478565-df7f5393-233f-40f2-8acc-b8b0d90cb687.mp4>

## Installation

In order to install the KubeRocketCI Headlamp, follow the steps below:

1. To add the Helm EPAMEDP Charts for local client, run "helm repo add":

     ```bash
     helm repo add epamedp https://epam.github.io/edp-helm-charts/stable
     ```

2. Choose available Helm chart version:

     ```bash
     helm search repo epamedp/edp-headlamp -l
     ```

   Example response:

     ```bash
     NAME                             CHART VERSION APP VERSION     DESCRIPTION
     epamedp/edp-headlamp             0.15.0         0.15.0       A Helm chart for KubeRocketCI Headlamp
     ```

    _**NOTE:** It is highly recommended to use the latest released version._

3. Full chart parameters available in [deploy-templates/README.md](deploy-templates/README.md).

4. Install edp-headlamp in the <edp-project> namespace with the helm command; find below the installation command example:

    ```bash
    helm install edp-headlamp epamedp/edp-headlamp --namespace <edp-project> --version <chart_version> --set name=edp-headlamp --set global.platform=<platform_type>
    ```

5. Check the <edp-project> namespace that should contain edp-headlamp deployment in a running status.

## Local Development

Development versions are also available, please refer to the [snapshot Helm Chart repository](https://epam.github.io/edp-helm-charts/snapshot/) page.

### Requirements

* [NodeJS LTS v16.16.0](https://nodejs.org) or higher.
* [Headlamp Desktop App v0.10](https://kinvolk.github.io/headlamp/docs/latest/installation/desktop) or higher.
* [`KUBECONFIG` environment variable](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig) is configured.

### Start Local Development

* Run the `npm run start` command.
* Open the Headlamp desktop application.

### Assets

For all assets please check the [docs/assets](docs/README.md) folder.

![Overview](docs/assets/overview.png)

## Pipelines

![Pipelines](docs/assets/pipelines.png)

## Pipeline Overview

![Pipeline Overview](docs/assets/pipeline_overview.png)

## Pipeline Details

![Pipeline Details](docs/assets/pipeline_details_3.png)

## Pipeline Diagram

![Pipeline Diagram](docs/assets/pipeline_diagram.png)

## Marketplace

![Marketplace](docs/assets/marketplace.png)

<details>
  <summary>More content!</summary>

## Components

![Components](docs/assets/components.png)

![Component Overview](docs/assets/component_overview.png)

## Deployment Flows

![Deployment Flow](docs/assets/deployment_flow.png)

## Environment Monitoring

![Environment Monitoring](docs/assets/environment_monitoring.png)

## Headlamp Features

![Headlamp features](docs/assets/headlamp.png)

## Application Create

![Application Create](docs/assets/application_create.png)

## Deployment Flow Create

![Deployment Flow Create](docs/assets/deployment_flow_create.png)
![Deployment Flow Create](docs/assets/deployment_flow_create_2.png)

</details>

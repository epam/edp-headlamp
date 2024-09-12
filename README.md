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

https://github-production-user-asset-6210df.s3.amazonaws.com/42180137/285478565-df7f5393-233f-40f2-8acc-b8b0d90cb687.mp4

### Assets

<table>
    <tr>
        <td>
            <img alt="Overview" src="docs/assets/overview.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipelines" src="docs/assets/pipelines.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipeline Overview" src="docs/assets/pipeline_overview.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipeline Details" src="docs/assets/pipeline_details.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipeline Details" src="docs/assets/pipeline_details_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipeline Details" src="docs/assets/pipeline_details_3.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Pipeline Diagram" src="docs/assets/pipeline_diagram.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Marketplace" src="docs/assets/marketplace.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Marketplace Use Template" src="docs/assets/marketplace_use_template.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Components" src="docs/assets/components.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Component Overview" src="docs/assets/component_overview.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Component Branches" src="docs/assets/component_branches.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Component Branches" src="docs/assets/component_branches_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Component Branches" src="docs/assets/component_branches_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Deployment Flows" src="docs/assets/deployment_flows.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Deployment Flow" src="docs/assets/deployment_flow.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Overview" src="docs/assets/environment_overview.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Applications" src="docs/assets/environment_applications.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Applications Deploy" src="docs/assets/environment_applications_deploy.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Applications Deploy" src="docs/assets/environment_applications_deploy_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Pipelines" src="docs/assets/environment_pipelines.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Pipelines" src="docs/assets/environment_pipelines_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Monitoring" src="docs/assets/environment_monitoring.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Links" src="docs/assets/links.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Tekton Pipelines" src="docs/assets/tekton_pipelines.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Tekton Tasks" src="docs/assets/tekton_tasks.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Nexus" src="docs/assets/nexus.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Registry" src="docs/assets/registry.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Clusters" src="docs/assets/clusters.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="GitOps" src="docs/assets/gitops.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Argo CD" src="docs/assets/argocd.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="DefectDojo" src="docs/assets/defectdojo.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="DefectDojo" src="docs/assets/defectdojo.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="DependencyTrack" src="docs/assets/deptrack.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="SonarQube" src="docs/assets/sonarqube.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="GitServers" src="docs/assets/gitservers.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Jira" src="docs/assets/jira.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Jira" src="docs/assets/jira.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Headlamp features" src="docs/assets/headlamp.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Application Create" src="docs/assets/application_create.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Application Create" src="docs/assets/application_create_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Application Create" src="docs/assets/application_create_3.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Application Create" src="docs/assets/application_create_4.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Deployment Flow Create" src="docs/assets/deployment_flow_create.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Deployment Flow Create" src="docs/assets/deployment_flow_create_2.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Create" src="docs/assets/environment_create.png">
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Environment Create" src="docs/assets/environment_create_2.png">
        </td>
    </tr>
</table>

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
     NAME                	            CHART VERSION	APP VERSION	    DESCRIPTION
     epamedp/edp-headlamp	            0.15.0        	0.15.0      	A Helm chart for KubeRocketCI Headlamp
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

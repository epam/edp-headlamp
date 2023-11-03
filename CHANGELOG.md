<a name="unreleased"></a>
## [Unreleased]

### Features

- Update GitServer create, edit forms ([#86](https://github.com/epam/edp-headlamp/issues/86))


<a name="v0.11.0"></a>
## [v0.11.0] - 2023-11-03
### Features

- Add link to deeptrack in codebase branch widget ([#92](https://github.com/epam/edp-headlamp/issues/92))
- Removes Namespace field from Stage Edit form ([#91](https://github.com/epam/edp-headlamp/issues/91))
- Improve pipeline diagram ([#89](https://github.com/epam/edp-headlamp/issues/89))
- Update links to docs ([#88](https://github.com/epam/edp-headlamp/issues/88))
- Add ability to delete cluster, add clusterName column into stage details  ([#82](https://github.com/epam/edp-headlamp/issues/82))
- Disable Cluster Name field for edit in cluster secret creation widget  ([#82](https://github.com/epam/edp-headlamp/issues/82))
- Hides pods column in applications table on stage page if stage.spec.clusterName is not in-cluster ([#83](https://github.com/epam/edp-headlamp/issues/83))
- Add show, hide button for password type text fields  ([#84](https://github.com/epam/edp-headlamp/issues/84))
- Make GitServer and Cluster forms editable ([#82](https://github.com/epam/edp-headlamp/issues/82))
- Add edit button into Namespace field in stage creation, fix registry owner references disabled state ([#75](https://github.com/epam/edp-headlamp/issues/75))
- Remove jenkins specific logic ([#80](https://github.com/epam/edp-headlamp/issues/80))
- Add deeptrack dependencies widget into codebaseBranch widget, disable build button if codebasebranch is not ready ([#78](https://github.com/epam/edp-headlamp/issues/78))
- Add ingress links column into Applications table on stage page ([#77](https://github.com/epam/edp-headlamp/issues/77))
- Add namespace field into stage create, update forms ([#75](https://github.com/epam/edp-headlamp/issues/75))
- Update registry page ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Enable overview list filter caching ([#74](https://github.com/epam/edp-headlamp/issues/74))
- Update registry configuration page ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Add taskrun links, add taskrun steps links, change graph edge routing  ([#66](https://github.com/epam/edp-headlamp/issues/66))
- Update PipelineRun diagram graph([#66](https://github.com/epam/edp-headlamp/issues/66))
- Add taskRun steps into PipelineRun diagram graph, add zoom-in, zoom-out, reset zoom buttons ([#66](https://github.com/epam/edp-headlamp/issues/66))
- Remove aside menu fixed positioning on configuration pages, fix sonar critical error ([#70](https://github.com/epam/edp-headlamp/issues/70))
- Update pages responsiveness, add links to nexus and sonar ([#70](https://github.com/epam/edp-headlamp/issues/70))
- Add EDPComponents links on overview page ([#69](https://github.com/epam/edp-headlamp/issues/69))
- Add ability to move, to zoom svg ([#68](https://github.com/epam/edp-headlamp/issues/68))
- Add PipelineRun tree diagram into PipelineRun overview list ([#68](https://github.com/epam/edp-headlamp/issues/68))
- Update Jira secret configuration form ([#67](https://github.com/epam/edp-headlamp/issues/67))
- Enrich overview graphs statuses ([#66](https://github.com/epam/edp-headlamp/issues/66))
- Add docker hub registry list into registry page configuration ([#64](https://github.com/epam/edp-headlamp/issues/64))
- Add resources graph into overview page ([#63](https://github.com/epam/edp-headlamp/issues/63))
- Add resources graph into overview page ([#60](https://github.com/epam/edp-headlamp/issues/60))
- Add SSO integration configuration page ([#57](https://github.com/epam/edp-headlamp/issues/57))

### Bug Fixes

- Fix build pipelinerun name creation ([#90](https://github.com/epam/edp-headlamp/issues/90))
- Removes disabled save button logic when git ops edit form is not touched ([#87](https://github.com/epam/edp-headlamp/issues/87))
- Change clone strategy credentials field type to password, fix resetting forms on submit ([#87](https://github.com/epam/edp-headlamp/issues/87))
- Fix resetting forms on submit on configuration pages, fix closing panels on edit ([#87](https://github.com/epam/edp-headlamp/issues/87))
- Fix codebase branch not creating ([#85](https://github.com/epam/edp-headlamp/issues/85))
- Fix codebasebranch release branch name, fix updating default branch version ([#85](https://github.com/epam/edp-headlamp/issues/85))
- Remove dotnet lang from application, library creation strategies ([#80](https://github.com/epam/edp-headlamp/issues/80))
- Fix use same account checkbox logic in registry manage form, fix registry endpoint for dockerhub ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Fix ecr registry secret update ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Fix dockerhub registry edp config map creation registryHost field value ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Fix overview table status filter ([#73](https://github.com/epam/edp-headlamp/issues/73))
- Fix sonar cognitive complexity criticals ([#20](https://github.com/epam/edp-headlamp/issues/20))
- Fix stages by cdpipelinename query ([#72](https://github.com/epam/edp-headlamp/issues/72))
- Fix crashes when date is not available, fix edp components query, fix codebase in progress status handling ([#66](https://github.com/epam/edp-headlamp/issues/66))
- Fix sonar cognitive complexity critical ([#67](https://github.com/epam/edp-headlamp/issues/67))
- Fix crash when there is no resource status, fix gitops list status handling ([#65](https://github.com/epam/edp-headlamp/issues/65))

### Code Refactoring

- Refactor codebase branch creation form logic, fix errors ([#85](https://github.com/epam/edp-headlamp/issues/85))
- Refactor resource status handling, fix isDockerHub definition ([#65](https://github.com/epam/edp-headlamp/issues/65))

### Routine

- Update headlamp version to 0.20.0 ([#62](https://github.com/epam/edp-headlamp/issues/62))
- Update current development version ([#61](https://github.com/epam/edp-headlamp/issues/61))

### Documentation

- Fix link to gitservers documentation([#63](https://github.com/epam/edp-headlamp/issues/63))


<a name="v0.10.0"></a>
## [v0.10.0] - 2023-09-28
### Features

- Update GitServer status handling ([#58](https://github.com/epam/edp-headlamp/issues/58))
- Update argo application resource creation ([#56](https://github.com/epam/edp-headlamp/issues/56))
- Add logs viewer and terminal into stage applications deploy table columns ([#55](https://github.com/epam/edp-headlamp/issues/55))

### Bug Fixes

- Fix terminal update ([#55](https://github.com/epam/edp-headlamp/issues/55))
- Fix git server status error ([#58](https://github.com/epam/edp-headlamp/issues/58))
- Fix onSuccess callback invoke when creating codebase with clone strategy ([#59](https://github.com/epam/edp-headlamp/issues/59))
- Add terminal, logviewer files into exclusions of sonar-project.properties ([#56](https://github.com/epam/edp-headlamp/issues/56))

### Routine

- Update current development version ([#54](https://github.com/epam/edp-headlamp/issues/54))


<a name="v0.9.0"></a>
## [v0.9.0] - 2023-09-21
### Features

- Make EDP-gitops repository unique per edp tenant ([#52](https://github.com/epam/edp-headlamp/issues/52))
- Add notification about unset namespaces ([#51](https://github.com/epam/edp-headlamp/issues/51))
- Align button size, remove button name ([#50](https://github.com/epam/edp-headlamp/issues/50))
- Add redirect link from marketplace to application and other bug fixes, micro features ([#48](https://github.com/epam/edp-headlamp/issues/48))
- Hide Create button for Component in case of git server do not exist ([#47](https://github.com/epam/edp-headlamp/issues/47))
- Add ECR Registry into registry configuration ([#46](https://github.com/epam/edp-headlamp/issues/46))
- Update Git Server status parsing field, update configuration item fields structure, add regexp for url field ([#44](https://github.com/epam/edp-headlamp/issues/44))
- Add git server status ([#44](https://github.com/epam/edp-headlamp/issues/44))
- Update git server provisioning ([#44](https://github.com/epam/edp-headlamp/issues/44))
- Refact configuration section ([#43](https://github.com/epam/edp-headlamp/issues/43))
- Align secrets fields in Platform UI configuration ([#42](https://github.com/epam/edp-headlamp/issues/42))
- Separates data into static,dynamic on stage,cdpipeline pages ([#40](https://github.com/epam/edp-headlamp/issues/40))
- Add EDP Components configuration page ([#39](https://github.com/epam/edp-headlamp/issues/39))
- Add link to values.yaml file from CD Stage in edp-gitops repo, optimize data flow on stage page ([#38](https://github.com/epam/edp-headlamp/issues/38))
- Add link to edp-gitops repo in GitOps configuration page ([#36](https://github.com/epam/edp-headlamp/issues/36))
- Add notifications on deploy,update,uninstall buttons click in applications section on stage page ([#37](https://github.com/epam/edp-headlamp/issues/37))
- Update Application resource creation and update templates with gitops codebase custom values ([#32](https://github.com/epam/edp-headlamp/issues/32))
- Add GitOps configuration section, enable values override functionality, align argocd application creation with custom values ([#32](https://github.com/epam/edp-headlamp/issues/32))
- Update links to headlamp documentation ([#33](https://github.com/epam/edp-headlamp/issues/33))

### Bug Fixes

- Fix broken route link ([#51](https://github.com/epam/edp-headlamp/issues/51))
- Make Name field in gitops creation disabled only on created resources ([#52](https://github.com/epam/edp-headlamp/issues/52))
- Fix git server, GitOps issues ([#49](https://github.com/epam/edp-headlamp/issues/49))
- Fix error when creating codebase using template with default versioning type ([#72](https://github.com/epam/edp-headlamp/issues/72))
- Fix latest, stable image stream buttons, fix adding registry secrets ([#35](https://github.com/epam/edp-headlamp/issues/35))
- Fix editor crash ([#34](https://github.com/epam/edp-headlamp/issues/34))
- Fix marketplace page search function ([#27](https://github.com/epam/edp-headlamp/issues/27))

### Code Refactoring

- Move keycloakUrl under OIDC section ([#45](https://github.com/epam/edp-headlamp/issues/45))
- Remove deprecated edpName parameter ([#41](https://github.com/epam/edp-headlamp/issues/41))

### Routine

- Update current development version ([#23](https://github.com/epam/edp-headlamp/issues/23))


<a name="v0.8.0"></a>
## [v0.8.0] - 2023-08-28
### Features

- Add empty result handling to DataGrid component, add search by displayname in marketplace list ([#22](https://github.com/epam/edp-headlamp/issues/22))
- Upgrade headlamp to 0.19.1 ([#30](https://github.com/epam/edp-headlamp/issues/30))
- Make grid mode for overview list page ([#29](https://github.com/epam/edp-headlamp/issues/29))
- Add DependencyTrack Configuration page ([#28](https://github.com/epam/edp-headlamp/issues/28))
- Connect headlamps filter logic with marketplace page, add pagination and status handling ([#27](https://github.com/epam/edp-headlamp/issues/27))
- Align configuration pages into one flow, create ConfigurationBody component for creating configuration pages ([#26](https://github.com/epam/edp-headlamp/issues/26))
- Reorganize edp documentation url ([#21](https://github.com/epam/edp-headlamp/issues/21))

### Bug Fixes

- Fix sonar cognitive complexity critical ([#28](https://github.com/epam/edp-headlamp/issues/28))
- Fix going back to previous page on resource deletion success ([#24](https://github.com/epam/edp-headlamp/issues/24))
- Fix going back to previous page on resource deletion success, fix editor initial value data ([#25](https://github.com/epam/edp-headlamp/issues/25))
- Fix image tags real-time updating ([#25](https://github.com/epam/edp-headlamp/issues/25))
- Fix going back to previous page on resource deletion success ([#24](https://github.com/epam/edp-headlamp/issues/24))
- Fix empty page marketplace when there is no view mode selected ([#22](https://github.com/epam/edp-headlamp/issues/22))

### Routine

- Bump Headlamp base image in chart annotation ([#23](https://github.com/epam/edp-headlamp/issues/23))
- Update current development version ([#16](https://github.com/epam/edp-headlamp/issues/16))


<a name="v0.7.0"></a>
## [v0.7.0] - 2023-08-18

[Unreleased]: https://github.com/epam/edp-headlamp/compare/v0.11.0...HEAD
[v0.11.0]: https://github.com/epam/edp-headlamp/compare/v0.10.0...v0.11.0
[v0.10.0]: https://github.com/epam/edp-headlamp/compare/v0.9.0...v0.10.0
[v0.9.0]: https://github.com/epam/edp-headlamp/compare/v0.8.0...v0.9.0
[v0.8.0]: https://github.com/epam/edp-headlamp/compare/v0.7.0...v0.8.0
[v0.7.0]: https://github.com/epam/edp-headlamp/compare/v0.6.0...v0.7.0

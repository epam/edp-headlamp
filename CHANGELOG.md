<a name="unreleased"></a>
## [Unreleased]


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

[Unreleased]: https://github.com/epam/edp-headlamp/compare/v0.9.0...HEAD
[v0.9.0]: https://github.com/epam/edp-headlamp/compare/v0.8.0...v0.9.0
[v0.8.0]: https://github.com/epam/edp-headlamp/compare/v0.7.0...v0.8.0
[v0.7.0]: https://github.com/epam/edp-headlamp/compare/v0.6.0...v0.7.0

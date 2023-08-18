<a name="unreleased"></a>
## [Unreleased]


<a name="v0.7.0"></a>
## [v0.7.0] - 2023-08-18
### Features

- Redesign stage applications table, add ability to deploy/update/uninstall any codebases at once [EPMDEDP-11615](https://jiraeu.epam.com/browse/EPMDEDP-11615)
- Make status tooltip interactive [EPMDEDP-11651](https://jiraeu.epam.com/browse/EPMDEDP-11651)
- Make stage creation form validation mode to be onChange [EPMDEDP-11652](https://jiraeu.epam.com/browse/EPMDEDP-11652)
- Move out build pipeline run button on branch component [EPMDEDP-11653](https://jiraeu.epam.com/browse/EPMDEDP-11653)
- Add tests for useResourceCRUDMutation hook, reorganize createResourceFunctions location [EPMDEDP-11688](https://jiraeu.epam.com/browse/EPMDEDP-11688)
- Update README adding new screenshots and brief overview video [EPMDEDP-11803](https://jiraeu.epam.com/browse/EPMDEDP-11803)
- Add cluster support [EPMDEDP-11885](https://jiraeu.epam.com/browse/EPMDEDP-11885)
- Redesign cd pipeline page [EPMDEDP-11992](https://jiraeu.epam.com/browse/EPMDEDP-11992)
- Add description field into codebase creation flow [EPMDEDP-11996](https://jiraeu.epam.com/browse/EPMDEDP-11996)
- Add nextjs javascript framework [EPMDEDP-12080](https://jiraeu.epam.com/browse/EPMDEDP-12080)
- Add manual/auto trigger type labels into stage accordion [EPMDEDP-12118](https://jiraeu.epam.com/browse/EPMDEDP-12118)
- Add links to documentation [EPMDEDP-12130](https://jiraeu.epam.com/browse/EPMDEDP-12130)
- Update doc link tooltip [EPMDEDP-12130](https://jiraeu.epam.com/browse/EPMDEDP-12130)
- Add helm framework into helm language frameworks in library codebase mapping [EPMDEDP-12135](https://jiraeu.epam.com/browse/EPMDEDP-12135)
- Update helm-helm-charts library option [EPMDEDP-12135](https://jiraeu.epam.com/browse/EPMDEDP-12135)
- Update kibana link creation template [EPMDEDP-12151](https://jiraeu.epam.com/browse/EPMDEDP-12151)
- Add pipelineruntimeout status handling [EPMDEDP-12178](https://jiraeu.epam.com/browse/EPMDEDP-12178)
- Align form fields in one row while having validation errors [EPMDEDP-12205](https://jiraeu.epam.com/browse/EPMDEDP-12205)
- Add antora javascript framework as an option into codebase mapping [EPMDEDP-12212](https://jiraeu.epam.com/browse/EPMDEDP-12212)
- Make release branch version postfix optional [EPMDEDP-12232](https://jiraeu.epam.com/browse/EPMDEDP-12232)
- Update registry secret creation template, update container registry page description [EPMDEDP-12241](https://jiraeu.epam.com/browse/EPMDEDP-12241)
- Add registry section into configuration page, add possibility to create registry secrets [EPMDEDP-12241](https://jiraeu.epam.com/browse/EPMDEDP-12241)
- Update ManageRegistrySecret widget registryEndpoint default value [EPMDEDP-12241](https://jiraeu.epam.com/browse/EPMDEDP-12241)
- Update registrySecret creation template [EPMDEDP-12241](https://jiraeu.epam.com/browse/EPMDEDP-12241)
- Update patch to resolve sonar conflicts [EPMDEDP-12241](https://jiraeu.epam.com/browse/EPMDEDP-12241)
- Set clusterName into kubernetes icon tooltip on stage page [EPMDEDP-12242](https://jiraeu.epam.com/browse/EPMDEDP-12242)
- Update framework field label [EPMDEDP-12244](https://jiraeu.epam.com/browse/EPMDEDP-12244)
- Move intergration pages into separate Configuration section [EPMDEDP-12245](https://jiraeu.epam.com/browse/EPMDEDP-12245)
- Update component page structure [EPMDEDP-12263](https://jiraeu.epam.com/browse/EPMDEDP-12263)
- Align all create/edit dialogs in one similar structure and logic format [EPMDEDP-12265](https://jiraeu.epam.com/browse/EPMDEDP-12265)
- Add marketplace page for viewing Template kind resources [EPMDEDP-12268](https://jiraeu.epam.com/browse/EPMDEDP-12268)
- Update market place cards ui, fix alignment [EPMDEDP-12268](https://jiraeu.epam.com/browse/EPMDEDP-12268)
- Add create component from template widget on marketplace page [EPMDEDP-12269](https://jiraeu.epam.com/browse/EPMDEDP-12269)
- Update cd pipeline, stage pages structure according to used ci tool [EPMDEDP-12286](https://jiraeu.epam.com/browse/EPMDEDP-12286)
- Rename language Terraform to HCL [EPMDEDP-12291](https://jiraeu.epam.com/browse/EPMDEDP-12291)
- Create custom table component, align all tables to use the created component, add empty table components, add logo [EPMDEDP-12301](https://jiraeu.epam.com/browse/EPMDEDP-12301)
- Prepend https to EDPComponent urls if they lack it [EPMDEDP-12306](https://jiraeu.epam.com/browse/EPMDEDP-12306)
- Rename CD Pipelines to Environments, add a dot into the git servers description [EPMDEDP-12319](https://jiraeu.epam.com/browse/EPMDEDP-12319)
- Update registry secrets UI relatively to case where a secret has ownerReferences [EPMDEDP-12345](https://jiraeu.epam.com/browse/EPMDEDP-12345)
- Add sonarqube, nexus integration pages [EPMDEDP-12390](https://jiraeu.epam.com/browse/EPMDEDP-12390)
- Update Create/Edit widget snapshot tests [EPMDEDP-12391](https://jiraeu.epam.com/browse/EPMDEDP-12391)
- Add empty search result [EPMDEDP-12415](https://jiraeu.epam.com/browse/EPMDEDP-12415)
- Moves create button upper, updates table empty result logic [EPMDEDP-12426](https://jiraeu.epam.com/browse/EPMDEDP-12426)
- Redesign configuration pages structure [EPMDEDP-12438](https://jiraeu.epam.com/browse/EPMDEDP-12438)
- Update stage page, add info columns component which can be reused in resource pages [EPMDEDP-12446](https://jiraeu.epam.com/browse/EPMDEDP-12446)
- Add DefectDojo, Jira Integration pages into configuration group [EPMDEDP-12448](https://jiraeu.epam.com/browse/EPMDEDP-12448)
- Add link to tekton task run in quality gates block, add "open in argocd" tooltip to deployed version field on stage page [EPMDEDP-12459](https://jiraeu.epam.com/browse/EPMDEDP-12459)
- Add help menu into app's top bar [EPMDEDP-12462](https://jiraeu.epam.com/browse/EPMDEDP-12462)

### Bug Fixes

- Fix max length when creating build pipeline run [EPMDEDP-11519](https://jiraeu.epam.com/browse/EPMDEDP-11519)
- Fix sonar critical [EPMDEDP-11885](https://jiraeu.epam.com/browse/EPMDEDP-11885)
- Fix not showing cd pipeline page, fix sonar errors, fix tekton resource status calculation [EPMDEDP-12028](https://jiraeu.epam.com/browse/EPMDEDP-12028)
- Move commitMessagePattern field into jira integration section when jenkins is used and make it required [EPMDEDP-12057](https://jiraeu.epam.com/browse/EPMDEDP-12057)
- Set CDPipeline's namespace when creating stage [EPMDEDP-12081](https://jiraeu.epam.com/browse/EPMDEDP-12081)
- Remove flask and fastapi frameworks/language versions from python lang on library creation [EPMDEDP-12082](https://jiraeu.epam.com/browse/EPMDEDP-12082)
- Fix deploy version value for helm applications, fix update helm application [EPMDEDP-12126](https://jiraeu.epam.com/browse/EPMDEDP-12126)
- Add "in-cluster" default option into cluster select when creating stage [EPMDEDP-12236](https://jiraeu.epam.com/browse/EPMDEDP-12236)
- Fix updating form values after creating codebase branch resource [EPMDEDP-12248](https://jiraeu.epam.com/browse/EPMDEDP-12248)
- Improves dialog provider logic, fixes manage registry secret section [EPMDEDP-12265](https://jiraeu.epam.com/browse/EPMDEDP-12265)
- Update jenkins cd pipeline link creation template [EPMDEDP-12286](https://jiraeu.epam.com/browse/EPMDEDP-12286)
- Fix random strings used when creating resources [EPMDEDP-12287](https://jiraeu.epam.com/browse/EPMDEDP-12287)
- Fix codebase branch creation, fix jira mapping values update in codebase creation form [EPMDEDP-12301](https://jiraeu.epam.com/browse/EPMDEDP-12301)
- Hotfix bugs after last patch [EPMDEDP-12301](https://jiraeu.epam.com/browse/EPMDEDP-12301)
- Set proper namespace when creating grafana/kibana links [EPMDEDP-12303](https://jiraeu.epam.com/browse/EPMDEDP-12303)
- Fix page titles [EPMDEDP-12305](https://jiraeu.epam.com/browse/EPMDEDP-12305)
- Fix resetting default formValues in CreateCodebase form on success [EPMDEDP-12321](https://jiraeu.epam.com/browse/EPMDEDP-12321)
- Fix updating CD Pipeline applications when reopening Create/Edit dialogs [EPMDEDP-12395](https://jiraeu.epam.com/browse/EPMDEDP-12395)
- Hotfix table list crash because of new headlamp ui [EPMDEDP-12399](https://jiraeu.epam.com/browse/EPMDEDP-12399)
- Fix crash when downgrading to 0.18.0 [EPMDEDP-12414](https://jiraeu.epam.com/browse/EPMDEDP-12414)
- Fix applications update logic [EPMDEDP-12419](https://jiraeu.epam.com/browse/EPMDEDP-12419)
- Fix sonar critical [EPMDEDP-12419](https://jiraeu.epam.com/browse/EPMDEDP-12419)
- Fix CD Pipeline applications handling, fix stage page actions, add copy package json fn into dockerfile [EPMDEDP-12419](https://jiraeu.epam.com/browse/EPMDEDP-12419)
- Fix files permissions for plugin assets [EPMDEDP-12438](https://jiraeu.epam.com/browse/EPMDEDP-12438)
- Fix generating stable image stream tags, add unit test for tag options creation function [EPMDEDP-12445](https://jiraeu.epam.com/browse/EPMDEDP-12445)
- Fix generating ID for quality gates form items, specify configuration secret managed by label [EPMDEDP-12457](https://jiraeu.epam.com/browse/EPMDEDP-12457)
- Fix autotests fetching namespace when creating stage [EPMDEDP-12457](https://jiraeu.epam.com/browse/EPMDEDP-12457)
- Update quality gates logic in create stage dialog [EPMDEDP-12457](https://jiraeu.epam.com/browse/EPMDEDP-12457)
- Fix issues after downgrading to previous version [EPMDEDP-12463](https://jiraeu.epam.com/browse/EPMDEDP-12463)

### Code Refactoring

- Remove redundant form data values in codebase branch form, refactor code and types [EPMDEDP-11548](https://jiraeu.epam.com/browse/EPMDEDP-11548)
- Organize component structure [EPMDEDP-11549](https://jiraeu.epam.com/browse/EPMDEDP-11549)
- Refactor conflicted cd pipeline handling, optimize context providers [EPMDEDP-12028](https://jiraeu.epam.com/browse/EPMDEDP-12028)
- Get rid of outdated way of importing common headlamp packagess [EPMDEDP-12170](https://jiraeu.epam.com/browse/EPMDEDP-12170)
- Align other pages with new breadcrumbs ui [EPMDEDP-12245](https://jiraeu.epam.com/browse/EPMDEDP-12245)
- Fix code to reduce cognitive complexity [EPMDEDP-12301](https://jiraeu.epam.com/browse/EPMDEDP-12301)
- Do not create EDPComponent [EPMDEDP-12438](https://jiraeu.epam.com/browse/EPMDEDP-12438)

### Routine

- Update current development version [EPMDEDP-11826](https://jiraeu.epam.com/browse/EPMDEDP-11826)
- Update scc for OpenShift [EPMDEDP-12179](https://jiraeu.epam.com/browse/EPMDEDP-12179)
- Update headlamp and sync common packages versions [EPMDEDP-12179](https://jiraeu.epam.com/browse/EPMDEDP-12179)
- Update helm-chart icon [EPMDEDP-12254](https://jiraeu.epam.com/browse/EPMDEDP-12254)
- Rollback headlamp version to 0.18.0 [EPMDEDP-12414](https://jiraeu.epam.com/browse/EPMDEDP-12414)
- Update headlamp to 0.19.0 [EPMDEDP-12414](https://jiraeu.epam.com/browse/EPMDEDP-12414)
- Move livenessProbe/readinessProbe to values.yaml [EPMDEDP-12438](https://jiraeu.epam.com/browse/EPMDEDP-12438)
- Update icons with EDP original [EPMDEDP-12438](https://jiraeu.epam.com/browse/EPMDEDP-12438)

### Documentation

- Update README.md [EPMDEDP-12384](https://jiraeu.epam.com/browse/EPMDEDP-12384)


<a name="v0.6.0"></a>
## [v0.6.0] - 2023-05-25
### Features

- Add "helm" application support [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Update create strategy label on codebase creation flow, fix onSubmit/onError progress reset behaviour [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Update application resource creation template [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Update Application resource creation template [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Add button with link to VCS repo in codebase branch block on component page [EPMDEDP-11516](https://jiraeu.epam.com/browse/EPMDEDP-11516)
- Add gitUrlPath when creating codebase with create strategy [EPMDEDP-11516](https://jiraeu.epam.com/browse/EPMDEDP-11516)
- Add links to ArgoCD in CDPipeline page(pipeline, stage, application) [EPMDEDP-11521](https://jiraeu.epam.com/browse/EPMDEDP-11521)
- Update link to argocd in stage applications table to open a new page in a new tab [EPMDEDP-11521](https://jiraeu.epam.com/browse/EPMDEDP-11521)
- Add links to Grafana and Kibana on CD pipeline page in Stage view [EPMDEDP-11523](https://jiraeu.epam.com/browse/EPMDEDP-11523)
- Move component create button upper to be fixed at the table bottom-right border [EPMDEDP-11654](https://jiraeu.epam.com/browse/EPMDEDP-11654)
- Use workspace size volume from trigger template [EPMDEDP-11704](https://jiraeu.epam.com/browse/EPMDEDP-11704)
- Add vue/angular/express javascript frameworks [EPMDEDP-11762](https://jiraeu.epam.com/browse/EPMDEDP-11762)
- Add Gin - GO's framework [EPMDEDP-11836](https://jiraeu.epam.com/browse/EPMDEDP-11836)
- Add the ability to use additional volumes in helm chart [EPMDEDP-11847](https://jiraeu.epam.com/browse/EPMDEDP-11847)
- Update component create flow, update build PipelineRun resource creation template [EPMDEDP-11849](https://jiraeu.epam.com/browse/EPMDEDP-11849)
- Update C# lang frameworks [EPMDEDP-11881](https://jiraeu.epam.com/browse/EPMDEDP-11881)
- Add .NET 3.1 to list of C# library frameworks [EPMDEDP-11881](https://jiraeu.epam.com/browse/EPMDEDP-11881)
- Merge codebase info + application info on codebase creation flow [EPMDEDP-11900](https://jiraeu.epam.com/browse/EPMDEDP-11900)
- Add link to GQ Pipeline in CD pipeline [EPMDEDP-11911](https://jiraeu.epam.com/browse/EPMDEDP-11911)
- Fix sonar error, update use resource hook logic [EPMDEDP-11911](https://jiraeu.epam.com/browse/EPMDEDP-11911)
- Set Overview page as a default EDP page [EPMDEDP-11940](https://jiraeu.epam.com/browse/EPMDEDP-11940)
- Add ability to define cluster to deploy for CD pipelines [EPMDEDP-11952](https://jiraeu.epam.com/browse/EPMDEDP-11952)
- Update "update", "uninstall", "deploy" argo application buttons [EPMDEDP-11954](https://jiraeu.epam.com/browse/EPMDEDP-11954)
- Update argoApplication resource creation template [EPMDEDP-11961](https://jiraeu.epam.com/browse/EPMDEDP-11961)
- Update argo application resource creation template [EPMDEDP-11964](https://jiraeu.epam.com/browse/EPMDEDP-11964)
- Add ability to run autotests on Stage view [EPMDEDP-11975](https://jiraeu.epam.com/browse/EPMDEDP-11975)
- Add link to Sonar on Codebase Branch view [EPMDEDP-11984](https://jiraeu.epam.com/browse/EPMDEDP-11984)
- Update Sonar link's tooltip text [EPMDEDP-11984](https://jiraeu.epam.com/browse/EPMDEDP-11984)
- Update status column in quality gates table to show actual status [EPMDEDP-11990](https://jiraeu.epam.com/browse/EPMDEDP-11990)
- Add ability to run autotests in stage by creating autotest runner pipeline run [EPMDEDP-11990](https://jiraeu.epam.com/browse/EPMDEDP-11990)
- Add status column into quality gates table [EPMDEDP-11990](https://jiraeu.epam.com/browse/EPMDEDP-11990)
- Add "Infrastructure" codebase type [EPMDEDP-11997](https://jiraeu.epam.com/browse/EPMDEDP-11997)
- Update infrastructure codebase config, rename "Language version/framework" field to "Provider" [EPMDEDP-11997](https://jiraeu.epam.com/browse/EPMDEDP-11997)
- Update quality gates section [EPMDEDP-12007](https://jiraeu.epam.com/browse/EPMDEDP-12007)
- Remove ability to set similar quality gates when creating stage [EPMDEDP-12007](https://jiraeu.epam.com/browse/EPMDEDP-12007)
- Add quality gates diagram [EPMDEDP-12017](https://jiraeu.epam.com/browse/EPMDEDP-12017)
- Update formValues when setting base default values in create codebase form [EPMDEDP-12037](https://jiraeu.epam.com/browse/EPMDEDP-12037)
- Keep only one possible CI Tool as a default CI Tool in create resource behaviour [EPMDEDP-12037](https://jiraeu.epam.com/browse/EPMDEDP-12037)

### Bug Fixes

- Fix crash when there is no helm in argoApplication spec [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Fix crash on CDPipeline page where there is no argo application [EPMDEDP-11478](https://jiraeu.epam.com/browse/EPMDEDP-11478)
- Fix condition when creating build pipeline run action [EPMDEDP-11902](https://jiraeu.epam.com/browse/EPMDEDP-11902)
- Fix crash when creating pipeline run build action that uses git server as a useMemo dependency [EPMDEDP-11902](https://jiraeu.epam.com/browse/EPMDEDP-11902)
- Fix secret creation when creating codebase with clone strategy and private repo credentials [EPMDEDP-11904](https://jiraeu.epam.com/browse/EPMDEDP-11904)
- Fix crash when trying to get gitProvider value from codebase gitServer [EPMDEDP-11943](https://jiraeu.epam.com/browse/EPMDEDP-11943)
- Fix repoURL property value in created Application resource [EPMDEDP-11945](https://jiraeu.epam.com/browse/EPMDEDP-11945)
- Fix crash when trying to find specific TriggerTemplate resource based on codebase git server [EPMDEDP-11946](https://jiraeu.epam.com/browse/EPMDEDP-11946)
- Fix stage component sonar cognitive complexity critical [EPMDEDP-12007](https://jiraeu.epam.com/browse/EPMDEDP-12007)
- Remove ability to set similar quality gates when creating stage [EPMDEDP-12007](https://jiraeu.epam.com/browse/EPMDEDP-12007)
- Fix crash when choosing Jenkins as a CI Tool [EPMDEDP-12036](https://jiraeu.epam.com/browse/EPMDEDP-12036)
- Fix crash when creating pipeline options in PipelineRunTrigger component [EPMDEDP-12083](https://jiraeu.epam.com/browse/EPMDEDP-12083)

### Code Refactoring

- Refactor use <resourceName> hooks, fix errors after refactor [EPMDEDP-11546](https://jiraeu.epam.com/browse/EPMDEDP-11546)
- Refactor useResource/useResourceList hooks and its logic [EPMDEDP-11546](https://jiraeu.epam.com/browse/EPMDEDP-11546)
- Align labels for PipelineRuns CR [EPMDEDP-12004](https://jiraeu.epam.com/browse/EPMDEDP-12004)

### Routine

- Update current development version [EPMDEDP-11472](https://jiraeu.epam.com/browse/EPMDEDP-11472)
- Update headlamp image to v0.17.0, update headlamp-plugin to v0.5.6-alpha.2, fix table styles according to update [EPMDEDP-11951](https://jiraeu.epam.com/browse/EPMDEDP-11951)


<a name="v0.5.0"></a>
## [v0.5.0] - 2023-03-24
### Features

- Rename 'Repository URL' field to 'Forked from' (for clone strategy) [EPMDEDP-11326](https://jiraeu.epam.com/browse/EPMDEDP-11326)
- Add codebasebranch pipeline runs overview [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Add fastapi and flask frameworks to python lang in app creation, remove redundant scripts [EPMDEDP-11359](https://jiraeu.epam.com/browse/EPMDEDP-11359)
- Add possibility to enter custom framework name in codebase creation tool [EPMDEDP-11361](https://jiraeu.epam.com/browse/EPMDEDP-11361)
- Hides empty project button if clone/import strategy is used [EPMDEDP-11378](https://jiraeu.epam.com/browse/EPMDEDP-11378)
- Make jira overview human-readable [EPMDEDP-11412](https://jiraeu.epam.com/browse/EPMDEDP-11412)
- Add newline at the end of sshprivatekey value in git server creation [EPMDEDP-11428](https://jiraeu.epam.com/browse/EPMDEDP-11428)
- Move ticket name pattern field value to advanced settings out of jira intergration block [EPMDEDP-11433](https://jiraeu.epam.com/browse/EPMDEDP-11433)
- Add custom resource status description(detailed_message) when status is failed [EPMDEDP-11439](https://jiraeu.epam.com/browse/EPMDEDP-11439)
- Disable update/uninstall buttons when pipeline run is in "running" status [EPMDEDP-11476](https://jiraeu.epam.com/browse/EPMDEDP-11476)
- Remove last time updated field in codebaseBranch info [EPMDEDP-11503](https://jiraeu.epam.com/browse/EPMDEDP-11503)
- Add icons to codebase lang/framework/buildtool/citool in components list overview table [EPMDEDP-11505](https://jiraeu.epam.com/browse/EPMDEDP-11505)
- Add availableCiTools to codebase mappings [EPMDEDP-11532](https://jiraeu.epam.com/browse/EPMDEDP-11532)
- Rename Fastapi to FastAPI [EPMDEDP-11532](https://jiraeu.epam.com/browse/EPMDEDP-11532)
- Remove the need to write .git at the end of gitRepoUrl [EPMDEDP-11541](https://jiraeu.epam.com/browse/EPMDEDP-11541)
- Add java17 support [EPMDEDP-11559](https://jiraeu.epam.com/browse/EPMDEDP-11559)
- Improve codebase mapping quality, add helm/pipeline/helm lang/framework/buildtool mapping [EPMDEDP-11599](https://jiraeu.epam.com/browse/EPMDEDP-11599)
- Replace groovy-lib branch metadata name to spec branchName [EPMDEDP-11603](https://jiraeu.epam.com/browse/EPMDEDP-11603)
- Remove taskRunSpecs block from build pipeline run template [EPMDEDP-11624](https://jiraeu.epam.com/browse/EPMDEDP-11624)
- Remove custom useRequest hook, use React-query package instead [EPMDEDP-11659](https://jiraeu.epam.com/browse/EPMDEDP-11659)
- Add yaml lang, helm framework/build tool, fix icons mapping logic [EPMDEDP-11678](https://jiraeu.epam.com/browse/EPMDEDP-11678)
- Align edp-headlamp with upstream headlamp(align namespace scoping logic) [EPMDEDP-11725](https://jiraeu.epam.com/browse/EPMDEDP-11725)
- Hide dotnet option in codebase creation for non-jenkins ci tools [EPMDEDP-11731](https://jiraeu.epam.com/browse/EPMDEDP-11731)
- Add C# language, .NET 6.0 framework into codebase mapping config [EPMDEDP-11731](https://jiraeu.epam.com/browse/EPMDEDP-11731)

### Bug Fixes

- Normalizes codebase branch name in pipeline-run name [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Add branch name to pipeline run name in notifications [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Fixes repoUrlUser typo in argo application resource creation template [EPMDEDP-11334](https://jiraeu.epam.com/browse/EPMDEDP-11334)
- Fix crash on resource update, sort resources before pushing in streamResults fn [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Fix storing pipeline runs, remove filtering [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Hide pipeline runs if jenkins ci tool is used [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Fix edpcomponent resource icon view, update headlamp template icon [EPMDEDP-11377](https://jiraeu.epam.com/browse/EPMDEDP-11377)
- Move commit message pattern out of Jira functionality [EPMDEDP-11433](https://jiraeu.epam.com/browse/EPMDEDP-11433)
- Trigger validate in branch version change [EPMDEDP-11455](https://jiraeu.epam.com/browse/EPMDEDP-11455)
- Fix update release branch name on branch version edit [EPMDEDP-11455](https://jiraeu.epam.com/browse/EPMDEDP-11455)
- Fix crash after streamResult fn exec [EPMDEDP-11475](https://jiraeu.epam.com/browse/EPMDEDP-11475)
- Fix deploy pipeline run button disabled state [EPMDEDP-11510](https://jiraeu.epam.com/browse/EPMDEDP-11510)
- Disable QG Pipeline run button when health and status aren't healthy [EPMDEDP-11510](https://jiraeu.epam.com/browse/EPMDEDP-11510)
- Fix crash with undefined icons [EPMDEDP-11532](https://jiraeu.epam.com/browse/EPMDEDP-11532)
- Make java17 available only in tekton [EPMDEDP-11559](https://jiraeu.epam.com/browse/EPMDEDP-11559)
- Fix create resource yaml editor editing sync with forms [EPMDEDP-11596](https://jiraeu.epam.com/browse/EPMDEDP-11596)
- Change groovy-lib branchName value to spec branch name instead of metadata name in stage creation [EPMDEDP-11603](https://jiraeu.epam.com/browse/EPMDEDP-11603)
- Fix cd pipeline stage source type, fix error showing in request mutations [EPMDEDP-11603](https://jiraeu.epam.com/browse/EPMDEDP-11603)
- Move commitmessagepattern field out of jira integration block in codebase edit flow [EPMDEDP-11611](https://jiraeu.epam.com/browse/EPMDEDP-11611)
- Filter gitServers by metadata.name, add gitHost column in gitServers list page [EPMDEDP-11649](https://jiraeu.epam.com/browse/EPMDEDP-11649)
- Remove await due to sonarqube warning [EPMDEDP-11649](https://jiraeu.epam.com/browse/EPMDEDP-11649)
- Fix sonar warnings in useCreate<ResourceName> hooks regarding cognitive complexity [EPMDEDP-11659](https://jiraeu.epam.com/browse/EPMDEDP-11659)
- Fix requesting applications with branches, refactor w/ react query [EPMDEDP-11670](https://jiraeu.epam.com/browse/EPMDEDP-11670)
- Fix resource details page crash when there is no status, move ErrorBoundary to wrapped page component [EPMDEDP-11712](https://jiraeu.epam.com/browse/EPMDEDP-11712)
- Fix crash with unknown lang/framework/buildtool values when trying to show icons [EPMDEDP-11712](https://jiraeu.epam.com/browse/EPMDEDP-11712)
- Fix crash when trying to get frameworks/buildTools of unknown lang name [EPMDEDP-11712](https://jiraeu.epam.com/browse/EPMDEDP-11712)
- Hotfix swap namespace/name in delete resource request [EPMDEDP-11732](https://jiraeu.epam.com/browse/EPMDEDP-11732)

### Code Refactoring

- Rename headlamp oidc parameter [EPMDEDP-11135](https://jiraeu.epam.com/browse/EPMDEDP-11135)

### Routine

- Update git-chglog for edp-headlamp [EPMDEDP-11518](https://jiraeu.epam.com/browse/EPMDEDP-11518)
- Add health check for headlamp deployment [EPMDEDP-11576](https://jiraeu.epam.com/browse/EPMDEDP-11576)
- Update headlamp to v0.16.0 [EPMDEDP-11725](https://jiraeu.epam.com/browse/EPMDEDP-11725)


<a name="v0.4.0"></a>
## [v0.4.0] - 2023-01-23
### Features

- Hides create and clone strategies when there is no Gerrit git server available [EPMDEDP-11212](https://jiraeu.epam.com/browse/EPMDEDP-11212)
- Adds all type to components filter [EPMDEDP-11223](https://jiraeu.epam.com/browse/EPMDEDP-11223)
- Adds type column into components table [EPMDEDP-11223](https://jiraeu.epam.com/browse/EPMDEDP-11223)
- Merges applications, libraries and autotests in one entity in list and creation forms [EPMDEDP-11223](https://jiraeu.epam.com/browse/EPMDEDP-11223)
- Increases tooltip font-size [EPMDEDP-11240](https://jiraeu.epam.com/browse/EPMDEDP-11240)
- Changes components page menu order [EPMDEDP-11262](https://jiraeu.epam.com/browse/EPMDEDP-11262)
- Updates argo application resource creation template [EPMDEDP-11334](https://jiraeu.epam.com/browse/EPMDEDP-11334)

### Bug Fixes

- Fixes crash with useGitServers hook returned value [EPMDEDP-11212](https://jiraeu.epam.com/browse/EPMDEDP-11212)
- Removes All option from codebase creation type field [EPMDEDP-11223](https://jiraeu.epam.com/browse/EPMDEDP-11223)
- Changes autotests type to autotest in all possible dependencies [EPMDEDP-11259](https://jiraeu.epam.com/browse/EPMDEDP-11259)
- Fixes components page title font [EPMDEDP-11262](https://jiraeu.epam.com/browse/EPMDEDP-11262)
- Updates argoApplication resource creation template [EPMDEDP-11296](https://jiraeu.epam.com/browse/EPMDEDP-11296)
- Changes relative path placeholder value [EPMDEDP-11297](https://jiraeu.epam.com/browse/EPMDEDP-11297)
- Normalizes codebase branch name in pipeline-run name [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Updates pipeline-run creation template with name containing branch name, fixes status error [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Fixes repoUrlUser typo in argo application resource creation template [EPMDEDP-11334](https://jiraeu.epam.com/browse/EPMDEDP-11334)
- Fixes commit message pattern and ticket name pattern placeholders [EPMDEDP-11360](https://jiraeu.epam.com/browse/EPMDEDP-11360)

### Routine

- Updates headlamp docker tag [EPMDEDP-11185](https://jiraeu.epam.com/browse/EPMDEDP-11185)
- Updates headlamp docker image [EPMDEDP-11276](https://jiraeu.epam.com/browse/EPMDEDP-11276)


<a name="v0.3.0"></a>
## [v0.3.0] - 2022-12-16

<a name="v0.2.2"></a>
## [v0.2.2] - 2022-12-15
### Features

- Updates argoApplication resource creation template [EPMDEDP-11121](https://jiraeu.epam.com/browse/EPMDEDP-11121)
- Implements namespace scoping [EPMDEDP-11185](https://jiraeu.epam.com/browse/EPMDEDP-11185)
- Improves component structures, gets rid of unnecessary index.ts files exporting views [EPMDEDP-11202](https://jiraeu.epam.com/browse/EPMDEDP-11202)

### Routine

- Updates headlamp docker tag [EPMDEDP-11185](https://jiraeu.epam.com/browse/EPMDEDP-11185)


<a name="v0.2.1"></a>
## [v0.2.1] - 2022-12-13
### Features

- Adds cdpipeline stage creation tool [EPMDEDP-10206](https://jiraeu.epam.com/browse/EPMDEDP-10206)
- Adds cdpipeline creation tool [EPMDEDP-10211](https://jiraeu.epam.com/browse/EPMDEDP-10211)
- Adds codebase edit tool [EPMDEDP-10212](https://jiraeu.epam.com/browse/EPMDEDP-10212)
- Adds codebase-branch creation tool, fixes some logics related to resource creation [EPMDEDP-10214](https://jiraeu.epam.com/browse/EPMDEDP-10214)
- Adds cdpipeline edit tool [EPMDEDP-10219](https://jiraeu.epam.com/browse/EPMDEDP-10219)
- Adds cdpipeline stage edit tool [EPMDEDP-10221](https://jiraeu.epam.com/browse/EPMDEDP-10221)
- Create tests for streamResult, streamResults functions [EPMDEDP-10391](https://jiraeu.epam.com/browse/EPMDEDP-10391)
- Fixes sonar criticals [EPMDEDP-10484](https://jiraeu.epam.com/browse/EPMDEDP-10484)
- Get clientSecret value from secret [EPMDEDP-10539](https://jiraeu.epam.com/browse/EPMDEDP-10539)
- Adds release branch creation flow, separates global constants from global configs [EPMDEDP-10555](https://jiraeu.epam.com/browse/EPMDEDP-10555)
- Adds tekton to ci tools list config [EPMDEDP-10657](https://jiraeu.epam.com/browse/EPMDEDP-10657)
- Implements git server creation tool [EPMDEDP-10731](https://jiraeu.epam.com/browse/EPMDEDP-10731)
- Removes gitops and kubernetes languages from codebase mapping [EPMDEDP-10734](https://jiraeu.epam.com/browse/EPMDEDP-10734)
- Updates headlamp to 0.12.1, fixes link route names [EPMDEDP-10737](https://jiraeu.epam.com/browse/EPMDEDP-10737)
- Removes codebase default branch creation when creating codebase [EPMDEDP-10740](https://jiraeu.epam.com/browse/EPMDEDP-10740)
- Add EDPcomponent for headlamp [EPMDEDP-10741](https://jiraeu.epam.com/browse/EPMDEDP-10741)
- Removes using edp component resource images and start using svg sprite [EPMDEDP-10798](https://jiraeu.epam.com/browse/EPMDEDP-10798)
- Removes storing images as assets and creates images svg sprites [EPMDEDP-10799](https://jiraeu.epam.com/browse/EPMDEDP-10799)
- Updates Codebase creation flow with changes in UI depending on chosen CI tool [EPMDEDP-10801](https://jiraeu.epam.com/browse/EPMDEDP-10801)
- Implements deploy pipeline tool [EPMDEDP-10804](https://jiraeu.epam.com/browse/EPMDEDP-10804)
- Updates CD Pipeline stage creation flow depending on existing CI tools [EPMDEDP-10807](https://jiraeu.epam.com/browse/EPMDEDP-10807)
- Adds slash prefix to GitUrlPath field value [EPMDEDP-10812](https://jiraeu.epam.com/browse/EPMDEDP-10812)
- Updates create resource behaviour [EPMDEDP-10817](https://jiraeu.epam.com/browse/EPMDEDP-10817)
- Moves metadata table to details page header [EPMDEDP-10820](https://jiraeu.epam.com/browse/EPMDEDP-10820)
- Updates Headlamp to 0.13.0 [EPMDEDP-10843](https://jiraeu.epam.com/browse/EPMDEDP-10843)
- Updates git server & secret resource name to resource name with random 5 symbol postfix [EPMDEDP-10850](https://jiraeu.epam.com/browse/EPMDEDP-10850)
- Adds git provider choice button into GitServer creation tool, creates svg sprite structure [EPMDEDP-10851](https://jiraeu.epam.com/browse/EPMDEDP-10851)
- Stops using headlamp's cluster action, creates its own useRequest hook for that purpose [EPMDEDP-10852](https://jiraeu.epam.com/browse/EPMDEDP-10852)
- Makes user field optional in git server creation, adds some regex patterns rules [EPMDEDP-10884](https://jiraeu.epam.com/browse/EPMDEDP-10884)
- Removes secret string from git server creation flow [EPMDEDP-10889](https://jiraeu.epam.com/browse/EPMDEDP-10889)
- Updates creation form labels, tooltips, warning messages, validation [EPMDEDP-10909](https://jiraeu.epam.com/browse/EPMDEDP-10909)
- Trims codebase name field value, adds regex patterns to some fields' options [EPMDEDP-10948](https://jiraeu.epam.com/browse/EPMDEDP-10948)
- Disables other lang when strategy is create [EPMDEDP-10983](https://jiraeu.epam.com/browse/EPMDEDP-10983)
- Updates build tool field behaviour in codebase creation tool [EPMDEDP-10989](https://jiraeu.epam.com/browse/EPMDEDP-10989)
- Adds labels to applications in cd pipeline creation tool, removes auto-setting branch in applications [EPMDEDP-10997](https://jiraeu.epam.com/browse/EPMDEDP-10997)
- Edits codebase page main sections grid settings [EPMDEDP-10998](https://jiraeu.epam.com/browse/EPMDEDP-10998)
- Removes hardcoded cd pipeline provisioners list, instead fetches it from Jenkins k8s object [EPMDEDP-11014](https://jiraeu.epam.com/browse/EPMDEDP-11014)
- Removes hardcoded ci pipeline provisioners list, instead fetches it from Jenkins k8s object [EPMDEDP-11016](https://jiraeu.epam.com/browse/EPMDEDP-11016)
- Removes dotnet 2.1 from codebase frameworks [EPMDEDP-11021](https://jiraeu.epam.com/browse/EPMDEDP-11021)
- Updates argo application object [EPMDEDP-11032](https://jiraeu.epam.com/browse/EPMDEDP-11032)
- Implements quality gate run in CD pipeline [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Adds build number, last successful build, version, default/release labels to branches [EPMDEDP-11058](https://jiraeu.epam.com/browse/EPMDEDP-11058)
- Hides build action on codebases with jenkins ci tool [EPMDEDP-11073](https://jiraeu.epam.com/browse/EPMDEDP-11073)
- Updates codebase branch view depending on jenkins ci tool [EPMDEDP-11073](https://jiraeu.epam.com/browse/EPMDEDP-11073)
- Updates pipelinerun resource labels [EPMDEDP-11080](https://jiraeu.epam.com/browse/EPMDEDP-11080)
- Adds pipeline name label to Application resource when creating [EPMDEDP-11086](https://jiraeu.epam.com/browse/EPMDEDP-11086)
- Removes dialog closing on backdrop click [EPMDEDP-111036](https://jiraeu.epam.com/browse/EPMDEDP-111036)
- Adds stage owner references to created Application resource [EPMDEDP-11132](https://jiraeu.epam.com/browse/EPMDEDP-11132)
- Updates cd pipeline details page view [EPMDEDP-11140](https://jiraeu.epam.com/browse/EPMDEDP-11140)
- Renames branch to image stream column in applications table in cdpipeline details view [EPMDEDP-11140](https://jiraeu.epam.com/browse/EPMDEDP-11140)

### Bug Fixes

- Reduce complexity for "getLibraryRecommendedJenkinsAgent" function [EPMDEDP-10484](https://jiraeu.epam.com/browse/EPMDEDP-10484)
- Fixes test and component errors, refactors tests, updates snapshots [EPMDEDP-10493](https://jiraeu.epam.com/browse/EPMDEDP-10493)
- Fixes headlamp's sortByName function crash [EPMDEDP-10546](https://jiraeu.epam.com/browse/EPMDEDP-10546)
- Aligns tabs label text to left [EPMDEDP-10547](https://jiraeu.epam.com/browse/EPMDEDP-10547)
- Disables apply button in creation tool forms when applying resources [EPMDEDP-10548](https://jiraeu.epam.com/browse/EPMDEDP-10548)
- Fixes codebase default branch creation [EPMDEDP-10552](https://jiraeu.epam.com/browse/EPMDEDP-10552)
- Fixes errors searching on clicking proceed button in forms [EPMDEDP-10580](https://jiraeu.epam.com/browse/EPMDEDP-10580)
- Adds versionHistory to default codebaseBranch spec [EPMDEDP-10656](https://jiraeu.epam.com/browse/EPMDEDP-10656)
- Adds girUrlPath and repository url advanced settings table [EPMDEDP-10729](https://jiraeu.epam.com/browse/EPMDEDP-10729)
- Fixes empty applications list in cd pipeline creation tool [EPMDEDP-10783](https://jiraeu.epam.com/browse/EPMDEDP-10783)
- Changes useAvailableCiTools hook usage to before opening create stage tool [EPMDEDP-10807](https://jiraeu.epam.com/browse/EPMDEDP-10807)
- Replaces plus button with add word [EPMDEDP-10817](https://jiraeu.epam.com/browse/EPMDEDP-10817)
- Fixes cdpipeline creation flow [EPMDEDP-10818](https://jiraeu.epam.com/browse/EPMDEDP-10818)
- Fixes application branch validation in pipeline creation [EPMDEDP-10818](https://jiraeu.epam.com/browse/EPMDEDP-10818)
- Remove some fields' values on integration strategy change [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Fixes updating fields depending on codebase integration strategy [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Returns gitServer default value in codebase creation [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Fixes updating fields in codebase branch creation tool, changes general tables title size [EPMDEDP-10834](https://jiraeu.epam.com/browse/EPMDEDP-10834)
- Changes codebase creation type to library on library list page [EPMDEDP-10867](https://jiraeu.epam.com/browse/EPMDEDP-10867)
- Updates secret string field required value, changes git server resource status identification [EPMDEDP-10913](https://jiraeu.epam.com/browse/EPMDEDP-10913)
- Fixes security issue about generating crypto random string [EPMDEDP-10987](https://jiraeu.epam.com/browse/EPMDEDP-10987)
- Fixes validation rules update on input type change [EPMDEDP-10989](https://jiraeu.epam.com/browse/EPMDEDP-10989)
- Clears deletion tool form values on submit [EPMDEDP-10991](https://jiraeu.epam.com/browse/EPMDEDP-10991)
- Considers versioning type in image stream tag name when creating application resource [EPMDEDP-11018](https://jiraeu.epam.com/browse/EPMDEDP-11018)
- Keeps build/ prefix with edp versioning only in Application.spec.source.targetRevision [EPMDEDP-11018](https://jiraeu.epam.com/browse/EPMDEDP-11018)
- Adds build pipeline run button into codebase branch component [EPMDEDP-11031](https://jiraeu.epam.com/browse/EPMDEDP-11031)
- Fixes pipeline run object template [EPMDEDP-11031](https://jiraeu.epam.com/browse/EPMDEDP-11031)
- Changes branch name labels in applications in pipeline creation, adds branch required validation [EPMDEDP-11034](https://jiraeu.epam.com/browse/EPMDEDP-11034)
- Fixes pipeline run trigger enabled state [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Fixes run button disabled state when there are no latest pipeline runs [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Fixes runActionIsEnabled boolean calculation [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Adds versioning type info in codebase details page [EPMDEDP-11042](https://jiraeu.epam.com/browse/EPMDEDP-11042)
- Fixes pipeline run status [EPMDEDP-11063](https://jiraeu.epam.com/browse/EPMDEDP-11063)
- Updates headlamp to v.0.14.0 [EPMDEDP-11074](https://jiraeu.epam.com/browse/EPMDEDP-11074)
- Updates codebase languages/frameworks to lowercase style [EPMDEDP-11076](https://jiraeu.epam.com/browse/EPMDEDP-11076)
- Updates regexp error and tooltip for versioning field [EPMDEDP-11113](https://jiraeu.epam.com/browse/EPMDEDP-11113)
- Adds regexp pattern to version field in edp versioning [EPMDEDP-11113](https://jiraeu.epam.com/browse/EPMDEDP-11113)
- Fixes stages updating after pipeline name change in cdpipeline creation flow [EPMDEDP-11120](https://jiraeu.epam.com/browse/EPMDEDP-11120)
- Relocates user to resource kind page after resource deletion [EPMDEDP-11126](https://jiraeu.epam.com/browse/EPMDEDP-11126)
- Prohibits adding similar-name stages [EPMDEDP-11133](https://jiraeu.epam.com/browse/EPMDEDP-11133)
- Updates inputDockerStreams filtering, replaces dots with dashes for following search [EPMDEDP-11137](https://jiraeu.epam.com/browse/EPMDEDP-11137)
- Updates pipeline run fetching, replaces slashes with dots in codebasebranch label [EPMDEDP-11137](https://jiraeu.epam.com/browse/EPMDEDP-11137)
- Fixes randomPostfix not updating after build [EPMDEDP-11139](https://jiraeu.epam.com/browse/EPMDEDP-11139)
- Fixes showing two notifications at once in applications field of cdpipeline creation [EPMDEDP-1114](https://jiraeu.epam.com/browse/EPMDEDP-1114)
- Updates pipeline-run creation flow [EPMDEDP-11158](https://jiraeu.epam.com/browse/EPMDEDP-11158)
- Updates git-source-url field value in pipeline-run creation flow [EPMDEDP-11158](https://jiraeu.epam.com/browse/EPMDEDP-11158)
- Fixes fields updating in branch creation flow [EPMDEDP-11161](https://jiraeu.epam.com/browse/EPMDEDP-11161)
- Fixes fields updating behaviour in branch creation flow [EPMDEDP-11180](https://jiraeu.epam.com/browse/EPMDEDP-11180)
- Adds possibility to edit jira intergration in codebase editing flow [EPMDEDP-11184](https://jiraeu.epam.com/browse/EPMDEDP-11184)

### Code Refactoring

- Refactors module resolving, refactors typing [EPMDEDP-10439](https://jiraeu.epam.com/browse/EPMDEDP-10439)
- Simplifies some hooks and components, segregates commonly used form field components [EPMDEDP-10494](https://jiraeu.epam.com/browse/EPMDEDP-10494)
- Upgrade dependencies [EPMDEDP-10497](https://jiraeu.epam.com/browse/EPMDEDP-10497)
- Resolve bugs found by SonarQube [EPMDEDP-10635](https://jiraeu.epam.com/browse/EPMDEDP-10635)
- Segregates commonly used components, fixes errors, makes some changes to ui [EPMDEDP-10744](https://jiraeu.epam.com/browse/EPMDEDP-10744)
- Remove public key field from gitserver secret [EPMDEDP-11044](https://jiraeu.epam.com/browse/EPMDEDP-11044)

### Routine

- Update current development version [EPMDEDP-10274](https://jiraeu.epam.com/browse/EPMDEDP-10274)
- Add helm validation step to CI [EPMDEDP-10657](https://jiraeu.epam.com/browse/EPMDEDP-10657)
- Use argocd user for integration with Argo CD [EPMDEDP-10853](https://jiraeu.epam.com/browse/EPMDEDP-10853)
- Create Application instead of ArgoApplication [EPMDEDP-10853](https://jiraeu.epam.com/browse/EPMDEDP-10853)
- Updates sonar cfg [EPMDEDP-10912](https://jiraeu.epam.com/browse/EPMDEDP-10912)


<a name="v0.2.0"></a>
## [v0.2.0] - 2022-08-26
### Features

- Implements codebase branches status real-time update [EPMDEDP-10199](https://jiraeu.epam.com/browse/EPMDEDP-10199)
- Adds codebase branch/codebase deletion, refactors code [EPMDEDP-10200](https://jiraeu.epam.com/browse/EPMDEDP-10200)
- Implements kube object delete action, adds stage deletion [EPMDEDP-10204](https://jiraeu.epam.com/browse/EPMDEDP-10204)
- Adds cdpipeline stage edit, adds actions component, adds imagestream class [EPMDEDP-10207](https://jiraeu.epam.com/browse/EPMDEDP-10207)
- Adds codebase creation form tool [EPMDEDP-10208](https://jiraeu.epam.com/browse/EPMDEDP-10208)
- Provide Routes creation for edp-headlamp on OKD [EPMDEDP-10235](https://jiraeu.epam.com/browse/EPMDEDP-10235)
- Adds status/name table columns sorting, formats timestamp to local date format [EPMDEDP-10239](https://jiraeu.epam.com/browse/EPMDEDP-10239)
- Adds codebase creation related tests, segregates some repeating logic into hooks [EPMDEDP-10423](https://jiraeu.epam.com/browse/EPMDEDP-10423)
- Adds secret creation when codebase auth used [EPMDEDP-10442](https://jiraeu.epam.com/browse/EPMDEDP-10442)

### Bug Fixes

- Fix Routes creation for edp-headlamp on OKD [EPMDEDP-10235](https://jiraeu.epam.com/browse/EPMDEDP-10235)
- Sets namespace of CodebaseBrach automatically when creating [EPMDEDP-10270](https://jiraeu.epam.com/browse/EPMDEDP-10270)
- Fixes import naming error [EPMDEDP-10323](https://jiraeu.epam.com/browse/EPMDEDP-10323)
- Fixes wrong codebaseBranch kube object [EPMDEDP-10323](https://jiraeu.epam.com/browse/EPMDEDP-10323)
- Updates package-lock after installing headlamp-plugin 0.5.2 [EPMDEDP-10455](https://jiraeu.epam.com/browse/EPMDEDP-10455)

### Code Refactoring

- Use imports instead of globalThis variable [EPMDEDP-10152](https://jiraeu.epam.com/browse/EPMDEDP-10152)
- Update dependencies [EPMDEDP-10152](https://jiraeu.epam.com/browse/EPMDEDP-10152)
- Use repository and tag for image reference in chart [EPMDEDP-10389](https://jiraeu.epam.com/browse/EPMDEDP-10389)

### Testing

- Add basic tests for a components [EPMDEDP-10152](https://jiraeu.epam.com/browse/EPMDEDP-10152)

### Routine

- Add scc to provide OKD deploy [EPMDEDP-10131](https://jiraeu.epam.com/browse/EPMDEDP-10131)
- Update changelog [EPMDEDP-10274](https://jiraeu.epam.com/browse/EPMDEDP-10274)
- Updates headlamp from 0.10.0 to 0.11.0 version [EPMDEDP-10307](https://jiraeu.epam.com/browse/EPMDEDP-10307)
- Change charts name specification [EPMDEDP-10336](https://jiraeu.epam.com/browse/EPMDEDP-10336)
- Change 'go get' to 'go install' for git-chglog [EPMDEDP-10337](https://jiraeu.epam.com/browse/EPMDEDP-10337)
- Updates headlamp to 0.11.1 [EPMDEDP-10415](https://jiraeu.epam.com/browse/EPMDEDP-10415)
- Updates headlamp to 0.12.0 and headlamp-plugin to 0.5.2 [EPMDEDP-10455](https://jiraeu.epam.com/browse/EPMDEDP-10455)

### Documentation

- Update README.md file [EPMDEDP-10151](https://jiraeu.epam.com/browse/EPMDEDP-10151)
- Review the README.md file [EPMDEDP-10250](https://jiraeu.epam.com/browse/EPMDEDP-10250)
- Align README.md [EPMDEDP-10274](https://jiraeu.epam.com/browse/EPMDEDP-10274)


<a name="v0.1.0"></a>
## v0.1.0 - 2022-07-09
### Features

- Adds libraries module, create/edit library actions, create library codebasebranch. Refactors code, adds tests [EPMDEDP-10073](https://jiraeu.epam.com/browse/EPMDEDP-10073)
- Adds autotests module, refactors some code [EPMDEDP-10134](https://jiraeu.epam.com/browse/EPMDEDP-10134)
- Adds cdpipelines module, adds metadata tables, refactors some code [EPMDEDP-10140](https://jiraeu.epam.com/browse/EPMDEDP-10140)
- Add LICENCE file and README file, plus a couple tweaks to CI [EPMDEDP-10151](https://jiraeu.epam.com/browse/EPMDEDP-10151)
- Adds cdpipeline stages, refactors code, fixes a few ui things [EPMDEDP-10175](https://jiraeu.epam.com/browse/EPMDEDP-10175)

### Bug Fixes

- Remove unsupported fields from Codecov [EPMDEDP-10151](https://jiraeu.epam.com/browse/EPMDEDP-10151)

### Code Refactoring

- Changes codebases querying method to labelselector [EPMDEDP-10172](https://jiraeu.epam.com/browse/EPMDEDP-10172)

### Routine

- Add support for GitHub Actions [EPMDEDP-10105](https://jiraeu.epam.com/browse/EPMDEDP-10105)
- Update Headlamp version to v.0.10.0 [EPMDEDP-10116](https://jiraeu.epam.com/browse/EPMDEDP-10116)
- Adds package-lock.json file to existing codebase and removes it from .gitignore [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Adds pluginLib global type [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Adds prettier configs, gitignore and babelconfig [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Add source code [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Use default image version from .Chart.AppVersion [EPMDEDP-10125](https://jiraeu.epam.com/browse/EPMDEDP-10125)
- Fix codecov step in GH Actions [EPMDEDP-10126](https://jiraeu.epam.com/browse/EPMDEDP-10126)
- Update Makefile targets [EPMDEDP-10126](https://jiraeu.epam.com/browse/EPMDEDP-10126)
- Update changelog [EPMDEDP-10150](https://jiraeu.epam.com/browse/EPMDEDP-10150)


[Unreleased]: https://github.com/epam/edp-headlamp/compare/v0.7.0...HEAD
[v0.7.0]: https://github.com/epam/edp-headlamp/compare/v0.6.0...v0.7.0
[v0.6.0]: https://github.com/epam/edp-headlamp/compare/v0.5.0...v0.6.0
[v0.5.0]: https://github.com/epam/edp-headlamp/compare/v0.4.0...v0.5.0
[v0.4.0]: https://github.com/epam/edp-headlamp/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/epam/edp-headlamp/compare/v0.2.2...v0.3.0
[v0.2.2]: https://github.com/epam/edp-headlamp/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/epam/edp-headlamp/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/epam/edp-headlamp/compare/v0.1.0...v0.2.0

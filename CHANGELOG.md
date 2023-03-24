<a name="unreleased"></a>
## [Unreleased]


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
- Add C# language, .NET 6.0 framework into codebase mapping config [EPMDEDP-11731](https://jiraeu.epam.com/browse/EPMDEDP-11731)
- Hide dotnet option in codebase creation for non-jenkins ci tools [EPMDEDP-11731](https://jiraeu.epam.com/browse/EPMDEDP-11731)

### Bug Fixes

- Normalizes codebase branch name in pipeline-run name [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Add branch name to pipeline run name in notifications [EPMDEDP-11316](https://jiraeu.epam.com/browse/EPMDEDP-11316)
- Fixes repoUrlUser typo in argo application resource creation template [EPMDEDP-11334](https://jiraeu.epam.com/browse/EPMDEDP-11334)
- Fix storing pipeline runs, remove filtering [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Hide pipeline runs if jenkins ci tool is used [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Fix crash on resource update, sort resources before pushing in streamResults fn [EPMDEDP-11338](https://jiraeu.epam.com/browse/EPMDEDP-11338)
- Fix edpcomponent resource icon view, update headlamp template icon [EPMDEDP-11377](https://jiraeu.epam.com/browse/EPMDEDP-11377)
- Move commit message pattern out of Jira functionality [EPMDEDP-11433](https://jiraeu.epam.com/browse/EPMDEDP-11433)
- Fix update release branch name on branch version edit [EPMDEDP-11455](https://jiraeu.epam.com/browse/EPMDEDP-11455)
- Trigger validate in branch version change [EPMDEDP-11455](https://jiraeu.epam.com/browse/EPMDEDP-11455)
- Fix crash after streamResult fn exec [EPMDEDP-11475](https://jiraeu.epam.com/browse/EPMDEDP-11475)
- Disable QG Pipeline run button when health and status aren't healthy [EPMDEDP-11510](https://jiraeu.epam.com/browse/EPMDEDP-11510)
- Fix deploy pipeline run button disabled state [EPMDEDP-11510](https://jiraeu.epam.com/browse/EPMDEDP-11510)
- Fix crash with undefined icons [EPMDEDP-11532](https://jiraeu.epam.com/browse/EPMDEDP-11532)
- Make java17 available only in tekton [EPMDEDP-11559](https://jiraeu.epam.com/browse/EPMDEDP-11559)
- Fix create resource yaml editor editing sync with forms [EPMDEDP-11596](https://jiraeu.epam.com/browse/EPMDEDP-11596)
- Fix cd pipeline stage source type, fix error showing in request mutations [EPMDEDP-11603](https://jiraeu.epam.com/browse/EPMDEDP-11603)
- Change groovy-lib branchName value to spec branch name instead of metadata name in stage creation [EPMDEDP-11603](https://jiraeu.epam.com/browse/EPMDEDP-11603)
- Move commitmessagepattern field out of jira integration block in codebase edit flow [EPMDEDP-11611](https://jiraeu.epam.com/browse/EPMDEDP-11611)
- Remove await due to sonarqube warning [EPMDEDP-11649](https://jiraeu.epam.com/browse/EPMDEDP-11649)
- Filter gitServers by metadata.name, add gitHost column in gitServers list page [EPMDEDP-11649](https://jiraeu.epam.com/browse/EPMDEDP-11649)
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
- Updates codebase branch view depending on jenkins ci tool [EPMDEDP-11073](https://jiraeu.epam.com/browse/EPMDEDP-11073)
- Hides build action on codebases with jenkins ci tool [EPMDEDP-11073](https://jiraeu.epam.com/browse/EPMDEDP-11073)
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
- Fixes updating fields depending on codebase integration strategy [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Returns gitServer default value in codebase creation [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Remove some fields' values on integration strategy change [EPMDEDP-10819](https://jiraeu.epam.com/browse/EPMDEDP-10819)
- Fixes updating fields in codebase branch creation tool, changes general tables title size [EPMDEDP-10834](https://jiraeu.epam.com/browse/EPMDEDP-10834)
- Changes codebase creation type to library on library list page [EPMDEDP-10867](https://jiraeu.epam.com/browse/EPMDEDP-10867)
- Updates secret string field required value, changes git server resource status identification [EPMDEDP-10913](https://jiraeu.epam.com/browse/EPMDEDP-10913)
- Fixes security issue about generating crypto random string [EPMDEDP-10987](https://jiraeu.epam.com/browse/EPMDEDP-10987)
- Fixes validation rules update on input type change [EPMDEDP-10989](https://jiraeu.epam.com/browse/EPMDEDP-10989)
- Clears deletion tool form values on submit [EPMDEDP-10991](https://jiraeu.epam.com/browse/EPMDEDP-10991)
- Keeps build/ prefix with edp versioning only in Application.spec.source.targetRevision [EPMDEDP-11018](https://jiraeu.epam.com/browse/EPMDEDP-11018)
- Considers versioning type in image stream tag name when creating application resource [EPMDEDP-11018](https://jiraeu.epam.com/browse/EPMDEDP-11018)
- Fixes pipeline run object template [EPMDEDP-11031](https://jiraeu.epam.com/browse/EPMDEDP-11031)
- Adds build pipeline run button into codebase branch component [EPMDEDP-11031](https://jiraeu.epam.com/browse/EPMDEDP-11031)
- Changes branch name labels in applications in pipeline creation, adds branch required validation [EPMDEDP-11034](https://jiraeu.epam.com/browse/EPMDEDP-11034)
- Fixes runActionIsEnabled boolean calculation [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Fixes pipeline run trigger enabled state [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Fixes run button disabled state when there are no latest pipeline runs [EPMDEDP-11041](https://jiraeu.epam.com/browse/EPMDEDP-11041)
- Adds versioning type info in codebase details page [EPMDEDP-11042](https://jiraeu.epam.com/browse/EPMDEDP-11042)
- Fixes pipeline run status [EPMDEDP-11063](https://jiraeu.epam.com/browse/EPMDEDP-11063)
- Updates headlamp to v.0.14.0 [EPMDEDP-11074](https://jiraeu.epam.com/browse/EPMDEDP-11074)
- Updates codebase languages/frameworks to lowercase style [EPMDEDP-11076](https://jiraeu.epam.com/browse/EPMDEDP-11076)
- Adds regexp pattern to version field in edp versioning [EPMDEDP-11113](https://jiraeu.epam.com/browse/EPMDEDP-11113)
- Updates regexp error and tooltip for versioning field [EPMDEDP-11113](https://jiraeu.epam.com/browse/EPMDEDP-11113)
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
- Adds pluginLib global type [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Adds prettier configs, gitignore and babelconfig [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Add source code [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Adds package-lock.json file to existing codebase and removes it from .gitignore [EPMDEDP-10123](https://jiraeu.epam.com/browse/EPMDEDP-10123)
- Use default image version from .Chart.AppVersion [EPMDEDP-10125](https://jiraeu.epam.com/browse/EPMDEDP-10125)
- Fix codecov step in GH Actions [EPMDEDP-10126](https://jiraeu.epam.com/browse/EPMDEDP-10126)
- Update Makefile targets [EPMDEDP-10126](https://jiraeu.epam.com/browse/EPMDEDP-10126)
- Update changelog [EPMDEDP-10150](https://jiraeu.epam.com/browse/EPMDEDP-10150)


[Unreleased]: https://github.com/epam/edp-headlamp/compare/v0.5.0...HEAD
[v0.5.0]: https://github.com/epam/edp-headlamp/compare/v0.4.0...v0.5.0
[v0.4.0]: https://github.com/epam/edp-headlamp/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/epam/edp-headlamp/compare/v0.2.2...v0.3.0
[v0.2.2]: https://github.com/epam/edp-headlamp/compare/v0.2.1...v0.2.2
[v0.2.1]: https://github.com/epam/edp-headlamp/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/epam/edp-headlamp/compare/v0.1.0...v0.2.0

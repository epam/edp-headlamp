<a name="unreleased"></a>
## [Unreleased]


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


[Unreleased]: https://github.com/epam/edp-headlamp/compare/v0.2.0...HEAD
[v0.2.0]: https://github.com/epam/edp-headlamp/compare/v0.1.0...v0.2.0

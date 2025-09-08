import {
  BUILD_TOOL_ICON_MAPPING,
  FRAMEWORK_ICON_MAPPING,
  LANGUAGE_ICON_MAPPING,
} from '../../icon-mappings';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../index';
import { CodebaseInterface, CodebaseMappingKey } from '../types';

export type AutotestLanguageKeys =
  | typeof CODEBASE_COMMON_LANGUAGES.JAVA
  | typeof CODEBASE_COMMON_LANGUAGES.OTHER;

type AutotestMappingKey = Extract<CodebaseMappingKey, AutotestLanguageKeys>;

export type AutotestMapping = {
  [K in AutotestMappingKey]: CodebaseInterface;
};

export const AUTOTEST_MAPPING: AutotestMapping = {
  [CODEBASE_COMMON_LANGUAGES.JAVA]: {
    language: {
      name: 'Java',
      value: CODEBASE_COMMON_LANGUAGES.JAVA,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVA],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.JAVA17]: {
        name: 'Java 17',
        value: CODEBASE_COMMON_FRAMEWORKS.JAVA17,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA17],
      },
      [CODEBASE_COMMON_FRAMEWORKS.JAVA21]: {
        name: 'Java 21',
        value: CODEBASE_COMMON_FRAMEWORKS.JAVA21,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA21],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.GRADLE]: {
        name: 'Gradle',
        value: CODEBASE_COMMON_BUILD_TOOLS.GRADLE,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.GRADLE],
      },
      [CODEBASE_COMMON_BUILD_TOOLS.MAVEN]: {
        name: 'Maven',
        value: CODEBASE_COMMON_BUILD_TOOLS.MAVEN,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.MAVEN],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.OTHER]: {
    language: {
      name: 'Other',
      value: CODEBASE_COMMON_LANGUAGES.OTHER,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.OTHER],
    },
    frameworks: {},
    buildTools: {},
    autoTestReportFrameworks: {
      allure: {
        name: 'allure',
        value: 'allure',
      },
    },
  },
};

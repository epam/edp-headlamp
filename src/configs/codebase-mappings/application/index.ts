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

export type ApplicationLanguageKeys =
  | typeof CODEBASE_COMMON_LANGUAGES.JAVA
  | typeof CODEBASE_COMMON_LANGUAGES.JAVASCRIPT
  | typeof CODEBASE_COMMON_LANGUAGES.PYTHON
  | typeof CODEBASE_COMMON_LANGUAGES.GO
  | typeof CODEBASE_COMMON_LANGUAGES.C_SHARP
  | typeof CODEBASE_COMMON_LANGUAGES.C
  | typeof CODEBASE_COMMON_LANGUAGES.CPP
  | typeof CODEBASE_COMMON_LANGUAGES.HELM
  | typeof CODEBASE_COMMON_LANGUAGES.OTHER;

type ApplicationMappingKey = Extract<CodebaseMappingKey, ApplicationLanguageKeys>;

export type ApplicationMapping = {
  [K in ApplicationMappingKey]: CodebaseInterface;
};

export const APPLICATION_MAPPING: ApplicationMapping = {
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
      [CODEBASE_COMMON_FRAMEWORKS.JAVA25]: {
        name: 'Java 25',
        value: CODEBASE_COMMON_FRAMEWORKS.JAVA25,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.JAVA25],
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
  [CODEBASE_COMMON_LANGUAGES.JAVASCRIPT]: {
    language: {
      name: 'JavaScript',
      value: CODEBASE_COMMON_LANGUAGES.JAVASCRIPT,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.JAVASCRIPT],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.REACT]: {
        name: 'React',
        value: CODEBASE_COMMON_FRAMEWORKS.REACT,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.REACT],
      },
      [CODEBASE_COMMON_FRAMEWORKS.VUE]: {
        name: 'Vue',
        value: CODEBASE_COMMON_FRAMEWORKS.VUE,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.VUE],
      },
      [CODEBASE_COMMON_FRAMEWORKS.ANGULAR]: {
        name: 'Angular',
        value: CODEBASE_COMMON_FRAMEWORKS.ANGULAR,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.ANGULAR],
      },
      [CODEBASE_COMMON_FRAMEWORKS.NEXTJS]: {
        name: 'Next.js',
        value: CODEBASE_COMMON_FRAMEWORKS.NEXTJS,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.NEXTJS],
      },
      [CODEBASE_COMMON_FRAMEWORKS.EXPRESS]: {
        name: 'Express',
        value: CODEBASE_COMMON_FRAMEWORKS.EXPRESS,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.EXPRESS],
      },
      [CODEBASE_COMMON_FRAMEWORKS.ANTORA]: {
        name: 'Antora',
        value: CODEBASE_COMMON_FRAMEWORKS.ANTORA,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.ANTORA],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.NPM]: {
        name: 'NPM',
        value: CODEBASE_COMMON_BUILD_TOOLS.NPM,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.NPM],
      },
      [CODEBASE_COMMON_BUILD_TOOLS.PNPM]: {
        name: 'PNPM',
        value: CODEBASE_COMMON_BUILD_TOOLS.PNPM,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.PNPM],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.PYTHON]: {
    language: {
      name: 'Python',
      value: CODEBASE_COMMON_LANGUAGES.PYTHON,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.PYTHON],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_13]: {
        name: 'Python 3.13',
        value: CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_13,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.PYTHON_3_13],
      },
      [CODEBASE_COMMON_FRAMEWORKS.FASTAPI]: {
        name: 'FastAPI',
        value: CODEBASE_COMMON_FRAMEWORKS.FASTAPI,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.FASTAPI],
      },
      [CODEBASE_COMMON_FRAMEWORKS.FLASK]: {
        name: 'Flask',
        value: CODEBASE_COMMON_FRAMEWORKS.FLASK,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.FLASK],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.PYTHON]: {
        name: 'Python',
        value: CODEBASE_COMMON_BUILD_TOOLS.PYTHON,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.PYTHON],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.GO]: {
    language: {
      name: 'Go',
      value: CODEBASE_COMMON_LANGUAGES.GO,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.GO],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.BEEGO]: {
        name: 'Beego',
        value: CODEBASE_COMMON_FRAMEWORKS.BEEGO,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.BEEGO],
      },
      [CODEBASE_COMMON_FRAMEWORKS.GIN]: {
        name: 'Gin',
        value: CODEBASE_COMMON_FRAMEWORKS.GIN,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.GIN],
      },
      [CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK]: {
        name: 'Operator SDK',
        value: CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.OPERATOR_SDK],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.GO]: {
        name: 'Go',
        value: CODEBASE_COMMON_BUILD_TOOLS.GO,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.GO],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.C_SHARP]: {
    language: {
      name: 'C#',
      value: CODEBASE_COMMON_LANGUAGES.C_SHARP,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.C_SHARP],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1]: {
        name: '.NET 3.1',
        value: CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOTNET_3_1],
      },
      [CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0]: {
        name: '.NET 6.0',
        value: CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.DOTNET_6_0],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.DOTNET]: {
        name: '.NET',
        value: CODEBASE_COMMON_BUILD_TOOLS.DOTNET,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.DOTNET],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.C]: {
    language: {
      name: 'C',
      value: CODEBASE_COMMON_LANGUAGES.C,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.C],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.NONE]: {
        name: 'None',
        value: CODEBASE_COMMON_FRAMEWORKS.NONE,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.NONE],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.MAKE]: {
        name: 'Make',
        value: CODEBASE_COMMON_BUILD_TOOLS.MAKE,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.MAKE],
      },
      [CODEBASE_COMMON_BUILD_TOOLS.C_MAKE]: {
        name: 'CMake',
        value: CODEBASE_COMMON_BUILD_TOOLS.C_MAKE,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.C_MAKE],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.CPP]: {
    language: {
      name: 'C++',
      value: CODEBASE_COMMON_LANGUAGES.CPP,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.CPP],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.NONE]: {
        name: 'None',
        value: CODEBASE_COMMON_FRAMEWORKS.NONE,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.NONE],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.MAKE]: {
        name: 'Make',
        value: CODEBASE_COMMON_BUILD_TOOLS.MAKE,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.MAKE],
      },
      [CODEBASE_COMMON_BUILD_TOOLS.C_MAKE]: {
        name: 'CMake',
        value: CODEBASE_COMMON_BUILD_TOOLS.C_MAKE,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.C_MAKE],
      },
    },
  },
  [CODEBASE_COMMON_LANGUAGES.HELM]: {
    language: {
      name: 'Helm',
      value: CODEBASE_COMMON_LANGUAGES.HELM,
      icon: LANGUAGE_ICON_MAPPING[CODEBASE_COMMON_LANGUAGES.HELM],
    },
    frameworks: {
      [CODEBASE_COMMON_FRAMEWORKS.HELM]: {
        name: 'Helm',
        value: CODEBASE_COMMON_FRAMEWORKS.HELM,
        icon: FRAMEWORK_ICON_MAPPING[CODEBASE_COMMON_FRAMEWORKS.HELM],
      },
    },
    buildTools: {
      [CODEBASE_COMMON_BUILD_TOOLS.HELM]: {
        name: 'Helm',
        value: CODEBASE_COMMON_BUILD_TOOLS.HELM,
        icon: BUILD_TOOL_ICON_MAPPING[CODEBASE_COMMON_BUILD_TOOLS.HELM],
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
  },
};

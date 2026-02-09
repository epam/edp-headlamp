import { CI_TOOL } from '../../constants/ciTools';
import { GIT_PROVIDER } from '../../constants/gitProviders';
import { RESOURCE_ICON_NAMES } from '../../icons/sprites/Resources/names';
import { CONTAINER_REGISTRY_TYPE } from '../../k8s/groups/default/ConfigMap/constants';

export const CODEBASE_ICON_PATTERNS = [
  { pattern: /^javascript$|^js$|^node$|^node\.js$/i, icon: RESOURCE_ICON_NAMES.JAVASCRIPT },
  { pattern: /^c\+\+$|^cpp$/i, icon: RESOURCE_ICON_NAMES.CPP },
  { pattern: /^csharp$/i, icon: RESOURCE_ICON_NAMES.C_SHARP },
  { pattern: /^dotnet$/i, icon: RESOURCE_ICON_NAMES.DOTNET },
  { pattern: /^dotnet(-\d+\.\d+)?$/i, icon: RESOURCE_ICON_NAMES.DOTNET },
  { pattern: /^\.net$/i, icon: RESOURCE_ICON_NAMES.C_SHARP },
  { pattern: /^c$/i, icon: RESOURCE_ICON_NAMES.C },
  { pattern: /^java(\d+)?$/i, icon: RESOURCE_ICON_NAMES.JAVA },
  { pattern: /^python(-\d+\.\d+)?$/i, icon: RESOURCE_ICON_NAMES.PYTHON },
  { pattern: /^groovy$/i, icon: RESOURCE_ICON_NAMES.GROOVY_PIPELINE },
  { pattern: /^hcl$|^terraform$/i, icon: RESOURCE_ICON_NAMES.TERRAFORM },
  { pattern: /^rego$|^opa$/i, icon: RESOURCE_ICON_NAMES.OPA },
  { pattern: /^container$/i, icon: RESOURCE_ICON_NAMES.CONTAINER },
  { pattern: /^helm$/i, icon: RESOURCE_ICON_NAMES.HELM },
  { pattern: /^go$/i, icon: RESOURCE_ICON_NAMES.GO },

  { pattern: /^nextjs$|^next$/i, icon: RESOURCE_ICON_NAMES.NEXTJS },
  { pattern: /^operator-sdk$/i, icon: RESOURCE_ICON_NAMES.OPERATOR_SDK },
  { pattern: /^fastapi$/i, icon: RESOURCE_ICON_NAMES.FASTAPI },
  { pattern: /^react$/i, icon: RESOURCE_ICON_NAMES.REACT },
  { pattern: /^vue$/i, icon: RESOURCE_ICON_NAMES.VUE },
  { pattern: /^express$/i, icon: RESOURCE_ICON_NAMES.EXPRESS },
  { pattern: /^angular$/i, icon: RESOURCE_ICON_NAMES.ANGULAR },
  { pattern: /^antora$/i, icon: RESOURCE_ICON_NAMES.ANTORA },
  { pattern: /^codenarc$/i, icon: RESOURCE_ICON_NAMES.CODENARC },
  { pattern: /^terraform$/i, icon: RESOURCE_ICON_NAMES.TERRAFORM },
  { pattern: /^opa$/i, icon: RESOURCE_ICON_NAMES.OPA },
  { pattern: /^docker$/i, icon: RESOURCE_ICON_NAMES.DOCKER },
  { pattern: /^pipeline$|^tekton$/i, icon: RESOURCE_ICON_NAMES.TEKTON },
  { pattern: /^gitlab$/i, icon: RESOURCE_ICON_NAMES.GITLAB },
  { pattern: /^beego$/i, icon: RESOURCE_ICON_NAMES.BEEGO },
  { pattern: /^flask$/i, icon: RESOURCE_ICON_NAMES.FLASK },
  { pattern: /^charts$/i, icon: RESOURCE_ICON_NAMES.HELM },
  { pattern: /^aws$/i, icon: RESOURCE_ICON_NAMES.AWS },
  { pattern: /^gin$/i, icon: RESOURCE_ICON_NAMES.GIN },
  { pattern: /^gitops$/i, icon: RESOURCE_ICON_NAMES.GIT_OPS },
  { pattern: /^ansible$/i, icon: RESOURCE_ICON_NAMES.ANSIBLE },

  { pattern: /^cmake$/i, icon: RESOURCE_ICON_NAMES.C_MAKE },
  { pattern: /^npm$|^yarn$/i, icon: RESOURCE_ICON_NAMES.NPM },
  { pattern: /^pnpm$/i, icon: RESOURCE_ICON_NAMES.PNPM },
  { pattern: /^gradle$/i, icon: RESOURCE_ICON_NAMES.GRADLE },
  { pattern: /^maven$/i, icon: RESOURCE_ICON_NAMES.MAVEN },
  { pattern: /^kaniko$/i, icon: RESOURCE_ICON_NAMES.KANIKO },
  { pattern: /^make$/i, icon: RESOURCE_ICON_NAMES.MAKE },
] as const;

export const getIconByPattern = (
  value: string | undefined | null,
  fallbackIcon: string = RESOURCE_ICON_NAMES.OTHER
): string => {
  if (!value) {
    return fallbackIcon;
  }

  const normalizedValue = value.toLowerCase();

  const match = CODEBASE_ICON_PATTERNS.find(({ pattern }) => pattern.test(normalizedValue));

  return match ? match.icon : fallbackIcon;
};

export const LANGUAGE_ICON_MAPPING = {
  java: RESOURCE_ICON_NAMES.JAVA,
  javascript: RESOURCE_ICON_NAMES.JAVASCRIPT,
  python: RESOURCE_ICON_NAMES.PYTHON,
  'groovy-pipeline': RESOURCE_ICON_NAMES.GROOVY_PIPELINE,
  hcl: RESOURCE_ICON_NAMES.TERRAFORM,
  rego: RESOURCE_ICON_NAMES.OPA,
  container: RESOURCE_ICON_NAMES.CONTAINER,
  helm: RESOURCE_ICON_NAMES.HELM,
  go: RESOURCE_ICON_NAMES.GO,
  csharp: RESOURCE_ICON_NAMES.C_SHARP,
  c: RESOURCE_ICON_NAMES.C,
  cpp: RESOURCE_ICON_NAMES.CPP,
  other: RESOURCE_ICON_NAMES.OTHER,
} as const;

export const FRAMEWORK_ICON_MAPPING = {
  java8: RESOURCE_ICON_NAMES.JAVA,
  java11: RESOURCE_ICON_NAMES.JAVA,
  java17: RESOURCE_ICON_NAMES.JAVA,
  java21: RESOURCE_ICON_NAMES.JAVA,
  java25: RESOURCE_ICON_NAMES.JAVA,
  'dotnet-3.1': RESOURCE_ICON_NAMES.DOTNET,
  'dotnet-6.0': RESOURCE_ICON_NAMES.DOTNET,
  'python-3.8': RESOURCE_ICON_NAMES.PYTHON,
  react: RESOURCE_ICON_NAMES.REACT,
  codenarc: RESOURCE_ICON_NAMES.CODENARC,
  terraform: RESOURCE_ICON_NAMES.TERRAFORM,
  opa: RESOURCE_ICON_NAMES.OPA,
  docker: RESOURCE_ICON_NAMES.DOCKER,
  pipeline: RESOURCE_ICON_NAMES.TEKTON,
  'operator-sdk': RESOURCE_ICON_NAMES.OPERATOR_SDK,
  beego: RESOURCE_ICON_NAMES.BEEGO,
  flask: RESOURCE_ICON_NAMES.FLASK,
  fastapi: RESOURCE_ICON_NAMES.FASTAPI,
  vue: RESOURCE_ICON_NAMES.VUE,
  next: RESOURCE_ICON_NAMES.NEXTJS,
  express: RESOURCE_ICON_NAMES.EXPRESS,
  angular: RESOURCE_ICON_NAMES.ANGULAR,
  helm: RESOURCE_ICON_NAMES.HELM,
  charts: RESOURCE_ICON_NAMES.HELM,
  aws: RESOURCE_ICON_NAMES.AWS,
  gin: RESOURCE_ICON_NAMES.GIN,
  antora: RESOURCE_ICON_NAMES.ANTORA,
  gitops: RESOURCE_ICON_NAMES.GIT_OPS,
  ansible: RESOURCE_ICON_NAMES.ANSIBLE,
  none: RESOURCE_ICON_NAMES.NONE,
} as const;

export const BUILD_TOOL_ICON_MAPPING = {
  gradle: RESOURCE_ICON_NAMES.GRADLE,
  maven: RESOURCE_ICON_NAMES.MAVEN,
  npm: RESOURCE_ICON_NAMES.NPM,
  dotnet: RESOURCE_ICON_NAMES.DOTNET,
  go: RESOURCE_ICON_NAMES.GO,
  python: RESOURCE_ICON_NAMES.PYTHON,
  codenarc: RESOURCE_ICON_NAMES.CODENARC,
  terraform: RESOURCE_ICON_NAMES.TERRAFORM,
  opa: RESOURCE_ICON_NAMES.OPA,
  kaniko: RESOURCE_ICON_NAMES.KANIKO,
  helm: RESOURCE_ICON_NAMES.HELM,
  make: RESOURCE_ICON_NAMES.MAKE,
  cmake: RESOURCE_ICON_NAMES.C_MAKE,
  pnpm: RESOURCE_ICON_NAMES.PNPM,
} as const;

export const CI_TOOL_ICON_MAPPING = {
  [CI_TOOL.TEKTON]: RESOURCE_ICON_NAMES.TEKTON,
  [CI_TOOL.GITLAB]: RESOURCE_ICON_NAMES.GITLAB,
} as const;

export const GIT_PROVIDER_ICON_MAPPING = {
  [GIT_PROVIDER.GERRIT]: RESOURCE_ICON_NAMES.GERRIT,
  [GIT_PROVIDER.GITHUB]: RESOURCE_ICON_NAMES.GITHUB,
  [GIT_PROVIDER.GITLAB]: RESOURCE_ICON_NAMES.GITLAB,
  [GIT_PROVIDER.BITBUCKET]: RESOURCE_ICON_NAMES.BITBUCKET,
} as const;

export const REGISTRY_TYPE_ICON_MAPPING = {
  [CONTAINER_REGISTRY_TYPE.ECR]: RESOURCE_ICON_NAMES.ECR,
  [CONTAINER_REGISTRY_TYPE.HARBOR]: RESOURCE_ICON_NAMES.HARBOR,
  [CONTAINER_REGISTRY_TYPE.DOCKER_HUB]: RESOURCE_ICON_NAMES.DOCKER,
  [CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY]: RESOURCE_ICON_NAMES.OPENSHIFT,
  [CONTAINER_REGISTRY_TYPE.NEXUS]: RESOURCE_ICON_NAMES.NEXUS,
  [CONTAINER_REGISTRY_TYPE.GHCR]: RESOURCE_ICON_NAMES.GITHUB,
} as const;

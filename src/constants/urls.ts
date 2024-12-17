const EDP_USER_GUIDE_ROOT_URL = 'https://docs.kuberocketci.io/docs/user-guide';
const EDP_OPERATOR_GUIDE_ROOT_URL = 'https://docs.kuberocketci.io/docs/operator-guide';

export const EDP_USER_GUIDE = {
  OVERVIEW: {
    url: EDP_USER_GUIDE_ROOT_URL,
  },
  MARKETPLACE_OVERVIEW: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/marketplace`,
  },
  MARKETPLACE_CREATE_APP: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-marketplace`,
    anchors: {
      ADD_COMPONENT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-marketplace/#add-component`,
      },
    },
  },
  APPLICATION_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/application`,
    anchors: {
      CHECK_AND_REMOVE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/application#check-and-remove-application`,
      },
      EDIT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/application#edit-existing-application`,
      },
    },
  },
  APPLICATION_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-application`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-application#create-application-in-yaml`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-application#create-application-via-ui`,
      },
      CODEBASE_INFO: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-application#codebase-info-menu`,
      },
      ADVANCED_SETTINGS: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-application#advanced-settings-menu`,
      },
    },
  },
  AUTOTEST_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/autotest`,
    anchors: {
      CHECK_AND_REMOVE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/autotest#check-and-remove-autotest`,
      },
      EDIT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/autotest#edit-existing-autotest`,
      },
      AUTOTEST_AS_QG: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/autotest#add-autotest-as-a-quality-gate`,
      },
      CONFIGURE_AT_SPECIFIC_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/autotest#configure-autotest-launch-at-specific-stage`,
      },
      LAUNCH_LOCALLY: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/autotest#launch-autotest-locally`,
      },
    },
  },
  AUTOTEST_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-autotest`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-autotest#create-autotest-in-yaml`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-autotest#create-autotest-via-ui`,
      },
      CODEBASE_INFO: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-autotest#the-codebase-info-menu`,
      },
      ADVANCED_SETTINGS: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-autotest#the-advanced-settings-menu`,
      },
    },
  },
  LIBRARY_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/library`,
    anchors: {
      CHECK_AND_REMOVE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/library#check-and-remove-library`,
      },
      EDIT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/library#edit-existing-library`,
      },
    },
  },
  LIBRARY_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-library`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-library#create-library-in-yaml`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-library#create-library-via-ui`,
      },
      CODEBASE_INFO: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-library#the-codebase-info-menu`,
      },
      ADVANCED_SETTINGS: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-library#the-advanced-settings-menu`,
      },
    },
  },
  INFRASTRUCTURE_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/infrastructure`,
    anchors: {
      CHECK_AND_REMOVE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/infrastructure#check-and-remove-application`,
      },
      EDIT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/infrastructure#edit-existing-infrastructure`,
      },
    },
  },
  INFRASTRUCTURE_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-infrastructure`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-infrastructure#create-infrastructure-in-yaml`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-infrastructure#create-infrastructure-via-ui`,
      },
      CODEBASE_INFO: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-infrastructure#codebase-info-menu`,
      },
      ADVANCED_SETTINGS: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-infrastructure#advanced-settings-menu`,
      },
    },
  },
  BRANCHES_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/manage-branches`,
    anchors: {
      ADD_BRANCH: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-branches#add-new-branch`,
      },
      BUILD_BRANCH: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-branches#build-branch`,
      },
      DELETE_BRANCH: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-branches#delete-branch`,
      },
    },
  },
  CD_PIPELINE_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline#create-environment-in-yaml`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline#create-environment-using-ui`,
      },
      PIPELINE_MENU: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline#the-pipeline-menu`,
      },
      APPLICATIONS_MENU: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline#the-applications-menu`,
      },
      STAGES_MENU: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-cd-pipeline#the-stages-menu`,
      },
    },
  },
  CD_PIPELINE_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments`,
    anchors: {
      EDIT: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#edit-existing-environment`,
      },
      ADD_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#add-a-new-stage`,
      },
      EDIT_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#edit-stage`,
      },
      DELETE_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#delete-stage`,
      },
      VIEW_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#view-stage-data`,
      },
      DEPLOY_APPLICATION: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/manage-environments#deploy-application`,
      },
    },
  },
  VARIABLES_INJECTION: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/cd-pipeline-variables-injection`,
  },
  QUALITY_GATE_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-quality-gate`,
    anchors: {
      APPLY: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-quality-gate#apply-new-quality-gate-to-pipelines`,
      },
      RUN: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-quality-gate#run-quality-gate`,
      },
      ADD_STAGE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-quality-gate#add-stage-for-quality-gate`,
      },
    },
  },
  GIT_SERVER_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-git-server`,
    anchors: {
      CREATE_IN_YAML: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-git-server`,
      },
      CREATE_VIA_UI: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/add-git-server`,
      },
    },
  },
  GIT_SERVER_MANAGE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/git-server-overview`,
    anchors: {
      VIEW_DATA: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/git-server-overview`,
      },
      DELETE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/git-server-overview#delete-git-server`,
      },
    },
  },
  CLUSTER_CREATE: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/add-cluster`,
  },
  MANAGE_CLUSTER: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/cluster`,
    anchors: {
      VIEW_DATA: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/cluster#view-authentication-data`,
      },
      DELETE: {
        url: `${EDP_USER_GUIDE_ROOT_URL}/cluster#delete-cluster`,
      },
    },
  },
  GIT_OPS: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/gitops`,
  },
  REGISTRY: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/manage-container-registries`,
  },
  CONFIGURATION: {
    url: `${EDP_USER_GUIDE_ROOT_URL}/configuration-overview`,
  },
};

export const EDP_OPERATOR_GUIDE = {
  NEXUS: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/nexus-sonatype`,
    anchors: {
      PREREQUISITES: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/nexus-sonatype#prerequisites`,
      },
      INSTALLATION: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/nexus-sonatype#installation`,
      },
      CONFIGURATION: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/nexus-sonatype#configuration`,
      },
    },
  },
  SONAR: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/code-quality/sonarqube`,
    anchors: {
      PREREQUISITES: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/code-quality/sonarqube#prerequisites`,
      },
      INSTALLATION: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/code-quality/sonarqube#installation`,
      },
      CONFIGURATION: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/code-quality/sonarqube#configuration`,
      },
    },
  },
  CONTAINER_REGISTRY_HARBOR: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/harbor-integration`,
    anchors: {
      OVERVIEW: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/harbor-integration#overview`,
      },
      INTEGRATION_PROCEDURE: {
        url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/artifacts-management/harbor-integration#integration-procedure`,
      },
    },
  },
  DEPENDENCY_TRACK: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/devsecops/dependency-track`,
  },
  JIRA: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/project-management-and-reporting/jira-integration`,
  },
  DEFECT_DOJO: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/devsecops/defectdojo`,
  },
  ARGO_CD: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/cd/argocd-integration`,
  },
  O_AUTH: {
    url: `${EDP_OPERATOR_GUIDE_ROOT_URL}/auth/oauth2-proxy`,
  },
};

import { ArgoCDURLService } from './argocd';
import { GitURLService } from './git';
import { GrafanaURLService } from './grafana';
import { JaegerURLService } from './jaeger';
import { KibanaURLService } from './kibana';
import { SonarQubeURLService } from './sonar';
import { TektonURLService } from './tekton';

export const createURLObjectFromURLOrigin = (urlOrigin: string) => {
    if (!urlOrigin) {
        throw new Error(`URL Origin should be a string`);
    }

    return new URL(urlOrigin);
};

export const LinkCreationService = {
    argocd: {
        ...ArgoCDURLService,
    },
    tekton: {
        ...TektonURLService,
    },
    sonar: {
        ...SonarQubeURLService,
    },
    grafana: {
        ...GrafanaURLService,
    },
    jaeger: {
        ...JaegerURLService,
    },
    kibana: {
        ...KibanaURLService,
    },
    git: {
        ...GitURLService,
    },
};

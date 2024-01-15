import { isValidURL } from '../../utils/checks/isValidURL';
import { ArgoCDURLService } from './argocd';
import { DepTrackURLService } from './deptrack';
import { GitURLService } from './git';
import { GrafanaURLService } from './grafana';
import { JaegerURLService } from './jaeger';
import { KibanaURLService } from './kibana';
import { SonarQubeURLService } from './sonar';
import { TektonURLService } from './tekton';

export const createURLObjectFromURLOrigin = (urlOrigin: string) => {
    const _urlOrigin = urlOrigin.trim();

    const isValidURLGiven = isValidURL(_urlOrigin);

    if (!isValidURLGiven) {
        console.error('Given URL is not valid.');
        return undefined;
    }

    return new URL(_urlOrigin);
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
    depTrack: {
        ...DepTrackURLService,
    },
};

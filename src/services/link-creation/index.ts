import { ArgoCDURLService } from './argocd';
import { DepTrackURLService } from './deptrack';
import { GitURLService } from './git';
import { GrafanaURLService } from './grafana';
import { JaegerURLService } from './jaeger';
import { KibanaURLService } from './kibana';
import { SonarQubeURLService } from './sonar';
import { TektonURLService } from './tekton';

export const createURLObjectFromURLOrigin = (urlOrigin: string) => {
  try {
    const _urlOrigin = urlOrigin.trim();

    return new URL(_urlOrigin);
  } catch (error) {
    throw new Error(`Error while creating URL object: ${error}`);
  }
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

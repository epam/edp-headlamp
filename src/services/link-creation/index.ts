import { ArgoCDURLService } from './argocd';
import { DepTrackURLService } from './deptrack';
import { GitURLService } from './git';
import { JaegerURLService } from './jaeger';
import { LoggingURLService } from './logging';
import { MonitoringURLService } from './monitoring';
import { SonarQubeURLService } from './sonar';

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
  sonar: {
    ...SonarQubeURLService,
  },
  monitoring: {
    ...MonitoringURLService,
  },
  jaeger: {
    ...JaegerURLService,
  },
  logging: {
    ...LoggingURLService,
  },
  git: {
    ...GitURLService,
  },
  depTrack: {
    ...DepTrackURLService,
  },
};

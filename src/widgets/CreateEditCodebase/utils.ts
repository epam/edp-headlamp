import { CODEBASE_CREATION_STRATEGIES } from '../../constants/creationStrategies';

export const isCloneStrategy = strategyValue =>
  strategyValue === CODEBASE_CREATION_STRATEGIES.CLONE;

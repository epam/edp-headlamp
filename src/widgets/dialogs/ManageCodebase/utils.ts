import { CODEBASE_CREATION_STRATEGY } from '../../../constants/creationStrategies';

export const isCloneStrategy = (strategyValue: string) =>
  strategyValue === CODEBASE_CREATION_STRATEGY.CLONE;

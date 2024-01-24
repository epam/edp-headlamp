import { UseMutationResult } from 'react-query';

export const getMutualLoadingStatusFromMutations = (mutations: UseMutationResult[]) =>
  mutations.some((mutation) => mutation.isLoading);

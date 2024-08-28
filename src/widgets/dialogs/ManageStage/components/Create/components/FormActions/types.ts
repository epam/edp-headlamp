import React from 'react';
import { StageKubeObjectInterface } from '../../../../../../../k8s/groups/EDP/Stage/types';

export interface FormActionsProps {
  setFormActiveTabIdx: React.Dispatch<React.SetStateAction<number>>;
  formActiveTabIdx: number;
  setStages: React.Dispatch<React.SetStateAction<StageKubeObjectInterface[]>>;
  stages: StageKubeObjectInterface[];
}

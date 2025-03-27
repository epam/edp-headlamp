export interface Application {
  label: string;
  value: string;
  availableBranches: {
    specBranchName: string;
    metadataBranchName: string;
  }[];
  isUsed: boolean;
  chosenBranch: string;
  toPromote: boolean;
}

export interface ApplicationRowType {
  appName: string;
  appBranch: string;
  appToPromote: string;
}

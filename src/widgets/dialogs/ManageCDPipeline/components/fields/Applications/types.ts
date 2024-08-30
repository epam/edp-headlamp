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

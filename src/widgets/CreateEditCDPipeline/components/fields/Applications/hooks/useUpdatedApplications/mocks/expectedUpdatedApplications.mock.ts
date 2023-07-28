export const expectedUpdatedApplicationsMock = [
    {
        label: 'test-app-2',
        value: 'test-app-2',
        isUsed: true,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: 'test-application-master',
        toPromote: true,
    },
    {
        label: 'test-application',
        value: 'test-application',
        isUsed: true,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: 'test-application-master',
        toPromote: true,
    },
    {
        label: 'test-edp-gerrit-operator',
        value: 'test-edp-gerrit-operator',
        isUsed: false,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: 'test-application-master',
        toPromote: false,
    },
];
export const expectedUpdatedApplicationsWithEmptyValuesMock = [
    {
        label: 'test-app-2',
        value: 'test-app-2',
        isUsed: false,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: null,
        toPromote: false,
    },
    {
        label: 'test-application',
        value: 'test-application',
        isUsed: false,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: null,
        toPromote: false,
    },
    {
        label: 'test-edp-gerrit-operator',
        value: 'test-edp-gerrit-operator',
        isUsed: false,
        availableBranches: [
            {
                specBranchName: 'develop',
                metadataBranchName: 'test-application-develop',
            },
            {
                specBranchName: 'master',
                metadataBranchName: 'test-application-master',
            },
            {
                specBranchName: 'test-branch',
                metadataBranchName: 'test-application-test-branch',
            },
        ],
        chosenBranch: null,
        toPromote: false,
    },
];

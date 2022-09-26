export const expectedUpdatedApplicationsMock = [
    {
        label: 'test-app-2',
        value: 'test-app-2',
        isUsed: true,
        availableBranches: [
            'test-application-develop',
            'test-application-master',
            'test-application-test-branch',
        ],
        chosenBranch: 'test-application-master',
        toPromote: true,
    },
    {
        label: 'test-application',
        value: 'test-application',
        isUsed: true,
        availableBranches: [
            'test-application-develop',
            'test-application-master',
            'test-application-test-branch',
        ],
        chosenBranch: 'test-application-master',
        toPromote: true,
    },
    {
        label: 'test-edp-gerrit-operator',
        value: 'test-edp-gerrit-operator',
        isUsed: false,
        availableBranches: [
            'test-application-develop',
            'test-application-master',
            'test-application-test-branch',
        ],
        chosenBranch: 'test-application-master',
        toPromote: false,
    },
];

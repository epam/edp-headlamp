import { SelectOption } from '../types/forms';

export const getGitServers: (namespace: string) => SelectOption[] = (namespace: string) => {
    return [
        {
            label: namespace ? `gerrit.${namespace}` : 'gerrit',
            value: 'gerrit',
        },
        {
            label: 'git.epam.com',
            value: 'git-epam',
        },
        {
            label: 'github.com',
            value: 'github',
        },
    ];
};

module.exports = {
    coverageDirectory: './analysis/coverage/',
    moduleNameMapper: {
        '^@kinvolk/headlamp-plugin/lib$': '<rootDir>/mocks/headlamp-plugin/lib/index.ts',
        '^@kinvolk/headlamp-plugin/lib/K8s/(.*)': ['<rootDir>/mocks/headlamp-plugin/lib/k8s/$1'],
        '^@kinvolk/headlamp-plugin/lib/CommonComponents': [
            '<rootDir>/mocks/headlamp-plugin/components/common/index.tsx',
        ],
        '^@kinvolk/headlamp-plugin/lib/components/common': [
            '<rootDir>/mocks/headlamp-plugin/components/common/index.tsx',
        ],
    },
};

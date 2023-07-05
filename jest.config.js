module.exports = {
    coverageDirectory: './analysis/coverage/',
    moduleNameMapper: {
        '^@kinvolk/headlamp-plugin/lib$': '<rootDir>/tests/headlamp-plugin/lib/index.ts',
        '^@kinvolk/headlamp-plugin/lib/K8s/(.*)': ['<rootDir>/tests/headlamp-plugin/lib/k8s/$1'],
        '^@kinvolk/headlamp-plugin/lib/CommonComponents': [
            '<rootDir>/tests/headlamp-plugin/components/common/index.tsx',
        ],
        '^@kinvolk/headlamp-plugin/lib/components/common': [
            '<rootDir>/tests/headlamp-plugin/components/common/index.tsx',
        ],
    },
};

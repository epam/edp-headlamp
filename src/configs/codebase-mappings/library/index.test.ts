import { describe, expect, it } from '@jest/globals';
import { getLibraryRecommendedJenkinsAgent } from './index';

type TestCase = {
    testName: string;
    args: [string, string?, string?];
    expected: string | undefined;
};

describe('getLibraryRecommendedJenkinsAgent', () => {
    const testCases: TestCase[] = [
        {
            testName: 'should return undefined for invalid parameters',
            args: ['foo-bar'],
            expected: undefined,
        },
        {
            testName: 'should map java 8 library with maven',
            args: ['Java', 'java8', 'maven'],
            expected: 'maven-java8',
        },
        {
            testName: 'should map java 11 library with maven',
            args: ['Java', 'java11', 'maven'],
            expected: 'maven-java11',
        },
        {
            testName: 'should map java 11 library with gradle',
            args: ['Java', 'java11', 'gradle'],
            expected: 'gradle-java11',
        },
        {
            testName: 'should return undefined if java build tool is not specified',
            args: ['Java', 'java11'],
            expected: undefined,
        },
        {
            testName: 'should map JavaScript to NPM',
            args: ['JavaScript'],
            expected: 'npm',
        },
        {
            testName: 'should map DotNet 2.1 library',
            args: ['DotNet', 'dotnet-2.1'],
            expected: 'dotnet-dotnet-2.1',
        },
        {
            testName: 'should map DotNet 3.1 library',
            args: ['DotNet', 'dotnet-3.1'],
            expected: 'dotnet-dotnet-3.1',
        },
        {
            testName: 'should return undefined if DotNet framework is not specified',
            args: ['DotNet'],
            expected: undefined,
        },
        {
            testName: 'should map Python to Python 3.8',
            args: ['Python'],
            expected: 'python-3.8',
        },
        {
            testName: 'should map groovy to codenarc',
            args: ['groovy-pipeline'],
            expected: 'codenarc',
        },
        {
            testName: 'should map rego to opa',
            args: ['rego'],
            expected: 'opa',
        },
        {
            testName: 'should map container to Kaniko',
            args: ['container'],
            expected: 'kaniko-docker',
        },
    ];

    for (const testCase of testCases) {
        it(testCase.testName, () => {
            const result = getLibraryRecommendedJenkinsAgent(...testCase.args);

            expect(result).toBe(testCase.expected);
        });
    }
});

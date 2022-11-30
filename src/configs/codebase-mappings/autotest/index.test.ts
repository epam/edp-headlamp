import { describe, expect, it } from '@jest/globals';
import { getAutotestRecommendedJenkinsAgent } from './index';

type TestCase = {
    testName: string;
    args: [string, string?, string?];
    expected: string | undefined;
};

describe('getAutotestRecommendedJenkinsAgent', () => {
    const testCases: TestCase[] = [
        {
            testName: 'should return undefined for invalid parameters',
            args: ['foo-bar'],
            expected: undefined,
        },
        {
            testName: 'should map java 8 library with maven',
            args: ['java', 'java8', 'maven'],
            expected: 'maven-java8',
        },
        {
            testName: 'should map java 11 library with maven',
            args: ['java', 'java11', 'maven'],
            expected: 'maven-java11',
        },
        {
            testName: 'should map java 11 library with gradle',
            args: ['java', 'java11', 'gradle'],
            expected: 'gradle-java11',
        },
        {
            testName: 'should return undefined if java build tool is not specified',
            args: ['java', 'java11'],
            expected: undefined,
        },
    ];

    for (const testCase of testCases) {
        it(testCase.testName, () => {
            const result = getAutotestRecommendedJenkinsAgent(...testCase.args);

            expect(result).toBe(testCase.expected);
        });
    }
});

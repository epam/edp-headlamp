import { createJaegerLink } from './index';

describe('test createJaegerLink util', () => {
    it('should successfully create jaeger url based on given createJaegerLink and argo application name params', () => {
        expect(
            createJaegerLink(
                'https://jaeger.eks-sandbox.aws.main.edp.projects.epam.com',
                'test-app-name'
            )
        ).toEqual(
            'https://jaeger.eks-sandbox.aws.main.edp.projects.epam.com/search?limit=20&lookback=1h&maxDuration&minDuration&service=test-app-name'
        );
    });
});

import { createSonarLink } from './index';

describe('test createGrafanaLink util', () => {
    it('should successfully create grafana url based on given grafanaURLOrigin and namespace params', () => {
        expect(
            createSonarLink(
                {
                    sonar: 'https://sonar-edp-delivery-vp-dev.eks-sandbox.aws.main.edp.projects.epam.com',
                },
                'test-codebaseBranch-name'
            )
        ).toEqual(
            'https://sonar-edp-delivery-vp-dev.eks-sandbox.aws.main.edp.projects.epam.com/dashboard?id=test-codebaseBranch-name'
        );
    });
});

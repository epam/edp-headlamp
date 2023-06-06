import { createGrafanaLink } from './index';

describe('test createGrafanaLink util', () => {
    it('should successfully create grafana url based on given grafanaURLOrigin and namespace params', () => {
        expect(
            createGrafanaLink(
                {
                    grafana: 'https://grafana.eks-sandbox.aws.main.edp.projects.epam.com',
                },
                'test-namespace'
            )
        ).toEqual(
            'https://grafana.eks-sandbox.aws.main.edp.projects.epam.com/d/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=test-namespace'
        );
    });
});

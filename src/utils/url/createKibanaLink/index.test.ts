import { createKibanaLink } from './index';

describe('test createKibanaLink util', () => {
    it('should successfully create kibana url based on given kibanaURLOrigin and namespace params', () => {
        expect(
            createKibanaLink(
                'https://kibana.eks-sandbox.aws.main.edp.projects.epam.com',
                'test-namespace'
            )
        ).toEqual(
            "https://kibana.eks-sandbox.aws.main.edp.projects.epam.com/app/discover#/?_g=()&_a=(columns:!(),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:test-namespace),type:phrase),query:(match_phrase:(kubernetes_namespace_name:test-namespace)))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
        );
    });
});

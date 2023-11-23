import { KibanaURLService } from './index';

describe('testing link-creation KibanaURLService', () => {
    it('should successfully create kibana url based on given kibanaURLOrigin and namespace params', () => {
        expect(
            KibanaURLService.createDashboardLink('https://kibana-test.com', 'test-namespace')
        ).toEqual(
            "https://kibana-test.com/app/discover#/?_g=()&_a=(columns:!(message),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,key:kubernetes_namespace_name,negate:!f,params:(query:test-namespace),type:phrase),query:(match_phrase:(kubernetes_namespace_name:test-namespace)))),interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
        );
    });
});

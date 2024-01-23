import { JaegerURLService } from './index';

describe('testing link-creation JaegerURLService', () => {
  it('should successfully create jaeger url based on given createJaegerLink and argo application name params', () => {
    expect(
      JaegerURLService.createDashboardLink('https://jaeger-test.com', 'test-app-name')
    ).toEqual(
      'https://jaeger-test.com/search?limit=20&lookback=1h&maxDuration&minDuration&service=test-app-name'
    );
  });
});

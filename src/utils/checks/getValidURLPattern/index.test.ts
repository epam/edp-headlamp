import { VALIDATED_PROTOCOL } from '../../../constants/validatedProtocols';
import { getValidURLPattern } from './index';

describe('URL validation', () => {
  it('should return true for valid http url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTP).test('http://google.com')).toBe(true);
  });

  it('should return false for non valid https url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTPS).test('http://google.com')).toBe(
      false
    );
  });

  it('should return true for valid https url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTPS).test('https://google.com')).toBe(
      true
    );
  });

  it('should return false for non valid http url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTP).test('https://google.com')).toBe(
      false
    );
  });

  it('should return true for valid no protocol url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.NO_PROTOCOL).test('google.com')).toBe(true);
  });

  it('should return false for non valid no protocol url', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.NO_PROTOCOL).test('https://google.com')).toBe(
      false
    );
  });

  it('should return false for invalid url without http or https protocol', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTP).test('google.com')).toBe(false);
  });

  it('should return false for invalid url with incorrect syntax', () => {
    expect(getValidURLPattern(VALIDATED_PROTOCOL.STRICT_HTTP).test('htttttp://google')).toBe(false);
  });
});

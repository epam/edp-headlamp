import { safeDecode, safeEncode } from './index';

describe('testing safeDecode function', () => {
  it('should return decoded value', () => {
    const value = 'dGVzdC10b2tlbg==';
    const decodedValue = safeDecode(value);
    expect(decodedValue).toEqual('test-token');
  });
  it('should return safe value when given parameter is undefined', () => {
    const value = '';
    const decodedValue = safeDecode(value);
    expect(decodedValue).toBe('');
  });
});

describe('testing safeEncode function', () => {
  it('should return encoded value', () => {
    const value = 'test-token';
    const encodedValue = safeEncode(value);
    expect(encodedValue).toEqual('dGVzdC10b2tlbg==');
  });
});

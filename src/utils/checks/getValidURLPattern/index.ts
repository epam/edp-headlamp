import { VALIDATED_PROTOCOL } from '../../../constants/validatedProtocols';
import { ValueOf } from '../../../types/global';

export const getValidURLPattern = (protocol: ValueOf<typeof VALIDATED_PROTOCOL>): RegExp => {
  if (protocol === undefined) throw Error(`Invalid protocol: ${protocol}`);

  const protocols = {
    [VALIDATED_PROTOCOL.STRICT_HTTP]: '^(http:\\/\\/)',
    [VALIDATED_PROTOCOL.STRICT_HTTPS]: '^(https:\\/\\/)',
    [VALIDATED_PROTOCOL.HTTP_OR_HTTPS]: '^(http:\\/\\/|https:\\/\\/)',
    [VALIDATED_PROTOCOL.NO_PROTOCOL]: '^',
  };

  const protocolPattern = protocols[protocol] || '';

  const pattern = new RegExp(
    // protocol
    `${protocolPattern}` +
      // domain name or IP address
      '(?:(?:[a-z\\d-]+\\.)*[a-z\\d-]+|\\d{1,3}(?:\\.\\d{1,3}){3})' +
      // optional port number
      '(\\:\\d+)?' +
      // path
      '(\\/\\S*)?' +
      // anchor
      '(#\\S*)?' +
      // end of line
      '$',
    'i'
  );

  return pattern;
};

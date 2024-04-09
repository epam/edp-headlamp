import { VALIDATED_PROTOCOLS } from '../../../constants/validatedProtocols';
import { ValueOf } from '../../../types/global';

export const getValidURLPattern = (protocol: ValueOf<typeof VALIDATED_PROTOCOLS>): RegExp => {
  if (protocol === undefined) throw Error(`Invalid protocol: ${protocol}`);

  const protocols = {
    [VALIDATED_PROTOCOLS.STRICT_HTTP]: '^(http:\\/\\/)',
    [VALIDATED_PROTOCOLS.STRICT_HTTPS]: '^(https:\\/\\/)',
    [VALIDATED_PROTOCOLS.HTTP_OR_HTTPS]: '^(http:\\/\\/|https:\\/\\/)',
    [VALIDATED_PROTOCOLS.NO_PROTOCOL]: '^',
  };

  const protocolPattern = protocols[protocol] || '';

  const pattern = new RegExp(
    // protocol
    `${protocolPattern}` +
      // domain name or IP address
      '(?:(?:[a-z\\d-]+\\.)*[a-z]{2,}|\\d{1,3}(?:\\.\\d{1,3}){3})' +
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

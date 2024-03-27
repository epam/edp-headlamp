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
    `${protocolPattern}` +
      '(([a-z\\d]([a-z\\d-]*[a-z\\d])*\\.?)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  return pattern;
};

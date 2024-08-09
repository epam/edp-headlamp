import * as sanitizeHtml from 'sanitize-html';

export const sanitizeMessage = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), // example of adding 'img' to the default allowed tags
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
    },
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag: {
      a: ['http', 'https', 'ftp', 'mailto'],
      img: ['http', 'https'],
    },
    allowProtocolRelative: true,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
    forbiddenTags: ['style', 'script', 'iframe', 'form'],
    forbiddenAttributes: ['style', 'onerror', 'onload', 'onclick'],
  });

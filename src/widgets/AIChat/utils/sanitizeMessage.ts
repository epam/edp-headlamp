import DOMPurify from 'dompurify';

export const sanitizeMessage = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'a', 'hr', 'br'],
    ALLOWED_ATTR: ['href', 'target'],

    ALLOW_UNKNOWN_PROTOCOLS: false,

    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):)/i,

    ADD_ATTR: ['rel'],
    ADD_TAGS: ['u'],
    FORBID_TAGS: [
      'style',
      'script',
      'iframe',
      'form',
      'input',
      'button',
      'select',
      'textarea',
      'noscript',
      'embed',
      'object',
      'base',
      'link',
    ],
    FORBID_ATTR: ['style', 'on*', 'background', 'srcset', 'formaction', 'form', 'xlink:href'],
  });
};

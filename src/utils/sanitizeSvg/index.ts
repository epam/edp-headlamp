import DOMPurify from 'dompurify';

/**
 * Sanitizes a base64-encoded SVG string to prevent XSS attacks.
 *
 * This function:
 * 1. Decodes the base64 string to get the SVG content
 * 2. Sanitizes the SVG using DOMPurify to remove dangerous elements like <script> tags
 * 3. Re-encodes the sanitized SVG back to base64
 *
 * @param base64Svg - The base64-encoded SVG string to sanitize
 * @returns The sanitized base64-encoded SVG string, or the original if decoding fails
 */
export const sanitizeSvgBase64 = (base64Svg: string | undefined): string => {
  if (!base64Svg) {
    return '';
  }

  try {
    // Decode the base64 string
    const decodedSvg = atob(base64Svg);

    // Configure DOMPurify to be strict with SVG content
    const config = {
      USE_PROFILES: { svg: true, svgFilters: true },
      // Forbid tags that can execute scripts
      FORBID_TAGS: ['script', 'object', 'embed', 'foreignObject', 'iframe'],
      // Forbid attributes that can execute scripts
      FORBID_ATTR: [
        'onerror',
        'onload',
        'onclick',
        'onmouseover',
        'onmouseout',
        'onmouseenter',
        'onmouseleave',
        'onfocus',
        'onblur',
        'onchange',
        'oninput',
        'onsubmit',
        'onreset',
        'onkeydown',
        'onkeyup',
        'onkeypress',
      ],
    };

    // Sanitize the SVG content
    const sanitizedSvg = DOMPurify.sanitize(decodedSvg, config);

    // Re-encode to base64
    return btoa(sanitizedSvg);
  } catch (error) {
    console.error('Failed to sanitize SVG:', error);
    // Return empty string on error to prevent potentially malicious content from being rendered
    return '';
  }
};

/**
 * Validates if a base64-encoded SVG contains potentially dangerous content.
 *
 * @param base64Svg - The base64-encoded SVG string to validate
 * @returns An error message if the SVG is invalid or contains dangerous content, undefined otherwise
 */
export const validateSvgBase64 = (base64Svg: string): string | undefined => {
  if (!base64Svg) {
    return 'SVG content is required';
  }

  try {
    // Try to decode the base64 string
    const decodedSvg = atob(base64Svg);

    // Check if it's actually SVG content
    if (!decodedSvg.trim().startsWith('<svg')) {
      return 'Invalid SVG format. Content must start with <svg> tag';
    }

    // Check for dangerous tags
    const dangerousTags = ['<script', '<object', '<embed', '<foreignObject', '<iframe'];
    const hasDangerousTags = dangerousTags.some((tag) =>
      decodedSvg.toLowerCase().includes(tag.toLowerCase())
    );

    if (hasDangerousTags) {
      return 'SVG contains forbidden elements (script, object, embed, foreignObject, iframe)';
    }

    // Check for event handlers
    const eventHandlerPattern = /\bon\w+\s*=/i;
    if (eventHandlerPattern.test(decodedSvg)) {
      return 'SVG contains forbidden event handlers (onclick, onload, etc.)';
    }

    return undefined;
  } catch (error) {
    console.error('Failed to validate SVG:', error);
    return 'Invalid base64 encoding';
  }
};

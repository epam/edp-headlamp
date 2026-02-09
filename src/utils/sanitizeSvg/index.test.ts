import { describe, it, expect } from '@jest/globals';
import { sanitizeSvgBase64, validateSvgBase64 } from './index';

describe('sanitizeSvgBase64', () => {
  it('should sanitize SVG with script tags', () => {
    // This is the malicious payload from the security report
    const maliciousSvg =
      'PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxOTQiIGhlaWdodD0iMjAwIiBpZD0ieHNzIj48c2NyaXB0IHR5cGU9InRleHQvZWNtYXNjcmlwdCI+YWxlcnQoIlhTUyIpOzwvc2NyaXB0Pjwvc3ZnPg==';
    const sanitized = sanitizeSvgBase64(maliciousSvg);
    const decoded = atob(sanitized);

    // The sanitized version should not contain script tags
    expect(decoded).not.toContain('<script');
    expect(decoded).not.toContain('alert');
  });

  it('should preserve valid SVG content', () => {
    const validSvg = btoa(
      '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>'
    );
    const sanitized = sanitizeSvgBase64(validSvg);
    const decoded = atob(sanitized);

    expect(decoded).toContain('<svg');
    expect(decoded).toContain('<circle');
  });

  it('should remove event handlers', () => {
    const svgWithEventHandler = btoa(
      '<svg onclick="alert(\'XSS\')"><circle cx="50" cy="50" r="40"/></svg>'
    );
    const sanitized = sanitizeSvgBase64(svgWithEventHandler);
    const decoded = atob(sanitized);

    expect(decoded).not.toContain('onclick');
    expect(decoded).not.toContain('alert');
  });

  it('should handle empty string', () => {
    expect(sanitizeSvgBase64('')).toBe('');
  });

  it('should handle undefined', () => {
    expect(sanitizeSvgBase64(undefined)).toBe('');
  });

  it('should return empty string for invalid base64', () => {
    expect(sanitizeSvgBase64('not-valid-base64!@#$%^')).toBe('');
  });
});

describe('validateSvgBase64', () => {
  it('should return error for SVG with script tags', () => {
    const maliciousSvg =
      'PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxOTQiIGhlaWdodD0iMjAwIiBpZD0ieHNzIj48c2NyaXB0IHR5cGU9InRleHQvZWNtYXNjcmlwdCI+YWxlcnQoIlhTUyIpOzwvc2NyaXB0Pjwvc3ZnPg==';
    const error = validateSvgBase64(maliciousSvg);

    expect(error).toBeDefined();
    expect(error).toContain('forbidden elements');
  });

  it('should return error for SVG with event handlers', () => {
    const svgWithEventHandler = btoa(
      '<svg onclick="alert(\'XSS\')"><circle cx="50" cy="50" r="40"/></svg>'
    );
    const error = validateSvgBase64(svgWithEventHandler);

    expect(error).toBeDefined();
    expect(error).toContain('event handlers');
  });

  it('should return undefined for valid SVG', () => {
    const validSvg = btoa(
      '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>'
    );
    const error = validateSvgBase64(validSvg);

    expect(error).toBeUndefined();
  });

  it('should return error for non-SVG content', () => {
    const notSvg = btoa('<div>Not an SVG</div>');
    const error = validateSvgBase64(notSvg);

    expect(error).toBeDefined();
    expect(error).toContain('Invalid SVG format');
  });

  it('should return error for invalid base64', () => {
    const error = validateSvgBase64('not-valid-base64!@#$%^');

    expect(error).toBeDefined();
    expect(error).toContain('Invalid base64');
  });

  it('should return error for empty string', () => {
    const error = validateSvgBase64('');

    expect(error).toBeDefined();
    expect(error).toContain('required');
  });
});

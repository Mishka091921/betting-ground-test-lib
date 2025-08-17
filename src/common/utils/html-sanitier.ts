// src/common/utils/html-sanitizer.ts
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = (createDOMPurify as any)(window);

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'img', 'video', 'ul', 'li', 'ol', 'br', 'span'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'width', 'height', 'controls', 'style'],
    FORBID_TAGS: ['style', 'script', 'iframe'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload'],
  });
}

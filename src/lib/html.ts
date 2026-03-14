export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function decodeHtmlEntities(input: string) {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

export function formatContentWithParagraphs(content: string): string {
  if (!content) return "";
  
  // If content already has block-level elements, don't wrap in paragraphs
  const hasBlockElements = /<(p|div|h[1-6]|ul|ol|li|blockquote|pre|table|section|article|header|footer|nav|aside|main|figure|figcaption|address|details|summary|hr|br)[^>]*>/i.test(content);
  
  if (hasBlockElements) {
    return content;
  }
  
  // Split by double newlines to create paragraphs
  const paragraphs = content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      // Convert single newlines within a paragraph to <br> tags
      const textWithBreaks = p.replace(/\n/g, "<br>");
      return `<p>${textWithBreaks}</p>`;
    });
  
  return paragraphs.join("\n\n");
}

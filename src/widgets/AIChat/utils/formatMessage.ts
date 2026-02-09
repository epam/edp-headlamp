import { marked } from 'marked';
import { v4 as uuidv4 } from 'uuid';
import { SUPPORTED_LANGUAGES } from '../constants';
import { ProcessedChunk } from '../types';

const formatAiMessage = async (message: string) => {
  //@ts-ignore
  const codeBlockRegex = /```(.*?)```/gs;
  const emptyLinesRegex = /^\s*\n|\n\s*$/gm;

  const processedChunks: ProcessedChunk[] = [];
  let lastIndex = 0;

  let match;

  while ((match = codeBlockRegex.exec(message)) !== null) {
    // Text between code blocks
    if (lastIndex < match.index) {
      const rawText = message.slice(lastIndex, match.index);
      const htmlText = (await markdown2html(rawText)).trim();

      processedChunks.push({ id: uuidv4(), text: htmlText, isCode: false });
    }

    // Code block
    let code = match[1];
    code = code.replace(emptyLinesRegex, '');

    const codeLines = code.split('\n');

    if (SUPPORTED_LANGUAGES.includes(codeLines[0])) {
      codeLines.shift();
    }

    processedChunks.push({
      id: uuidv4(),
      text: await markdown2html(code),
      isCode: true,
    });

    lastIndex = codeBlockRegex.lastIndex;
  }

  // Remaining text after last code block
  if (lastIndex < message.length) {
    const rawText = message.slice(lastIndex);

    processedChunks.push({
      id: uuidv4(),
      text: await markdown2html(rawText),
      isCode: false,
    });
  }

  return processedChunks;
};

export const markdown2html = async (text: string) => {
  // escape html in markdown, so it doesn't get leaked
  const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const renderer = new marked.Renderer();
  const tableRenderer = renderer.table;

  renderer.link = ({ href, title, text }) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"${
      title ? ` title="${title}"` : ''
    }>${text}</a>`;
  };
  // Wrap table element to have horizontal scroll for tables
  renderer.table = (...args) => `<div class="overflow-x-auto">${tableRenderer(...args)}</div>`;
  // Almost any text containing ~ wraps in del. Removed it completely as agents don't seem to use it correctly anyway.
  renderer.del = ({ text }: { text: string }) => text;

  const parsedText = await marked.parse(escapedText, { renderer, breaks: true });
  return parsedText.trim();
};

export default formatAiMessage;

import { ContentBlock } from "draft-js";
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const MENTION_REGEX = /@\w+/g;
const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;

export function hashtagStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const contentBlockText = contentBlock.getText();
  findWithRegex(HASHTAG_REGEX, contentBlockText, callback);
}

export function mentiongStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const contentBlockText = contentBlock.getText();
  findWithRegex(MENTION_REGEX, contentBlockText, callback);
}

export function emailgStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const contentBlockText = contentBlock.getText();
  findWithRegex(EMAILREGEX, contentBlockText, callback);
}

export function linkStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const contentBlockText = contentBlock.getText();
  findWithRegex(LINKREGEX, contentBlockText, callback);
}

export function findWithRegex(
  regex: RegExp,
  contentBlockText: string,
  callback: (start: number, end: number) => void
) {
  let matchArr, start;
  while ((matchArr = regex.exec(contentBlockText)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

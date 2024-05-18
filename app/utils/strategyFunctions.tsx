import { ContentBlock } from "draft-js";
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const MENTION_REGEX = /@\w+/g;
const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;

export function hashtagStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

export function mentiongStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(MENTION_REGEX, contentBlock, callback);
}

export function emailgStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(EMAILREGEX, contentBlock, callback);
}

export function linkStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(LINKREGEX, contentBlock, callback);
}

export function findWithRegex(
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

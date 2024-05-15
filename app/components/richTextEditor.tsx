"use client";
import React, { useState } from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";
import StyledSpan from "./StyledSpan";

type richTextEditorProps = {};

const RichTextEditor: React.FC<richTextEditorProps> = () => {
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

  const HashtagSpan: React.FC<props> = (props) => {
    console.log(props);
    return (
      <span {...props} style={{ color: "red" }}>
        {props.children}
      </span>
    );
  };
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: (props) => StyledSpan({ ...props, variant: "hashtag" }),
    },
  ]);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(compositeDecorator)
  );

  function hashtagStrategy(contentBlock: any, callback: Function) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  function findWithRegex(regex: RegExp, contentBlock: any, callback: Function) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

  type props = {
    children: React.ReactNode;
  };

  return (
    <div>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};
export default RichTextEditor;

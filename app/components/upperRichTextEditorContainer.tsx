import React, { useState } from "react";
import RichTextEditor from "./richTextEditor";
import ActionsButtonsToolbar from "./actionsButtonsToolbar";


import {
  EditorState,
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  ContentBlock,
} from "draft-js";
import StyledSpan from "./StyledSpan";

//material components
import Container from "@mui/material/Container";

//hooks
import { useMediaQuery } from "@mui/material";

//types
import type { task } from "app/types";

type richTextEditorContainerProps = {
  handleSaveTask: (task: task) => void;
};

type spanProps = {
  children: React.ReactNode;
  variant: string;
};

const HashtagSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "hashtag";
  return StyledSpan({ children, variant });
};

const MentionSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "mention";
  return StyledSpan({ children, variant });
};

const EmailSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "email";
  return StyledSpan({ children, variant });
};

const LinkSpan: React.FC<spanProps> = (props) => {
  const children = props.children;
  const variant = "link";
  return StyledSpan({ children, variant });
};


const emptyRawContentState = {
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
};

const UpperRichTextEditorContainer: React.FC<richTextEditorContainerProps> = ({  
  handleSaveTask,  
}) => {
  const isMoreThan1300px = useMediaQuery('(min-width:1299px)')  
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
  const EMAILREGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const MENTION_REGEX = /@\w+/g;
  const LINKREGEX = /https?:\/\/(\w+\.)(\w+\.?)+|www(\.\w+)(\.\w+)+/g;
  
  const [isEditorFocused, setIsEditorFocused] = useState(false);
    
 
 

  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
    {
      strategy: emailgStrategy,
      component: EmailSpan,
    },
    {
      strategy: mentiongStrategy,
      component: MentionSpan,
    },

    {
      strategy: linkStrategy,
      component: LinkSpan,
    },
  ]);
 

  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createWithContent(convertFromRaw(emptyRawContentState), compositeDecorator)  );


  const handleAddTask = () => {        
    setIsEditorFocused(false);
    if(!editorState.getCurrentContent().getPlainText()) return 
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    handleSaveTask({rawContentState });
    const emptyContentState = convertFromRaw(emptyRawContentState);
    setEditorState(
      EditorState.createWithContent(emptyContentState, compositeDecorator)
    );
  };

  const handleCancelTask = () => {
    const emptyContentState = convertFromRaw(emptyRawContentState);
    setEditorState(
      EditorState.createWithContent(emptyContentState, compositeDecorator)
    ); 
    setIsEditorFocused(false);
  };

  const handleOnEditorFocus =()=>{
    setIsEditorFocused(true)      
    const newState= EditorState.set(editorState, {decorator:compositeDecorator})
    setEditorState(newState)
   
  }

 
  

  

  

  


  const editorHasContent: boolean = editorState.getCurrentContent().hasText();
  


  function hashtagStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  function mentiongStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(MENTION_REGEX, contentBlock, callback);
  }

  function emailgStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(EMAILREGEX, contentBlock, callback);
  }

  function linkStrategy(
    contentBlock: any,
    callback: (start: number, end: number) => void
  ) {
    findWithRegex(LINKREGEX, contentBlock, callback);
  }

  function findWithRegex(
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

  return (
    <Container maxWidth="xl">
      <RichTextEditor
        isEditorFocused={isEditorFocused}
        handleOnEditorFocus={handleOnEditorFocus}        
        editorState={editorState}
        setEditorState={setEditorState}
        position={"top"}        
      />
      <ActionsButtonsToolbar
        isEditorFocused={isEditorFocused}
        editorHasContent={editorHasContent}
        handleAddTask={handleAddTask}
        handleCancelTask={handleCancelTask}
      />
    </Container>
  );
};
export default UpperRichTextEditorContainer;

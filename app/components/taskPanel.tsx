"use client";
import React, { useState } from "react";

//material components
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

//icons
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import RichTextEditor from "./richTextEditor";

type taskPanelProps = {};

const TaskPanel: React.FC<taskPanelProps> = () => {
  const [content, setContent] = useState("");
  return (
    <div>
      <TextField
        InputLabelProps={{ sx: { ml: 4.5 }, shrink: false }}
        name="task"
        label={content ? "" : "Type to add new task"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddBoxOutlinedIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <Avatar
                src="/images/Foto-CV.jpg"
                sx={{
                  width: "30px",
                  height: "30px",
                  opacity: content ? 1 : 0.5,
                }}
              ></Avatar>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onChange={(evt) => setContent(evt.target.value)}
        value={content}
        fullWidth
      />
      <Box
        component={"div"}
        onInput={(evt) => console.log(evt.target)}
        contentEditable
      >
        <span>some</span>
        <span>data</span>
      </Box>
      <RichTextEditor />
    </div>
  );
};
export default TaskPanel;

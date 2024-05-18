import React from "react";

//material components
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

//icons
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Box } from "@mui/material";

type actionsButtonsToolbarProps = {
  isEditorFocused: boolean;
  editorHasContent: boolean;
  handleAddTask: () => void;
  handleCancelTask: () => void;
  position: "top" | "tasklist";
  isTextEdited: boolean;
};

const SmallActionsButtonsToolbar: React.FC<actionsButtonsToolbarProps> = ({
  isEditorFocused,
  editorHasContent,
  position,
  isTextEdited,
  handleAddTask,
  handleCancelTask,
}) => {
  return (
    isEditorFocused && (
      <Box minWidth="900px">
        <Paper elevation={2} square sx={{ p: 1, backgroundColor: "#FAFBFB" }}>
          <Grid container columnSpacing={3}>
            <Grid>
              <IconButton disabled={!editorHasContent}>
                <OpenInFullOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid container columnSpacing={1}>
              <Grid>
                <IconButton disabled={!editorHasContent}>
                  <CalendarTodayOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton disabled={!editorHasContent}>
                  <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton disabled={!editorHasContent}>
                  <FlareOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton disabled={!editorHasContent}>
                  <AdjustOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton disabled={!editorHasContent}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} xsOffset={"auto"}>
              <Grid>
                {editorHasContent ? (
                  position === "top" ? (
                    <IconButton onClick={handleAddTask}>
                      <AddOutlinedIcon />
                    </IconButton>
                  ) : isTextEdited ? (
                    <IconButton onClick={handleAddTask}>
                      <SaveOutlinedIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleCancelTask}>
                      <CloseOutlinedIcon />
                    </IconButton>
                  )
                ) : (
                  <IconButton onClick={handleCancelTask}>
                    <CloseOutlinedIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  );
};
export default SmallActionsButtonsToolbar;

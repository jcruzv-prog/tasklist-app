import React from "react";

//material components
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

//icons
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import { Box } from "@mui/material";

type actionsButtonsToolbarProps = {
  isEditorFocused?: boolean;
  editorHasContent?: boolean;
  isScreenSmall?: boolean;
  handleAddTask: () => void;
  handleCancelTask: () => void;
};

const ActionsButtonsToolbar: React.FC<actionsButtonsToolbarProps> = ({
  isEditorFocused = false,
  editorHasContent = false,
  handleAddTask,
  handleCancelTask,
  isScreenSmall = false,
}) => {
  return (
    isEditorFocused && (
      <Box minWidth="900px">
        <Paper elevation={2} square sx={{ p: 1, backgroundColor: "#FAFBFB" }}>
          <Grid container columnSpacing={3}>
            <Grid>
              <Button
                startIcon={<OpenInFullOutlinedIcon />}
                variant="outlined"
                disabled={!editorHasContent}
              >
                Open
              </Button>
            </Grid>
            <Grid container columnSpacing={1}>
              <Grid>
                <Button
                  disabled={!editorHasContent}
                  startIcon={<CalendarTodayOutlinedIcon />}
                  variant="outlined"
                >
                  Today
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  startIcon={<LockOpenOutlinedIcon />}
                  disabled={!editorHasContent}
                >
                  Public
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  startIcon={<FlareOutlinedIcon />}
                  disabled={!editorHasContent}
                >
                  Normal
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  startIcon={<AdjustOutlinedIcon />}
                  disabled={!editorHasContent}
                >
                  Estimation
                </Button>
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} xsOffset={"auto"}>
              <Grid>
                <Button variant="contained" onClick={handleCancelTask}>
                  Cancel
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" onClick={handleAddTask}>
                  {editorHasContent ? "Add" : "Ok"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  );
};
export default ActionsButtonsToolbar;

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
};

const ActionsButtonsToolbar: React.FC<actionsButtonsToolbarProps> = ({
  isEditorFocused = false,
  editorHasContent = false,
  isScreenSmall = false,
}) => {
  return (
    <Box
      display={isEditorFocused || editorHasContent ? "block" : "none"}
      minWidth="900px"
    >
      <Paper elevation={2} square sx={{ p: 1, backgroundColor: "#FAFBFB" }}>
        <Grid container columnSpacing={3}>
          <Grid>
            <Button startIcon={<OpenInFullOutlinedIcon />} variant="outlined">
              Open
            </Button>
          </Grid>
          <Grid container columnSpacing={1}>
            <Grid>
              <Button
                startIcon={<CalendarTodayOutlinedIcon />}
                variant="outlined"
              >
                Today
              </Button>
            </Grid>
            <Grid>
              <Button variant="outlined" startIcon={<LockOpenOutlinedIcon />}>
                Public
              </Button>
            </Grid>
            <Grid>
              <Button variant="outlined" startIcon={<FlareOutlinedIcon />}>
                Normal
              </Button>
            </Grid>
            <Grid>
              <Button variant="outlined" startIcon={<AdjustOutlinedIcon />}>
                Estimation
              </Button>
            </Grid>
          </Grid>
          <Grid container columnSpacing={1} xsOffset={"auto"}>
            <Grid>
              <Button variant="contained">Cancel</Button>
            </Grid>
            <Grid>
              <Button variant="contained">
                {editorHasContent ? "Add" : "Ok"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default ActionsButtonsToolbar;

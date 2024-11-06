export const metadata = {
  title: "Tasklist Web App",
};

import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TaskListContainer = dynamic(
  () => import("../components/taskListContainer"),
  { ssr: false, loading: () => <>Loading tasks..</> }
);
export default function Page() {
  return (
    <Container maxWidth="lg">
      <Box minWidth={950} pt={5}>
        <Stack>
          <Typography variant="h3" component="h1" textAlign={"center"}>
            Team Task list
          </Typography>
          <ErrorBoundary fallback={<div>Some error ocurred</div>}>
            <TaskListContainer />
          </ErrorBoundary>
        </Stack>
      </Box>
    </Container>
  );
}

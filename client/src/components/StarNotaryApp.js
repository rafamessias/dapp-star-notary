import { Box, Grid, Paper, Typography } from "@mui/material";

import CreateStar from "./CreateStar";

export default function Index() {
  return (
    <Box
      sx={{
        pt: 4,
        display: "flex",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        <Typography variant="h4" color="white">
          Star Notary App
        </Typography>

        <Grid container pt={4}>
          <Grid item elevation={2}>
            <Paper elevation={2} sx={{ py: 2, px: 4 }}>
              <CreateStar />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

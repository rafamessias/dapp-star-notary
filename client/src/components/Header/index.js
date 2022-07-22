import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "65px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "inherit",
          }}>
          <Typography variant="h6" component="div">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

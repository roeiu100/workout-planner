import { Typography, Box } from "@mui/material";

function Nowhere() {
  return (
    <div className="noWhere">
      <Box sx={{height:"100vh"}}>

        <Typography variant="h2" color="error">
          Can't show you the page.
        </Typography>
        <Typography variant="h2" color="error">
          Invalid information
        </Typography>
      </Box>
    </div>
  );
}

export default Nowhere;

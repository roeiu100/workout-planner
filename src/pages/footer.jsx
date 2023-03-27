import "./Home.css";
import { Typography, Toolbar } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Toolbar
      color="inherit"
      position="sticky"
      sx={{
        backgroundColor: "black",
        justifyContent: "space-around",
        width: "100vw",
        position: "absolute", 
        height: '3rem',
        marginTop: '2rem',
        
      }}
    >
      {/* <Typography color="primary" variant="h6">
        Contact us via:
      </Typography> */}
      <FacebookIcon color="primary" />
      <InstagramIcon color="primary" />
      <TwitterIcon color="primary" />
    </Toolbar>
  );
}


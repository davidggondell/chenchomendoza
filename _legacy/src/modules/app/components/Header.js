import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import logo from "../../../images/LOGOPAGINABLANCA.png";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Header = ({ sidebarWidth, appbarHeight, toogleSidebar }) => {
  const history = useHistory();

  return (
    <Box>
      <AppBar sx={{ marginLeft: sidebarWidth + "px", backgroundColor: "#FFF" }}>
        <Toolbar sx={{ padding: 1, height: appbarHeight + "px" }}>
          <img
            src={logo}
            height={appbarHeight + "px"}
            width="auto"
            alt="logo"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          />
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            onClick={() => toogleSidebar()}
            sx={{
              "& .MuiTouchRipple-root span": {
                backgroundColor: "#bababa   ",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Bebas Neue",
                color: "rgba(0,0,0,0.5)",
                paddingTop: "3px",
              }}
            >
              <FormattedMessage id="project.header.menu" />
            </Typography>
            <MenuIcon sx={{ color: "rgba(0,0,0,0.5)", marginLeft: 1 }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

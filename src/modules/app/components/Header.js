import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import logo from '../../../images/LOGOPAGINABLANCA.png';

const Header = ({ sidebarWidth, appbarHeight, toogleSidebar }) => {

    return (
        <Box>
            <AppBar sx={{ marginLeft: sidebarWidth + "px", backgroundColor: "#FFF" }}>
                <Toolbar sx={{ padding: 1, height: appbarHeight + "px" }}>
                    <img src={logo} height={appbarHeight + "px"} width="auto" alt="logo" />
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                    <IconButton onClick={() => toogleSidebar()} >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );

};

export default Header;

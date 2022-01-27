import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import logo from '../../../images/chenchoLogo.png';

const Header = ({ sidebarWidth, appbarHeight, toogleSidebar }) => {

    return (
        <Box>
            <AppBar sx={{ marginLeft: sidebarWidth + "px" }}>
                <Toolbar sx={{ padding: 1, height: appbarHeight + "px" }}>
                    <img src={logo} height="100%" width="auto" alt="logo" />
                    <Box sx={{ flexGrow: 1 }}>
                    </Box>
                    <IconButton
                        onClick={() => toogleSidebar()}
                        sx={{

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );

};

export default Header;

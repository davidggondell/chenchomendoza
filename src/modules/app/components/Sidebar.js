import MenuIcon from '@mui/icons-material/Menu';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../images/chenchoLogo.png';

const Sidebar = ({ open, toogle, variant, sidebarWidth }) => {
    const history = useHistory();

    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={toogle ? toogle : null}
        >
            <Box sx={{ height: '100%', width: sidebarWidth, flexShrink: 0, bgcolor: '' }}>
                <Box
                    sx={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingRight: 2,
                        paddingLeft: 2,
                        width: sidebarWidth
                    }}
                >
                    <img src={logo} height="auto" width="100%" alt="logo" />
                </Box>
                <Divider orientation="horizontal" />
                <List component="nav">
                    <ListItem button onClick={() => history.push("/home")}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText>Packs</ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => history.push("/gallery")}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText>Crear venta</ListItemText>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar
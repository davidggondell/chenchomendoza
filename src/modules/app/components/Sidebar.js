import MenuIcon from '@mui/icons-material/Menu';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useHistory } from "react-router-dom";

const Sidebar = ({ open, toogle, sidebarWidth, collapsedSidebarWidth }) => {
    const history = useHistory();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
        >
            <Collapse in={open} orientation="horizontal" collapsedSize={collapsedSidebarWidth}>
                <Box sx={{ width: sidebarWidth + "px" }}>
                    <List>
                        <ListItem button onClick={() => toogle()}>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                        </ListItem>
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
            </Collapse>
        </Drawer>
    );
}

export default Sidebar
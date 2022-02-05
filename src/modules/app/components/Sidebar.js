import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../images/Logo2Lineas.png';

const Sidebar = ({ open, toogle, variant, sidebarWidth }) => {
    const history = useHistory();
    const links = [
        {
            text: "Inicio",
            direction: "/home"
        },
        {
            text: "Retratos",
            direction: "/home"
        },
        {
            text: "Paisajes",
            direction: "/home"
        },
        {
            text: "Naturaleza",
            direction: "/home"
        },
    ];
    //sx={{ fontWeight: 600 }}
    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={toogle ? toogle : null}
        >
            <Box sx={{ height: '100%', width: sidebarWidth, flexShrink: 0, backgroundColor: 'background.default' }}>
                <Box
                    sx={{
                        marginTop: 2,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingRight: 4,
                        paddingLeft: 4,
                        width: sidebarWidth
                    }}
                >
                    <img src={logo} height="auto" width="100%" alt="logo" />
                </Box>
                <List component="nav" sx={{ marginTop: 15 }}>
                    {links.map((link, i) =>
                        <ListItem
                            key={i}
                            button
                            onClick={() => history.push(link.direction)}
                            sx={{ height: 40 }}
                        >
                            <ListItemText >
                                <Typography sx={{ fontSize: 20, textAlign: "center" }}>
                                    {link.text}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar
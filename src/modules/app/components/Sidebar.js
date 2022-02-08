import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../images/LOGOPAGINABLANCAv2.png';
import { useLocation } from 'react-router-dom'

const Sidebar = ({ open, toogle, variant, sidebarWidth }) => {
    const history = useHistory();
    const location = useLocation();
    const links = [
        {
            text: "INICIO",
            direction: "/inicio",
        },
        {
            text: "NATURALEZA",
            direction: "/naturaleza"
        },
        {
            text: "PAISAJE",
            direction: "/paisaje"
        },
        {
            text: "RETRATOS",
            direction: "/retrato"
        },
        {
            text: "VARIOS",
            direction: "/varios"
        },
    ];

    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={toogle ? toogle : null}
            width={sidebarWidth}
        >
            <Box sx={{ height: '100%', flexShrink: 0, backgroundColor: 'background.default' }}>
                <Box
                    sx={{
                        marginTop: 2,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingRight: 2,
                        paddingLeft: 2,
                        width: sidebarWidth
                    }}
                >
                    <img src={logo} height="auto" width="100%" alt="logo" />
                    {/* <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 40, letterSpacing: 1, marginLeft: 1 }}>
                        Chencho Mendoza
                    </Typography> */}
                </Box>
                <List component="nav" sx={{ marginTop: "10vh" }}>
                    {links.map((link, i) =>
                        <ListItem
                            key={i}
                            button
                            disableTouchRipple
                            onClick={() => {
                                history.push(link.direction);
                            }}
                            sx={location.pathname === link.direction ?
                                {
                                    height: 40,
                                    padding: "5px",
                                    '&:hover': {
                                        backgroundColor: "background.default"
                                    },
                                }
                                :
                                {
                                    height: 40,
                                    padding: "5px",
                                    opacity: 0.4,
                                    '&:hover': {
                                        opacity: 1,
                                        backgroundColor: "background.default"
                                    },
                                }
                            }
                        >
                            <ListItemText>
                                <Typography sx={{ fontSize: 15, letterSpacing: 3, fontWeight: 600, textAlign: "center" }}>
                                    {link.text}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer >
    );
}

export default Sidebar
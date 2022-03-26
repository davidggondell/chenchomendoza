import { Box, List, ListItem, ListItemText, Typography, Collapse, Grid, Divider, IconButton, Icon, Stack } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../../images/LOGOPAGINABLANCA.png';
import { useLocation } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FlickrIcon from '../../../images/flickrIcon.png';
import pxIcon from '../../../images/500pxIcon.png';
import { FormattedMessage } from "react-intl";

const Sidebar = ({ open, toogle, variant, sidebarWidth }) => {
    const history = useHistory();
    const location = useLocation();
    const [openGallery, setOpenGallery] = React.useState(false);
    const theme = createTheme({});

    const GalleryItem = ({ text, action, direction, selected }) => {
        return (
            <ListItem
                button
                disableTouchRipple
                onClick={() => {
                    action();
                    if (toogle && direction) {
                        toogle();
                    }
                }}
                sx={location.pathname === direction || selected ?
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
                    <Typography sx={{ fontSize: 15, letterSpacing: 3, fontWeight: 600 }}>
                        {text}
                    </Typography>
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <Drawer
            variant={variant}
            anchor="left"
            open={open}
            onClose={toogle ? toogle : null}
            width={sidebarWidth}
        >

            <Stack
                sx={{ height: "100%", flexShrink: 0, backgroundColor: 'background.paper' }}
                direction="column"
                justifyContent="space-between"
            >
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
                    <img src={logo} height="auto" width="100%" alt="logo" style={{ cursor: "pointer" }} onClick={() => history.push("/")} />
                </Box>
                <List component="nav" sx={{ paddingLeft: variant === "permanent" ? 10 : 6 }}>
                    <GalleryItem
                        text={<FormattedMessage id="project.navigation.home" />}
                        action={() => history.push("/")}
                        direction="/"
                    />
                    <GalleryItem
                        text={openGallery ? <FormattedMessage id="project.navigation.galleriesOpened" /> : <FormattedMessage id="project.navigation.galleriesClosed" />}
                        action={() => setOpenGallery(!openGallery)}
                        selected={openGallery}
                    />
                    <Collapse in={openGallery} sx={{ paddingLeft: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <ThemeProvider theme={theme}>
                                    <Divider orientation="vertical" sx={{ color: "common.black" }} />
                                </ThemeProvider>
                            </Grid>
                            <Grid item>
                                <GalleryItem
                                    text={<FormattedMessage id="project.navigation.landscape" />}
                                    action={() => history.push("/paisaje")}
                                    direction="/paisaje"
                                />
                                <GalleryItem
                                    text={<FormattedMessage id="project.navigation.nature" />}
                                    action={() => history.push("/naturaleza")}
                                    direction="/naturaleza"
                                />
                                <GalleryItem
                                    text={<FormattedMessage id="project.navigation.portraits" />}
                                    action={() => history.push("/retrato")}
                                    direction="/retrato"
                                />
                                <GalleryItem
                                    text={<FormattedMessage id="project.navigation.others" />}
                                    action={() => history.push("/otros")}
                                    direction="/otros"
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                    <GalleryItem text={<FormattedMessage id="project.navigation.aboutme" />} action={() => history.push("/sobremi")} direction="/sobremi" />
                    <GalleryItem text={<FormattedMessage id="project.navigation.contact" />} action={() => history.push("/contacto")} direction="/contacto" />
                </List>
                <Box sx={{ height: "20%", width: sidebarWidth, display: "flex", alignItems: "flex-end" }}>
                    <Grid container alignItems="flex-end" justifyContent="center">
                        <Grid item xs={12}>
                            <Grid container spacing={1} sx={{ paddingLeft: variant === "permanent" ? "80px" : "50px" }}>
                                <IconButton size="large" onClick={() => window.open("https://www.instagram.com/chenchomendoza/", "_blank")}>
                                    <InstagramIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton size="large" href="https://www.flickr.com/photos/chenchomendoza/" target="_blank">
                                    <Icon fontSize="inherit" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <img src={FlickrIcon} style={{ height: "80%", width: "80%", opacity: .54 }} alt="flickr" />
                                    </Icon>
                                </IconButton>
                                <IconButton size="large" href="https://500px.com/p/chenchomendoza" target="_blank">
                                    <Icon fontSize="inherit" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <img src={pxIcon} style={{ height: "80%", width: "80%", opacity: .54 }} alt="500px" />
                                    </Icon>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ padding: 1, textAlign: "center" }}>
                                &copy; 2022 David García Gondell
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Drawer >
    );
}

export default Sidebar
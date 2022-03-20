import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Typography, Grid, IconButton, Icon } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import pxIcon from '../../../images/500pxIcon.png';
import FlickrIcon from '../../../images/flickrIcon.png';
import camaracolor from '../../../images/camaracolor.jpg';
import { FormattedMessage } from "react-intl";

const Contact = () => {
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundImage: `url(${camaracolor})`,
                    backgroundSize: "cover",
                    backgroundPosition: matchesSm ? "50% 50%" : "10% 50%",
                    filter: "grayscale(100%)",
                    height: "100vh",
                    paddingTop: matchesSm ? "40px" : 0
                }}
            >
                <div data-aos="fade-up" style={{ padding: "20px", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box
                        sx={{
                            maxWidth: "700px",
                            maxHeight: "90vh",
                            padding: 2,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: 2,
                            overflow: "auto"
                        }}
                    >
                        <Typography variant="h3" sx={{ fontFamily: "Bebas Neue", textAlign: "center", paddingBottom: 1 }}>
                            <FormattedMessage id="project.contact.contact" />
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        padding: 1,
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 20, marginBottom: "14px" }}>
                                        <FormattedMessage id="project.contact.legalInfo" />
                                    </Typography>
                                    <Typography>
                                        <FormattedMessage id="project.contact.legalInfoTextFirst" /><br /><br />
                                        <FormattedMessage id="project.contact.legalInfoTextSecond" />
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        padding: 1,
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 20, marginBottom: "14px" }}>
                                        <FormattedMessage id="project.contact.personalEmail" />
                                    </Typography>
                                    <a href="mailto:chenchomendoza@mundo-r.com" style={{ color: "black", opacity: .54 }}>
                                        chenchomendoza@mundo-r.com
                                    </a>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        padding: 1,
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 20, marginBottom: 1 }}>
                                        <FormattedMessage id="project.contact.socialMedia" />
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <IconButton size="large" onClick={() => window.open("https://www.instagram.com/chenchomendoza/", "_blank")}>
                                            <InstagramIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton size="large" href="https://www.flickr.com/photos/chenchomendoza/" target="_blank">
                                            <Icon fontSize="inherit" height="100%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={FlickrIcon} style={{ height: "80%", width: "80%", opacity: .54 }} alt="flickr" />
                                            </Icon>
                                        </IconButton>
                                        <IconButton size="large" href="https://500px.com/p/chenchomendoza" target="_blank">
                                            <Icon fontSize="inherit" height="100%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={pxIcon} style={{ height: "80%", width: "80%", opacity: .54 }} alt="500px" />
                                            </Icon>
                                        </IconButton>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        </React.Fragment >
    )
}

export default Contact;
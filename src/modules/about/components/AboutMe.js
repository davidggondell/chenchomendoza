import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Icon } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import aboutMeImg from '../../../images/about2.jpg';
import camaraImg from '../../../images/camarabyn.jpg';
import cameraNikon from '../../../images/cameraNikon.jpg';
import objective from '../../../images/objective.png';
import filters from '../../../images/filters.jpg';
import tripode from '../../../images/tripode.jpg';
import InstagramIcon from '@mui/icons-material/Instagram';
import FlickrIcon from '../../../images/flickrIcon.png';
import pxIcon from '../../../images/500pxIcon.png';

const AboutMe = () => {
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const PhotoItem = ({ image, title, items }) => {
        return (
            <Box sx={{ paddingRight: 2, paddingBottom: 2, width: "100%" }}>
                <Card>
                    <CardMedia
                        component="img"
                        alt={title}
                        height="200"
                        src={image}
                        sx={{ objectPosition: "left", filter: "grayscale(100%)" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: "Bebas Neue" }}>
                            {title}
                        </Typography>
                        {items.map((item, i) =>
                            <Typography key={i} variant="body2" color="text.secondary">
                                {item}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", paddingLeft: 1, paddingRight: matchesMd ? 2 : 5 }}>
            <Box maxWidth="1000px">
                <div data-aos="fade-up">
                    <Box>
                        <Typography variant="h3" sx={{ fontFamily: "Bebas Neue", paddingTop: 3, textAlign: "center" }}>
                            José Luis García Mendoza
                        </Typography>
                        <Grid container justifyContent="center">
                            <Grid item xs={8}>
                                <img src={aboutMeImg}
                                    style={{
                                        height: "100vh",
                                        width: "100%",
                                        position: "sticky",
                                        top: matchesMd ? "16px" : "0px",
                                        paddingTop: "16px",
                                        paddingBottom: "16px",
                                        objectFit: "cover",
                                        objectPosition: matchesMd ? "22%" : "left",
                                    }}
                                    alt="ChenchoMendoza"
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ paddingLeft: matchesMd ? 1 : 3, zIndex: 1, backgroundColor: "background.default", paddingTop: 2, paddingBottom: 2 }}>
                                <Typography sx={{ textAlign: "justify", fontSize: matchesMd ? 12 : 20 }}>
                                    A Estrada (1964)
                                    La fotografía siempre ha estado presente en mi vida. Mi madre tenía una sencilla Kodak instamatic con la jugaba a emular a mi vecino,
                                    el gran fotoperiodista coruñés Xosé Castro (Pepucho). Sentía una especial atracción cada vez que lo veía llegar con todo su equipo,
                                    me fascinaba tocar aquellas cámaras o verlo por algún rincón de la ciudad realizando su trabajo. Creo que fue él quien definitivamente
                                    marcó mi interés por esta afición.<br /><br />

                                    A la edad de 17 años conseguí mi primera cámara réflex, una sencilla Practika BX20 de fabricación rusa, con la que empecé a
                                    hacer mis primeras diapositivas y fotografías en blanco y negro. Cinco años mas tarde tuve la oportunidad de comenzar a
                                    trabajar realizando trabajos de estudio y fotografía social usando una cámara de formato medio Zenza Bronica y Nikon FM2.<br /><br />

                                    A día de hoy dedico mi tiempo libre a mostrar el patrimonio etnográfico y paisajístico principalmente de mi tierra (Galicia)
                                    y la fotografía sigue siendo mi gran afición que me ha acompañado a lo largo de los años, una válvula de escape con la que
                                    disfruto como el primer día.
                                </Typography>
                            </Grid>
                        </Grid >
                    </Box>
                </div>
                <div data-aos="fade-up">
                    <Typography variant="h3" sx={{ fontFamily: "Bebas Neue", marginTop: 5, textAlign: "center" }}>
                        Mi Equipo
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item xs={4} sx={{ paddingTop: 2 }}>
                            <PhotoItem image={cameraNikon} title="Cámaras" items={["Nikon d850", "Nikon d600"]} />
                            <PhotoItem image={objective} title="Objetivos"
                                items={[
                                    "Tamron 15-30 F2.8 Di VC",
                                    "Tamron 24-70 2.8 VC USD",
                                    "Nikkor 50 f1.8",
                                    "Sigma 105 DG MACRO HSM",
                                    "Sigma 150-600 F5-6.3 DG Oss HSM",
                                    "Samyang 14 mm F 2.8"
                                ]}
                            />
                            <PhotoItem image={filters} title="Filtros"
                                items={[
                                    "Haida M15 ND 0.9 SOFT graduated",
                                    "Haida M15 ND 1.8 6 pasos",
                                    "Haida Magnetic Nano coating CPL M15"
                                ]} />
                            <PhotoItem image={tripode} title="Trípode" items={["Vanguard Alta Pro 2 + 263AP"]} />
                        </Grid>
                        <Grid item xs={8}>
                            <img src={camaraImg}
                                style={{
                                    height: "100vh",
                                    width: "100%",
                                    position: "sticky",
                                    top: "0px",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    objectFit: "cover",
                                    objectPosition: "right"
                                }}
                                alt="Camarabyn"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div data-aos="fade-up" style={{ paddingBottom: 3, display: "flex", justifyContent: "center" }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontFamily: "Bebas Neue", marginTop: 5, textAlign: "center", paddingBottom: 1 }}>
                            Contacto
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item >
                                <Box
                                    sx={{
                                        borderColor: "common.black",
                                        borderWidth: "5px",
                                        borderStyle: "solid",
                                        padding: 2,
                                        borderRadius: "8px",
                                        height: "100%"
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 20, marginBottom: "14px" }}>
                                        Email personal
                                    </Typography>
                                    <a href="mailto:chenchomendoza@mundo-r.com" style={{ color: "black", opacity: .54 }}>
                                        chenchomendoza@mundo-r.com
                                    </a>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box
                                    sx={{
                                        borderColor: "common.black",
                                        borderWidth: "5px",
                                        borderStyle: "solid",
                                        padding: 2,
                                        borderRadius: "8px",
                                        height: "100%"
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Bebas Neue", fontSize: 20, marginBottom: 1 }}>
                                        Redes Sociales
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
                <Box sx={{ marginTop: 5 }}>
                </Box>
            </Box>
        </Box >
    )
}

export default AboutMe;
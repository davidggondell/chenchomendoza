import { Box, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import aboutMeImg from '../../../images/aboutPanoramico.jpg';

const AboutMe = () => {
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 2 }}>
                <Grid container maxWidth="1200px">
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={aboutMeImg} style={{ width: "100%", paddingTop: matchesMd ? 7 : 0 }} alt="ChenchoMendoza" />
                    </Grid>
                    <Grid item xs={12} md={7} lg={8} sx={{
                        padding: 2,
                        paddingLeft: matchesMd ? 2 : "4px",
                        paddingRight: matchesMd ? 2 : 4
                    }}
                    >
                        <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", marginBottom: 1 }}>
                            José Luis García Mendoza
                        </Typography>
                        <Typography sx={{ textAlign: "justify" }}>
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
                    <Grid item xs={12} md={5} lg={4} sx={{ paddingTop: 2, paddingRight: matchesMd ? 2 : "4px" }}>
                        <Typography variant={matchesMd ? "h5" : "h4"} sx={{ fontFamily: "Bebas Neue", paddingLeft: 2, marginBottom: 1 }}>
                            Equipo
                        </Typography>
                        <Typography>
                            <ul>
                                <li>Cámaras
                                    <ul>
                                        <li>
                                            Nikon D850
                                        </li>
                                        <li>
                                            NiKon D610
                                        </li>
                                    </ul>
                                </li>
                                <li>Objetivos
                                    <ul>
                                        <li>
                                            Tamron 15-30 F2.8 Di VC
                                        </li>
                                        <li>
                                            Tamron 24-70 2.8 VC USD
                                        </li>
                                        <li>
                                            Nikkor 50 f1.8
                                        </li>
                                        <li>
                                            Sigma 105 DG MACRO HSM
                                        </li>
                                        <li>
                                            Sigma 150-600 F5-6.3 DG Oss HSM
                                        </li>
                                        <li>
                                            Samyang 14 mm F 2.8
                                        </li>
                                    </ul>
                                </li>
                                <li>Filtros
                                    <ul>
                                        <li>
                                            Haida M15 ND 0.9 SOFT graduated
                                        </li>
                                        <li>
                                            Haida M15 ND 1.8 6 pasos
                                        </li>
                                        <li>
                                            Haida Magnetic Nano coating CPL M15
                                        </li>
                                    </ul>
                                </li>
                                <li>Tripode
                                    <ul>
                                        <li>
                                            Vanguard Alta Pro 2 + 263AP
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default AboutMe;
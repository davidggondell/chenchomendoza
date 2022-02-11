import { Box, Typography } from '@mui/material';
import React from 'react';
import aboutMeImg from '../../../images/about.jpg';

const AboutMe = () => {
    return (
        <React.Fragment>
            <Box position="fixed" display="flex" height="100%" width="100%"
                sx={{
                    backgroundImage: `url(${aboutMeImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom left"
                }}
            />
            <Box position="absolute" sx={{
                right: 0,
                maxWidth: "45vw",
                height: "100%",
                display: "table"
            }}>
                <Box sx={{
                    display: "table-cell",
                    verticalAlign: "middle",
                }}>
                    <Box
                        sx={{
                            backgroundColor: "background.default",
                            padding: 5,
                        }}
                    >
                        <Box sx={{ overflow: "auto", maxHeight: "70vh", }}>
                            <Typography variant="h3" sx={{ fontFamily: "Bebas Neue" }}>
                                CHENCHO MENDOZA
                            </Typography>
                            <Typography sx={{ marginTop: 1 }}>
                                Nací en el municipio de La Estrada(Pontevedra), en el año 1964,aunque con dos años mis padres se trasladaron a vivir
                                a la ciudad de A Coruña. Parte de mi de mi infancia la pase en el barrio de Monte Alto. Mi vecino era Xose Castro,
                                más conocido como Pepucho, un gran fotógrafo que desempeño la mayor parte de su carrera como fotoperiodista en La Voz de Galicia.
                                Creo que él fue quien marco mi pasión por la fotografía. Sentía una especial atracción cada vez que lo veía llegar con todo su equipo,
                                me fascinaba tocar aquellas cámaras o verlo por algún rincón de la ciudad realizando su trabajo.
                                Conseguí mi primera cámara en el año 1982,una Practika BX20, con la que comencé a hacer mis primeras diapositivas.
                                He tenido la oportunidad de trabajar unos años haciendo reportaje social, aunque para mí la fotografía sigue siendo una afición,
                                una válvula de escape con la que disfruto como el primer día. Soy totalmente autodidacta y en la actualidad mi equipo está compuesto
                                principalmente por un par de cuerpos Nikon y diversas ópticas.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default AboutMe;
import { Box, Grid, Typography, Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import aboutMeImg from '../../../images/retrato.jpg';
import panoramicAbout from '../../../images/panoramicAbout.jpg';
import cameraIcon from '../../../images/cameraIcon.png';
import objectiveIcon from '../../../images/objectiveIcon.png';
import filterIcon from '../../../images/filterIcon.png';
import tripodeIcon from '../../../images/tripodeIcon.png';
import flashIcon from '../../../images/flashIcon.png';
import triggerIcon from '../../../images/triggerIcon.png';

const AboutMe = () => {
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    console.log(matchesMd)

    const PhotoItem = ({ icon, items, negativeMargin }) => {
        const margin = negativeMargin ? "-6px" : "auto"
        return (
            <Grid item xs={12} md={6} sx={{ padding: 1, paddingTop: 3 }}>
                <Box sx={{ width: "100%", marginLeft: margin, marginBottom: 2 }}>
                    <img src={icon} style={{ width: "60px", display: "block", margin: "auto" }} alt="Icon" />
                </Box>
                {items.map((item, i) =>
                    <Typography key={i} sx={{ textAlign: "center", fontSize: 14 }}>
                        {item}
                    </Typography>
                )}
            </Grid>
        );
    }

    const RoundText = ({textId}) => {
        
        return (
          <Grid item>
            <Box sx={{border: 1, borderRadius: 4, padding: 1, maxWidth: "230px", height: "100%"}}>
                <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>            
                    <Typography align="center" sx={{fontSize: 11}}>
                        <FormattedMessage id={textId} />
                    </Typography>
                </Box>
            </Box>
          </Grid>
        )
      }

    return (
        <Grid container justifyContent="center" sx={{ padding: 1, paddingBottom: 5, backgroundImage: "linear-gradient(to right, #F9F9F9, white)", overflow: "hidden" }}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div data-aos="fade-up" style={{ maxWidth: "700px" }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", paddingTop: 4, paddingBottom: 2, textAlign: "center" }}>
                            José Luis García Mendoza (Chencho Mendoza)
                        </Typography>
                        <img src={aboutMeImg}
                            style={{
                                width: "45%",
                                paddingRight: "24px",
                                float: "left"
                            }}
                            alt="ChenchoMendoza"
                        />
                        <Typography sx={{ textAlign: "justify", fontSize: matchesSm ? 12 : 16 }}>
                            <FormattedMessage id="project.aboutme.text.first" />
                            <br /><br />
                            <FormattedMessage id="project.aboutme.text.second" />
                            <br /><br />
                            <FormattedMessage id="project.aboutme.text.third" />
                        </Typography>
                    </Box>
                </div>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div data-aos="fade-up" style={{ maxWidth: "700px" }}>
                    <Box sx={{ marginTop: 5 }}>
                        <img src={panoramicAbout} style={{ width: "100%" }} alt="ChenchoMendoza" />
                    </Box>
                </div>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div data-aos="fade-up" style={{ maxWidth: "700px" }}>
                    <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", marginTop: 4, textAlign: "center" }}>
                        <FormattedMessage id="project.aboutme.equipment" />
                    </Typography>
                    <Grid container justifyContent="center">
                        <PhotoItem icon={cameraIcon} items={["Nikon D850", "Nikon D600", "Nikon D300"]} />
                        <PhotoItem icon={objectiveIcon}
                            items={["Tamron 15-30 F2.8 Di VC",
                                "Tamron 24-70 2.8 VC USD",
                                "Nikkor 50 f1.8",
                                "Sigma 105 DG MACRO HSM",
                                "Sigma 150-600 F5-6.3 DG Oss HSM",
                                "Samyang 14 mm F 2.8"
                            ]}
                        />
                        <PhotoItem icon={filterIcon}
                            items={[
                                "Haida M15 ND 0.9 SOFT graduated",
                                "Haida M15 ND 1.8 6 pasos",
                                "Haida Magnetic Nano coating CPL M15"
                            ]}
                        />
                        <PhotoItem icon={tripodeIcon} items={["Vanguard Alta Pro 2 + 263AP"]} negativeMargin={true} />
                        <PhotoItem icon={flashIcon} items={["Flash Metz 58 AF1, Flas Metz 48 AF1", "Flash Gloxy TR 985N"]} />
                        <PhotoItem icon={triggerIcon} items={["SMDV T803 Intervalometer", "Flash trigger Pixel Rook"]} />
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div data-aos="fade-up" style={{ maxWidth: "700px" }}>
                    <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", marginTop: 6, textAlign: "center" }}>
                        <FormattedMessage id="project.aboutme.exposandawards" />
                    </Typography>
                        <Grid sx={{marginTop: 2}} container spacing={1} justifyContent="center">
                            <RoundText textId="project.aboutme.award1"/>
                            <RoundText textId="project.aboutme.award2"/>
                            <RoundText textId="project.aboutme.award3"/>
                            <RoundText textId="project.aboutme.award4"/>
                            <RoundText textId="project.aboutme.award5"/>
                            <RoundText textId="project.aboutme.award6"/>
                            <RoundText textId="project.aboutme.award7"/>
                            <RoundText textId="project.aboutme.award8"/>
                            <RoundText textId="project.aboutme.award9"/>
                            <RoundText textId="project.aboutme.award10"/>
                        </Grid>
                </div>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <div data-aos="fade-up" style={{ maxWidth: "700px" }}>
                    <Typography variant="h4" sx={{ fontFamily: "Bebas Neue", marginTop: 6, textAlign: "center" }}>
                        <FormattedMessage id="project.aboutme.publications" />
                    </Typography>
                    <Grid sx={{marginTop: 2, paddingBottom: 10}} container spacing={1} justifyContent="center">
                        <RoundText textId="project.aboutme.publication1"/>
                        <RoundText textId="project.aboutme.publication2"/>
                        <RoundText textId="project.aboutme.publication3"/>
                        <RoundText textId="project.aboutme.publication4"/>
                        <RoundText textId="project.aboutme.publication5"/>
                        <RoundText textId="project.aboutme.publication6"/>
                        <RoundText textId="project.aboutme.publication7"/>
                    </Grid>
                </div>
            </Grid>
        </Grid >
    )
}

export default AboutMe;
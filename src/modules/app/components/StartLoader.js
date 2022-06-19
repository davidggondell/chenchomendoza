import { Stack, Typography } from '@mui/material';
import React from 'react';
import firma from '../../../images/firmaBlanca.png';
import bosqueIntro from '../../../images/bosqueIntro.jpg';
import puestaSolIntro from '../../../images/puestaSolIntro.jpg';
import menhiresIntro from '../../../images/menhiresIntro.jpg';
import retratoIntro from '../../../images/retratoIntro.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormattedMessage } from 'react-intl';

const StartLoader = () => {
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [loader, setLoader] = React.useState(true)

    let imageIntro = bosqueIntro
    let position = "50% 50%"

    const rand = Math.floor(Math.random() * (4));
    switch (rand) {
        case 0:
            imageIntro = puestaSolIntro
            break;
        case 1:
            imageIntro = menhiresIntro
            break;
        case 2:
            imageIntro = retratoIntro
            position = "50% 40%"
            break;
        default:
            imageIntro = bosqueIntro
    } 
    

    return (
        <React.Fragment>
            {loader &&
                <Stack justifyContent="center" alignItems="center"
                    onAnimationEnd={() => { setLoader(false) }}
                    className='fade-out-start'
                    sx={{
                        position: "fixed",
                        width: "100%",
                        height: "101vh",
                        padding: 3,
                        backgroundImage: `url(${imageIntro})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        zIndex: 1201
                    }}
                >
                    <Typography 
                        className="zoom-in-text-start" 
                        sx={{ fontSize: matchesSm ? 60 : 80, fontFamily: "Bebas Neue", textAlign: "center", color: "#FFF", marginTop: matchesSm ? -20 : 0 }}
                    >
                        <FormattedMessage id="project.startLoader.title" />
                    </Typography>
                    <img src={firma} alt="firma" className="zoom-in-text-start" style={{ maxWidth: matchesSm ? "300px" : "400px" }}></img>
                </Stack>
            }
        </React.Fragment>
    );

};

export default StartLoader;
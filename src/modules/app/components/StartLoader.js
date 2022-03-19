import { Stack, Typography } from '@mui/material';
import React from 'react';
import firma from '../../../images/firma.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';

const StartLoader = () => {
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [loader, setLoader] = React.useState(true)
    return (
        <React.Fragment>
            {loader &&
                <Stack justifyContent="center" alignItems="center"
                    onAnimationEnd={() => { setLoader(false); console.log("buenas") }}
                    className='fade-out-start'
                    sx={{
                        position: "fixed",
                        width: "100%",
                        height: "101vh",
                        padding: 3,
                        backgroundImage: "linear-gradient(to right, #FDFDFD, white)",
                        zIndex: 1201
                    }}
                >
                    <Typography className="zoom-in-text-start" sx={{ fontSize: matchesSm ? 40 : 60, textAlign: "center" }}>
                        CAPTURANDO INSTANTES
                    </Typography>
                    <img src={firma} alt="firma" className="zoom-in-text-start" style={{ maxWidth: "400px" }}></img>
                </Stack>
            }
        </React.Fragment>
    );

};

export default StartLoader;
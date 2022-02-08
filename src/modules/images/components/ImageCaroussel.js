import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Box, Button, ButtonGroup, createTheme, Dialog, DialogContent, Fade, Grid, IconButton, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useInterval } from '../../hooks/useInterval';

export const ImageCaroussel = ({ open, onClose, images, initImage }) => {
    const [dialogImageNum, setDialogImageNum] = React.useState(initImage);
    const [fadeIn, setFadeIn] = React.useState(true);
    const [pause, setPause] = React.useState(false);
    const dialogImage = images[dialogImageNum];
    const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    //const fullScreen = document.fullscreenElement;
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#FFF"
            }
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        '&:focus': {
                            outline: 0,
                            border: 0,
                        }
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&:focus': {
                            outline: 0
                        }
                    }
                }
            },
        }
    });

    useEffect(() => {
        setDialogImageNum(initImage);
    }, [setDialogImageNum, initImage, open]);

    const nextImg = () => {
        if (dialogImageNum >= images.length - 1) {
            setDialogImageNum(1);
        } else {
            setDialogImageNum(dialogImageNum + 1);
        }
        setFadeIn(false);
        setTimeout(() => {
            setFadeIn(true);
        }, 10);
    }

    const prevImg = () => {
        if (dialogImageNum <= 0) {
            setDialogImageNum(images.length - 1);
        } else {
            setDialogImageNum(dialogImageNum - 1);
        }
        setFadeIn(false);
        setTimeout(() => {
            setFadeIn(true);
        }, 10);
    }

    const startLoop = () => {
        if (!pause && open) {
            nextImg();
        }
    }

    // function openFullscreen() {
    //     var element = document.querySelector("#carousselDialog");
    //     console.log(element)
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.mozRequestFullScreen) { /* Firefox */
    //         element.mozRequestFullScreen();
    //     } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    //         element.webkitRequestFullscreen();
    //     } else if (element.msRequestFullscreen) { /* IE/Edge */
    //         element.msRequestFullscreen();
    //     }
    // }

    // function closeFullscreen() {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) { /* Firefox */
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    //         document.webkitExitFullscreen();
    //     } else if (document.msExitFullscreen) { /* IE/Edge */
    //         document.msExitFullscreen();
    //     }
    // }

    useInterval(() => startLoop(), 4000);

    return (
        <Dialog
            id="carousselDialog"
            fullScreen
            open={open}
            onClose={() => {
                onClose();
            }}
        >
            <ThemeProvider theme={theme}>
                {dialogImage !== null && dialogImage !== undefined &&
                    <Box backgroundColor="#282828" height="100%" width="100%"
                        sx={{
                            position: "fixed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                zIndex: 1,
                                top: 10,
                                right: 10,
                            }}
                        >
                            <IconButton size="large" onClick={() => onClose()}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Box>
                        <DialogContent
                            sx={{
                                position: "fixed",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Grid container>
                                {!smallScreen &&
                                    <Grid item xs={1}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <IconButton size="large" onClick={() => prevImg()}>
                                            <KeyboardArrowLeftIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                }
                                <Grid item xs={smallScreen ? 12 : 10} sx={{
                                    maxWidth: "90vh", maxHeight: "90vh",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Fade
                                        in={fadeIn}
                                        timeout={{
                                            enter: 1500
                                        }}
                                        sx={{ maxHeight: '100%', maxWidth: '100%' }}
                                    >
                                        <img src={dialogImage.src} style={{ maxHeight: '100%', maxWidth: '100%' }} alt={dialogImage.src} />
                                    </Fade>
                                </Grid>
                                {!smallScreen &&
                                    <Grid item xs={1}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <IconButton size="large" onClick={() => nextImg()}>
                                            <KeyboardArrowRightIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                }
                                <Grid item xs={12}
                                    sx={{
                                        paddingTop: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >

                                    <ButtonGroup color="primary" size="small">
                                        {smallScreen &&
                                            <Button onClick={() => prevImg()}>
                                                <KeyboardArrowLeftIcon />
                                            </Button>
                                        }
                                        {pause ?
                                            <Button onClick={() => setPause(false)}>
                                                <PlayArrowIcon />
                                            </Button>
                                            :
                                            <Button onClick={() => setPause(true)}>
                                                <PauseIcon />
                                            </Button>
                                        }
                                        {smallScreen &&
                                            <Button onClick={() => nextImg()}>
                                                <KeyboardArrowRightIcon />
                                            </Button>
                                        }
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Box>
                }
            </ThemeProvider>
        </Dialog >
    );
};
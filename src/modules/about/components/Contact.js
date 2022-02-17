import React from 'react';
import { Box, Typography, ListItemText, List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import contactImg from '../../../images/pano-coruña.jpg';

const Contact = () => {
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <Box position="fixed" display="flex" height="100%" width="100%"
                sx={{
                    backgroundImage: `url(${contactImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <Box position="absolute" sx={{
                top: matchesMd ? 0 : 'auto',
                right: matchesMd ? 'auto' : 0,
                maxWidth: matchesMd ? "100%" : "45vw",
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
                            padding: 3,
                        }}
                    >
                        <Box sx={{ overflow: "auto", maxHeight: "70vh", }}>
                            <Typography sx={{ marginTop: 1 }}>
                                Puedes contactarme a través de mi email o de mis redes sociales:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <a href="mailto:chenchomendoza@mundo-r.com">chenchomendoza@mundo-r.com</a>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <a href="https://www.instagram.com/chenchomendoza/" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <a href="https://www.flickr.com/photos/chenchomendoza/" target="_blank" rel="noopener noreferrer">Flickr</a>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment >
    )
}

export default Contact;
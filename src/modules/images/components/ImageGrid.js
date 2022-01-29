import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Fade, Dialog } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ImageGrid = () => {
    const dispatch = useDispatch();
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const matchesL = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const columns = 1 + matchesSm + matchesL;
    const images = useSelector(selectors.getImages);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogImage, setDialogImage] = React.useState(null);

    const getImageGallery = (images, numrows) => {
        var imageGallery = [];
        for (let i = 0; i < numrows; i++) {
            imageGallery = imageGallery.concat([{ size: 0, imageList: [] }]);
        }
        images.forEach(img => {
            var listToAppend;
            var imgProportion;
            if (img.width !== 0) {
                imgProportion = img.height / img.width;
            } else {
                imgProportion = img.height / 1;
            }

            for (let i = 0; i < numrows; i++) {
                if (i === 0 || (imageGallery.at(i).size < listToAppend.size)) {
                    listToAppend = { size: imageGallery.at(i).size, list: i };
                }
            }
            var auxList = imageGallery.at(listToAppend.list);
            let aux = {
                size: auxList.size + imgProportion,
                imageList: auxList.imageList.concat([img])
            };
            imageGallery.splice(listToAppend.list, 1, aux);
        });
        return imageGallery;
    }

    useEffect(() => {
        dispatch(actions.getAllImages());
    }, [dispatch]);

    const gallery = getImageGallery(images, columns);

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                {dialogImage !== null &&
                    <Box>
                        {dialogImage.height > dialogImage.width ?
                            <img src={dialogImage.src} height="90%" alt={dialogImage.src} />
                            :
                            <img src={dialogImage.src} width="90%" alt={dialogImage.src} />
                        }
                    </Box>
                }
            </Dialog>
            {gallery !== [] &&
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    {gallery.map((column, i) => (
                        <Grid item xs={12 / columns} key={i} >
                            <Grid container direction="column" spacing={2}>
                                {column.imageList.map((image, j) =>
                                    <Grid item key={j}>
                                        <Box
                                            onClick={() => {
                                                setDialogOpen(!dialogOpen);
                                                setDialogImage(image);
                                            }
                                            }
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#000'
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    '&:hover': {
                                                        opacity: 0.4
                                                    },
                                                }}
                                            >
                                                <Fade
                                                    in={true}
                                                    sx={{ width: "100%", height: "100%" }}
                                                    timeout={{
                                                        enter: 1500
                                                    }}
                                                >
                                                    <img width="100%" src={image.src} alt={"image" + i + j} />
                                                </Fade>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            }
        </React.Fragment >
    );

}

export default ImageGrid;
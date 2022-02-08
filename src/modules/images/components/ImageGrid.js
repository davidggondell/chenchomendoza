import { Box, Fade, Grid, CircularProgress } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { ImageCaroussel } from './ImageCaroussel';

const ImageGrid = ({ galleryUrl }) => {
    const dispatch = useDispatch();
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const matchesMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const matchesL = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const matchesXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
    const columns = 1 + matchesSm + matchesL + matchesXl;
    const photoSpacing = 1;
    const images = useSelector(selectors.getImages);
    const [initImage, setInitImage] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const getImageGallery = (images, numrows) => {
        var imageGallery = [];
        for (let i = 0; i < numrows; i++) {
            imageGallery = imageGallery.concat([{ size: 0, imageList: [] }]);
        }
        images.forEach((img, i) => {
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
                imageList: auxList.imageList.concat([{ num: i, ...img }])
            };
            imageGallery.splice(listToAppend.list, 1, aux);
        });
        return imageGallery;
    }

    const isEmptyGallery = (gal) => {
        var empty = true;
        gal.forEach((item) => {
            if (item.size !== 0) {
                empty = false
            }
        })
        return empty;
    }

    useEffect(() => {
        dispatch(actions.getAllImages(galleryUrl));
    }, [dispatch, galleryUrl]);

    const gallery = getImageGallery(images.list, columns);
    const emptyGallery = isEmptyGallery(gallery);

    return (
        <React.Fragment>
            <Box onContextMenu={event => event.preventDefault()} sx={matchesMd ? { marginTop: 0 + matchesMd + matchesSm } : {}}>
                {dialogOpen &&
                    <ImageCaroussel
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        images={images.list}
                        initImage={initImage}
                    />
                }
                {emptyGallery ?
                    <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "30vh" }}>
                        <CircularProgress color="inherit" />
                    </Box>
                    :
                    <Grid container spacing={photoSpacing} sx={{ padding: photoSpacing }}>
                        {gallery.map((column, i) => (
                            <Grid item xs={12 / columns} key={i} >
                                <Grid container direction="column" spacing={photoSpacing}>
                                    {column.imageList.map((image, j) =>
                                        <Grid item key={j}>
                                            <Box
                                                onClick={() => {
                                                    setDialogOpen(!dialogOpen);
                                                    setInitImage(image.num);
                                                }}
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
            </Box>
        </React.Fragment >
    );

}

export default ImageGrid;
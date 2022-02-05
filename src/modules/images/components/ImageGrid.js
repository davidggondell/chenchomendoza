import { Box, Fade, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { ImageCaroussel } from './ImageCaroussel';

const ImageGrid = () => {
    const dispatch = useDispatch();
    const matchesSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const matchesL = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const matchesXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));
    const columns = 1 + matchesSm + matchesL + matchesXl;
    const photoSpacing = 2;
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

    useEffect(() => {
        dispatch(actions.getAllImages("INICIO"));
    }, [dispatch]);

    const gallery = getImageGallery(images, columns);

    return (
        <React.Fragment>
            {dialogOpen &&
                <ImageCaroussel
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    images={images}
                    initImage={initImage}
                />
            }
            {gallery !== [] &&
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
        </React.Fragment >
    );

}

export default ImageGrid;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Fade } from '@mui/material';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { transform } from '@babel/core';

const ImageGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectors.getImages);

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

    const gallery = getImageGallery(images, 3);

    return (
        <React.Fragment>
            {gallery !== [] &&
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    {gallery.map((column, i) => (
                        <Grid item xs={4} key={i} >
                            <Grid container direction="column" spacing={2}>
                                {column.imageList.map((image, j) =>
                                    <Grid item key={j}>
                                        <Box
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ResponsiveGallery from 'react-responsive-gallery';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ImageGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectors.getImages);

    // const getImageGallery = (images, numrows) => {
    //     var imageGallery = [];
    //     for (let i = 0; i < numrows; i++) {
    //         imageGallery = imageGallery.concat([{ size: 0, imageList: [] }]);
    //     }
    //     images.forEach(img => {
    //         var listToAppend = { size: 0, list: 0 };
    //         for (let i = 0; i < numrows; i++) {
    //             if (imageGallery.at(i).size < listToAppend.size) {
    //                 listToAppend = { size: imageGallery.at(i).size, list: i };
    //             }
    //         }
    //         var auxList = imageGallery.at(listToAppend.list);
    //         let aux = {
    //             size: auxList.size + img.height,
    //             imageList: auxList.imageList.concat([img.src])
    //         };
    //         imageGallery = imageGallery.splice(listToAppend.list, 1, aux);
    //     });
    //     return imageGallery;
    // }

    useEffect(() => {
        dispatch(actions.getAllImages());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Box sx={{ paddingTop: "20px" }}>
                <ResponsiveGallery
                    numOfImagesPerRow={{
                        xs: 1,
                        s: 1,
                        md: 2,
                        l: 2,
                        xl: 3,
                        xxl: 3
                    }}
                    colsPadding={{
                        xs: 20,
                        s: 20,
                        md: 20,
                        l: 20,
                        xl: 20,
                        xxl: 20
                    }}
                    imagesPaddingBottom={{
                        xs: 40,
                        s: 40,
                        md: 40,
                        l: 40,
                        xl: 40,
                        xxl: 40
                    }}
                    useLightBox={true}
                    images={images}
                />
            </Box>
            {
                // images !== [] &&
                //     <Grid container>
                //         {images.map((image, i) => (
                //             <Grid item xs={3} key={i}>
                //                 <img width="100%" src={image} alt="buenos dias"></img>
                //             </Grid>
                //         ))}
                //     </Grid>
            }
        </React.Fragment>
    );

}

export default ImageGrid;
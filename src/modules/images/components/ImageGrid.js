import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from '@mui/material';
import ResponsiveGallery from 'react-responsive-gallery';
import * as actions from "../actions";
import * as selectors from "../selectors";

const ImageGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectors.getImages);

    useEffect(() => {
        dispatch(actions.getAllImages());
    }, [dispatch]);

    return (
        <React.Fragment>
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
                    xs: 0,
                    s: 0,
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import * as selectors from "../selectors";

const ImageGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(selectors.getImages);

    useEffect(() => {
        dispatch(actions.getAllImages());
    }, [dispatch]);

    console.log(images);
    return (
        <div>
            {images !== [] ?
                <div>
                    {images.map((image, i) => (
                        <img key={i} width="800" height="500" src={image} alt="buenos dias"></img>
                    ))};
                        </div>
                :
                <div />
            }
        </div>
    );

}

export default ImageGrid;
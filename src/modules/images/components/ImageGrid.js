import { Box, Grid, CircularProgress, Fade, Alert } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import * as selectors from "../selectors";
import { ImageCaroussel } from "./ImageCaroussel";
import { FormattedMessage } from "react-intl";

const ImageGrid = ({ galleryUrl }) => {
  const dispatch = useDispatch();
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const matchesL = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const matchesXl = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  const columns = 2 + matchesL + matchesXl;
  const photoSpacing = 1;
  const images = useSelector(selectors.getImages);
  const [initImage, setInitImage] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [getImagesError, setGetImagesError] = React.useState("");

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
        if (i === 0 || imageGallery.at(i).size < listToAppend.size) {
          listToAppend = { size: imageGallery.at(i).size, list: i };
        }
      }
      var auxList = imageGallery.at(listToAppend.list);
      let aux = {
        size: auxList.size + imgProportion,
        imageList: auxList.imageList.concat([{ num: i, ...img }]),
      };
      imageGallery.splice(listToAppend.list, 1, aux);
    });
    return imageGallery;
  };

  const isEmptyGallery = (gal) => {
    var empty = true;
    gal.forEach((item) => {
      if (item.size !== 0) {
        empty = false;
      }
    });
    return empty;
  };

  const getAlert = (imageError) => {
    if (imageError === "empty") {
      return (
        <Alert severity="warning">
          <FormattedMessage id="project.error.emptyGallery" />
        </Alert>
      );
    } else {
      return (
        <Alert severity="error">
          <FormattedMessage id="project.error.galleryError" />
          {getImagesError}
        </Alert>
      );
    }
  };

  const getLoaderOrError = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {getImagesError === "" ? (
        <CircularProgress color="inherit" />
      ) : (
        getAlert(getImagesError)
      )}
    </Box>
  );

  useEffect(() => {
    dispatch(
      actions.getAllImages(galleryUrl, (error) => {
        setGetImagesError(error);
      })
    );
  }, [dispatch, galleryUrl]);

  const gallery = getImageGallery(images.list, columns);
  const emptyGallery = isEmptyGallery(gallery);

  return (
    <React.Fragment>
      <Box
        onContextMenu={(event) => event.preventDefault()}
        sx={{
          minHeight: "101vh",
          marginTop: matchesMd ? 0 + matchesMd + matchesSm : 0,
          backgroundImage: "linear-gradient(to right, #F9F9F9, white)",
        }}
      >
        {dialogOpen && (
          <ImageCaroussel
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            images={images.list}
            initImage={initImage}
          />
        )}
        {emptyGallery ? (
          getLoaderOrError()
        ) : (
          <Grid
            container
            spacing={photoSpacing}
            sx={{
              padding: photoSpacing,
              paddingRight: matchesMd ? 1 : 8,
              paddingLeft: matchesMd ? 1 : 8,
            }}
          >
            {gallery.map((column, i) => (
              <Grid item xs={12 / columns} key={i}>
                <Grid container direction="column" spacing={photoSpacing}>
                  {column.imageList.map((image, j) => (
                    <Grid item key={j}>
                      <Box
                        onClick={() => {
                          setDialogOpen(!dialogOpen);
                          setInitImage(image.num);
                        }}
                        sx={
                          !matchesMd
                            ? {
                                cursor: "pointer",
                                transition: "all 0.5s",
                                WebkitTransition: "all 0.5s",
                                "&:hover": {
                                  filter: "brightness(60%)",
                                  transform: "scale(0.97)",
                                },
                              }
                            : { cursor: "pointer" }
                        }
                      >
                        <Fade
                          in={true}
                          sx={{ width: "100%", height: "100%" }}
                          timeout={1500}
                        >
                          <img width="100%" src={image.src} alt={image.name} />
                        </Fade>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ImageGrid;

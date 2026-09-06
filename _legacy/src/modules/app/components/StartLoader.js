import { Stack, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import firma from "../../../images/firmaBlanca.png";
import bosqueIntro from "../../../images/bosqueIntro.jpg";
import puestaSolIntro from "../../../images/puestaSolIntro.jpg";
import menhiresIntro from "../../../images/menhiresIntro.jpg";
import retratoIntro from "../../../images/retratoIntro.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormattedMessage } from "react-intl";

const StartLoader = () => {
  const matchesSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [startLoader, setStartLoader] = React.useState(true);
  const [imageLoaded, setImageLoaded] = React.useState(null);

  useEffect(() => {
    if (imageLoaded == null) {
      const rand = Math.floor(Math.random() * 4);
      let randImage = bosqueIntro;
      switch (rand) {
        case 0:
          randImage = puestaSolIntro;
          break;
        case 1:
          randImage = menhiresIntro;
          break;
        case 2:
          randImage = retratoIntro;
          break;
        default:
          randImage = bosqueIntro;
      }

      let imageIntro = new Image();
      imageIntro.src = randImage;
      imageIntro.onload = () => {
        setImageLoaded(imageIntro.src);
      };
    }
  }, [imageLoaded, setImageLoaded]);

  return (
    <React.Fragment>
      {startLoader && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "101vh",
            zIndex: 1201,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageLoaded == null ? (
            <Box
              sx={{ height: "100%", width: "100%", backgroundColor: "#000" }}
            />
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              onAnimationEnd={() => {
                setStartLoader(false);
              }}
              className="fade-out-start"
              sx={{
                width: "100%",
                height: "100%",
                padding: 3,
                backgroundImage: `url(${imageLoaded})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
              onClick={() => setStartLoader(false)}
            >
              <Typography
                className="zoom-in-text-start"
                sx={{
                  fontSize: matchesSm ? 60 : 80,
                  fontFamily: "Bebas Neue",
                  textAlign: "center",
                  color: "#FFF",
                  marginTop: matchesSm ? -20 : 0,
                }}
              >
                <FormattedMessage id="project.startLoader.title" />
              </Typography>
              <img
                src={firma}
                alt="firma"
                className="zoom-in-text-start"
                style={{ maxWidth: matchesSm ? "300px" : "400px" }}
              ></img>
            </Stack>
          )}
        </Box>
      )}
    </React.Fragment>
  );
};

export default StartLoader;

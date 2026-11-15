import * as actionTypes from "./actionTypes";
import { projectStorage } from "../firebaseConfig/config";
import { ref, getDownloadURL, list } from "firebase/storage";

var searchNum = 0;

const clearImages = (num) => ({
  type: actionTypes.CLEAR_IMAGES,
  num,
});

const addImage = (image) => ({
  type: actionTypes.ADD_IMAGE,
  image,
});

export const getAllImages = (url, onError) => (dispatch) => {
  searchNum = searchNum + 1;
  const thisSearch = searchNum;
  dispatch(clearImages(thisSearch));
  var storage = ref(projectStorage, url);

  list(storage)
    .then((res) => {
      if (res.items.length === 0) {
        onError("empty");
      } else {
        res.items.forEach((image) => {
          getDownloadURL(image).then((url) => {
            var img = new Image();
            img.onload = function () {
              dispatch(
                addImage({
                  searchNum: thisSearch,
                  src: url,
                  width: this.width,
                  height: this.height,
                  name: image._location.path.split("/")[1].split(".")[0],
                })
              );
            };
            img.src = url;
          });
        });
      }
    })
    .catch((err) => {
      onError(err.message.split('"message"')[1].split('"')[1]);
    });
};

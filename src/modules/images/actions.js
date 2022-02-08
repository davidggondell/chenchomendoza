import * as actionTypes from './actionTypes';
import { projectStorage } from '../firebaseConfig/config';
import { ref, getDownloadURL, list } from "firebase/storage";

var searchNum = 0;

const clearImages = (num) => ({
    type: actionTypes.CLEAR_IMAGES,
    num,
})

const addImage = (image) => ({
    type: actionTypes.ADD_IMAGE,
    image,
});

export const getAllImages = (url) => (dispatch) => {
    searchNum = searchNum + 1;
    const thisSearch = searchNum;
    dispatch(clearImages(thisSearch));
    var storage = ref(projectStorage, url);

    list(storage).then(res => {
        res.items.forEach(image => {
            getDownloadURL(image).then(url => {
                var img = new Image();
                img.onload = function () {
                    dispatch(addImage({ searchNum: thisSearch, src: url, width: this.width, height: this.height }));
                }
                img.src = url;
            });
        });
    }).catch(err => {
        console.log(err);
    });
}
import * as actionTypes from './actionTypes';
import { projectStorage } from '../firebaseConfig/config';
import { ref, getDownloadURL, list } from "firebase/storage";

const addImage = (url) => ({
    type: actionTypes.ADD_IMAGE,
    url,
});

export const getAllImages = (url) => (dispatch) => {
    var storage = ref(projectStorage, url);

    list(storage).then(res => {
        console.log(res.items);
        res.items.forEach(image => {
            getDownloadURL(image).then(url => {
                dispatch(addImage(url));
            });
        });
    }).catch(err => {
        //console.log(err);
    });
}
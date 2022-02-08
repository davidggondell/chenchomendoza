import { combineReducers } from "redux";

import * as actionTypes from "./actionTypes";

const initialState = {
    images: { searchNum: 0, list: [] },
};

const images = (state = initialState.images, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_IMAGES:
            return { searchNum: action.num, list: [] };
        case actionTypes.ADD_IMAGE:
            if (state.searchNum === action.image.searchNum) {
                return { searchNum: state.searchNum, list: state.list.concat([action.image]) };
            } else {
                return state;
            }
        default:
            return state;
    }
};

const reducer = combineReducers({
    images,
});

export default reducer;
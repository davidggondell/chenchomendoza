import { combineReducers } from "redux";

import * as actionTypes from "./actionTypes";

const initialState = {
    images: [],
};

const images = (state = initialState.images, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMAGE:
            return state.concat([{ src: action.url }]);
        default:
            return state;
    }
};

const reducer = combineReducers({
    images,
});

export default reducer;
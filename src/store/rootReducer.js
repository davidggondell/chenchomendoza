import { combineReducers } from "redux";

import app from "../modules/app";
import images from "../modules/images";

const rootReducer = combineReducers({
  app: app.reducer,
  images: images.reducer,
});

export default rootReducer;

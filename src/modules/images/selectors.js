const getModuleState = state => state.images;

export const getImages = state =>
    getModuleState(state).images;
import { ExplorePageTypes } from '../actions/explore-page-action';

let defState = {
    placeId            : 0,
    searchSensor       : false,
    searchType         : `gym`,
    searchRadius       : 3000,
    entities           : [],
    entityDetails      : {},
    entityPhotos       : [],
    entityDetailsState : ExplorePageTypes.HIDE_DETAILS_WINDOW
};


export default (state = defState, action:any = {}) => {

    switch (action.type) {
        case ExplorePageTypes.SET_PLACE_ID:
            return Object.assign({}, state,
                {
                    placeId: action.placeId
                });
        case ExplorePageTypes.SET_ENTITIES:
            return Object.assign({}, state,
                {
                    entities: action.data
                });
        case ExplorePageTypes.SET_ENTITY_DETAILS:
            return Object.assign({}, state,
                {
                    entityDetails: action.data
                });
        case ExplorePageTypes.SET_ENTITY_PHOTOS:
            return Object.assign({}, state,
                {
                    entityPhotos: [...state.entityPhotos, action.data]
                });
        case ExplorePageTypes.CLEAN_ENTITY:
            return Object.assign({}, state,
                {
                    entityDetails: {},
                    entityPhotos: []
                });
        case ExplorePageTypes.HIDE_DETAILS_WINDOW:
            return Object.assign({}, state,
                {
                    placeId: 0,
                    entityDetailsState: ExplorePageTypes.HIDE_DETAILS_WINDOW
                });
        case ExplorePageTypes.SHOW_DETAILS_WINDOW:
            return Object.assign({}, state,
                {
                    entityDetailsState: ExplorePageTypes.SHOW_DETAILS_WINDOW
                });
        default:
            return state;
    }
};

import { ExplorePageTypes } from '../actions/explore-page-action';

let defState = {
    placeId: 0,
    entityDetailsState: ExplorePageTypes.HIDE_DETAILS_WINDOW
};

export default (state = defState, action:any = {}) => {

    switch (action.type) {
        case ExplorePageTypes.HIDE_DETAILS_WINDOW:
            return Object.assign({}, state,
                {
                    placeId: 0,
                    entityDetailsState: ExplorePageTypes.HIDE_DETAILS_WINDOW
                });
        case ExplorePageTypes.SHOW_DETAILS_WINDOW:
            return Object.assign({}, state,
                {
                    placeId: action.id,
                    entityDetailsState: ExplorePageTypes.SHOW_DETAILS_WINDOW
                });
        default:
            return state;
    }
};

import { HomePageTypes } from '../actions/home-page-actions';

const defState = {
    city: {},
    cities: []
};

export default (state = defState, action:any = {}) => {

    switch (action.type) {
        case HomePageTypes.SET_CITY:
            return Object.assign({}, state,
                {
                    city: action.data
                });
        case HomePageTypes.SET_CITIES:
            return Object.assign({}, state,
                {
                    cities: action.data
                });
        case HomePageTypes.CLEAN_HOME:
            return defState;
        default:
            return state;
    }
};

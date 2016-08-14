import { Injectable }        from '@angular/core';
import { Http }              from '@angular/http';
import { Actions, AppStore } from 'angular2-redux';
const humps = require('humps');

export const ExplorePageTypes = {
    SHOW_DETAILS_WINDOW : 'SHOW_DETAILS_WINDOW',
    HIDE_DETAILS_WINDOW : 'HIDE_DETAILS_WINDOW',
    SET_PLACE_ID        : 'SET_PLACE_ID',
    SET_ENTITIES        : 'SET_ENTITIES',
    SET_ENTITY_DETAILS  : 'SET_ENTITY_DETAILS',
    SET_ENTITY_PHOTOS   : 'SET_ENTITY_PHOTOS',
    CLEAN_ENTITY        : 'CLEAN_ENTITY'
};

@Injectable()
export class ExplorePageActions extends Actions {

    constructor(appStore:AppStore, private http:Http) {
        super(appStore);
    }

    HIDE_DETAILS_WINDOW() {
        return {type: ExplorePageTypes.HIDE_DETAILS_WINDOW};
    }

    SHOW_DETAILS_WINDOW() {
        return {type: ExplorePageTypes.SHOW_DETAILS_WINDOW};
    }

    SET_PLACE_ID(placeId) {
        return {type: ExplorePageTypes.SET_PLACE_ID, placeId};
    }

    SET_ENTITY_DETAILS(data) {
        return {type: ExplorePageTypes.SET_ENTITY_DETAILS, data};
    }

    SET_ENTITIES(data) {
        return {type: ExplorePageTypes.SET_ENTITIES, data};
    }

    SET_ENTITY_PHOTOS(data) {
        return {type: ExplorePageTypes.SET_ENTITY_PHOTOS, data};
    }

    CLEAN_ENTITY() {
        return {type: ExplorePageTypes.CLEAN_ENTITY};
    }

    FETCH_ENTITIES(lat, lng) {
        return (dispatch, getState) => {
            const {app, explore} = getState();
            this.http.get(`maps/api/place/search/json?location=${lat},${lng}&radius=${explore.searchRadius}
                &types=${explore.searchType}&sensor=${explore.searchSensor}&key=${app.googleAppKey}`)
                .subscribe(responce => {
                    let body = responce.json();
                    body = humps.camelizeKeys(body);
                    if (body.status === `OK`) {
                        dispatch(this.SET_ENTITIES(body.results));
                    } else {
                        console.error('FETCH_ENTITIES', body.results);
                    }
                }, error => console.error('FETCH_ENTITIES', error));
        }
    }

    FETCH_ENTITY_DETAILS(placeId) {
        return (dispatch, getState) => {
            const app = getState().app;
            dispatch(this.CLEAN_ENTITY());
            this.http.get(`maps/api/place/details/json?placeid=${placeId}&sensor=false&key=${app.googleAppKey}`)
                .subscribe(responce => {
                    let body = responce.json();
                    body = humps.camelizeKeys(body);
                    if (body.status === `OK`) {
                        dispatch(this.SET_ENTITY_DETAILS(body.result));
                        body.result.photos.forEach(item => {
                            dispatch(this.FETCH_ENTITY_PHOTOS(item.photoReference));
                        });
                    } else {
                        console.error('FETCH_ENTITY_DETAILS', body.result);
                    }
                }, error => console.error('FETCH_ENTITIES', error));
        }
    }

    FETCH_ENTITY_PHOTOS(photoreference) {
        return (dispatch, getState) => {
            const app = getState().app;
            this.http.get(`maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${app.googleAppKey}`)
                .subscribe(responce => {
                    if (responce.statusText === `OK`) {
                        dispatch(this.SET_ENTITY_PHOTOS({image: responce.url}));
                    } else {
                        console.error('FETCH_ENTITY_PHOTOS', responce.statusText);
                    }
                }, error => console.error('FETCH_ENTITIES', error));
        }
    }
}

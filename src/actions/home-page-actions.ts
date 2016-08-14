import { Injectable }        from "@angular/core";
import { Http }              from '@angular/http';
import { Actions, AppStore } from "angular2-redux";
const humps = require('humps');

export const HomePageTypes = {
    SET_CITY   : "SET_CITY",
    SET_CITIES : "SET_CITIES",
    CLEAN_HOME : "CLEAN_HOME"
};

@Injectable()
export class HomePageActions extends Actions {

    constructor(appStore:AppStore, private http:Http) {
        super(appStore);
    }

    SET_CITIES(data) {
        return {type: HomePageTypes.SET_CITIES, data};
    }

    SET_CITY(data) {
        return {type: HomePageTypes.SET_CITY, data};
    }

    FETCH_CITIES(q) {
        return (dispatch) => {
            this.http.get(`maps/api/geocode/json?&address=${q}`)
                .subscribe(responce => {
                    let body = responce.json();
                    body = humps.camelizeKeys(body);
                    if (body.status === `OK`) {
                        dispatch(this.SET_CITIES(body.results));
                    } else {
                        console.error('FETCH_CITIES', body.results);
                    }
                }, error => console.error('FETCH_ENTITIES', error));
        }
    }
}

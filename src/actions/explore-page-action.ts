import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Actions, AppStore } from "angular2-redux";

export const ExplorePageTypes = {
    SHOW_DETAILS_WINDOW: "SHOW_DETAILS_WINDOW",
    HIDE_DETAILS_WINDOW: "HIDE_DETAILS_WINDOW"
};

@Injectable()
export class ExplorePageActions extends Actions {

    constructor(appStore:AppStore, private http: Http) {
        super(appStore);
    }

    showWindowDetails(id) {
        return {type: ExplorePageTypes.SHOW_DETAILS_WINDOW, id};
    }

    hideWindowDetails() {
        return {type: ExplorePageTypes.HIDE_DETAILS_WINDOW};
    }
}

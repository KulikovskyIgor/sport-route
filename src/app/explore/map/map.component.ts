import { Component, Input } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { AppStore } from "angular2-redux";
import { ExplorePageActions } from "./../../../actions/explore-page-action";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    selector: 'map',
    directives: [GOOGLE_MAPS_DIRECTIVES],
    template: require('./map.component.html'),
    styles: [require('./map.component.scss')]
})
export class Map {
    @Input() entities : any[];
    @Input() lat      : number;
    @Input() lng      : number;
    zoom              : number = 14;

    constructor(public explorePageActions:ExplorePageActions, public appStore:AppStore) {
    }

    clickOnMap(event) {
        this.appStore.dispatch(this.explorePageActions.hideWindowDetails());
    }

    clickOnMarker(event, placeId) {
        this.appStore.dispatch(this.explorePageActions.showWindowDetails(placeId));
    }
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GOOGLE_MAPS_DIRECTIVES }              from 'angular2-google-maps/core';
import { AppStore }                            from "angular2-redux";
import { ExplorePageActions }                  from "./../../../actions/explore-page-action";
import { CORE_DIRECTIVES, FORM_DIRECTIVES }    from '@angular/common';
import { TOOLTIP_DIRECTIVES }                  from 'ng2-bootstrap';

@Component({
    selector   : 'map',
    directives : [GOOGLE_MAPS_DIRECTIVES],
    template   : require('./map.component.html'),
    styles     : [require('./map.component.scss')]
})
export class Map implements OnInit, OnDestroy {
    @Input() lat                 : number;
    @Input() lng                 : number;
    private entities             : any[];
    private zoom                 : number = 14;
    private unsubscribeFromStore : () => void;

    constructor(private explorePageActions:ExplorePageActions, private exploreActions:ExplorePageActions, private appStore:AppStore) {
        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.entities = state.explore.entities;
        });
    }

    ngOnInit() {
        this.appStore.dispatch(this.exploreActions.FETCH_ENTITIES(this.lat, this.lng));
    }

    ngOnDestroy() {
        this.unsubscribeFromStore();
    }

    private clickOnMap(event) {
        this.appStore.dispatch(this.explorePageActions.HIDE_DETAILS_WINDOW());
    }

    private clickOnMarker(event, placeId) {
        this.appStore.dispatch(this.explorePageActions.SET_PLACE_ID(placeId));
        this.appStore.dispatch(this.explorePageActions.SHOW_DETAILS_WINDOW());
    }
}

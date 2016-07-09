import { Component, Input, OnInit, OnDestroy }  from '@angular/core';
import { AppStore }                             from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../../actions/explore-page-action";

@Component({
    selector: 'entity-details',
    template: require('./entity.details.component.html'),
    styles: [require('./entity.details.component.scss')]
})
export class EntityDetails implements OnInit, OnDestroy {
    @Input() placeId             : string;
    private entity               : Object;
    private photos               : Array<string>;
    private unsubscribeFromStore : () => void;

    constructor(private appStore:AppStore, private explorePageActions:ExplorePageActions) {
        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.entity = state.explore.entityDetails;
            this.photos = state.explore.entityPhotos;
        });
    }

    ngOnInit() {
        this.appStore.dispatch(this.explorePageActions.FETCH_ENTITY_DETAILS(this.placeId));
    }

    ngOnDestroy() {
        this.unsubscribeFromStore();
    }
}

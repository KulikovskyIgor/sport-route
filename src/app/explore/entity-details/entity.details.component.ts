import { Component, Input, OnDestroy }  from '@angular/core';
import { AppStore }                             from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../../actions/explore-page-action";
import { CarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'entity-details',
    template: require('./entity.details.component.html'),
    styles: [require('./entity.details.component.scss')],
    directives: [CarouselComponent]
})
export class EntityDetails implements OnDestroy {
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

    ngOnDestroy() {
        this.unsubscribeFromStore();
    }
}

import { Component, Input, OnInit, OnDestroy }  from '@angular/core';
import { AppStore }                             from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../../actions/explore-page-action";
import { CarouselComponent } from './carousel/carousel.component';
import { UsersReviewsComponent } from './users-reviews/users.reviews.component';

@Component({
    selector: 'entity-details',
    template: require('./entity.details.component.html'),
    styles: [require('./entity.details.component.scss')],
    directives: [CarouselComponent, UsersReviewsComponent]
})
export class EntityDetails implements OnInit, OnDestroy {
    @Input() placeId             : string;
    private entity               : Object;
    private photos               : Array<Object>;
    private unsubscribeFromStore : () => void;
    private isOpen               : boolean = false;

    constructor(private appStore:AppStore, private explorePageActions:ExplorePageActions) {
        const { entityDetails, entityPhotos } = appStore.getState().explore;
        this.entity = entityDetails;
        this.photos = entityPhotos;
        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.entity = state.explore.entityDetails;
            this.photos = state.explore.entityPhotos;
        });
    }

    ngOnInit() {
        setTimeout(() => this.isOpen = true, 0);
    }

    ngOnDestroy() {
        this.isOpen = false;
        this.unsubscribeFromStore();
    }
}

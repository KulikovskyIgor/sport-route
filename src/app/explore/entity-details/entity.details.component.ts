import { Component, Input, OnInit, OnDestroy }  from '@angular/core';
import { AppStore }                             from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../../actions/explore-page-actions";
import { CarouselComponent }                    from './carousel';
import { UsersReviewsComponent }                from './users-reviews';

@Component({
    selector   : 'entity-details',
    template   : require('./entity.details.component.html'),
    styles     : [require('./entity.details.component.scss')],
    directives : [CarouselComponent, UsersReviewsComponent]
})
export class EntityDetails implements OnInit, OnDestroy {
    @Input() placeId             : string;
    @Input() isOpened            : boolean = false;
    private entity               : Object;
    private photos               : Array<Object>;
    private unsubscribeFromStore : () => void;

    constructor(private appStore:AppStore, private explorePageActions:ExplorePageActions) {
        const { entityDetails, entityPhotos } = appStore.getState().explore;
        this.entity = entityDetails;
        this.photos = entityPhotos;
        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.entity = state.explore.entityDetails;
            this.photos = state.explore.entityPhotos;
        });
    }

    ngOnDestroy() {
        this.appStore.dispatch(this.explorePageActions.CLEAN_ENTITY());
        this.unsubscribeFromStore();
    }
}

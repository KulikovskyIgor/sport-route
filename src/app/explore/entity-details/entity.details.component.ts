import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppStore } from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../../actions/explore-page-action";
import { MapService } from './../../services/map.service';

@Component({
    selector: 'entity-details',
    viewProviders: [MapService],
    template: require('./entity.details.component.html'),
    styles: [require('./entity.details.component.scss')]
})
export class EntityDetails implements OnDestroy {

    @Input() placeId:string;
    private entity:Object;
    private unsubscribeFromStore:()=>void;

    constructor(public appStore:AppStore, public explorePageActions:ExplorePageActions, public mapService:MapService) {
        let store = appStore.getState();
        this.placeId = store.explore.placeId;

        this.mapService.fetchEntityDetails(this.placeId)
            .then(data => {
                this.entity = data;
            });

        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.placeId = state.explore.placeId;
            this.mapService.fetchEntityDetails(this.placeId)
                .then(data => {
                    this.entity = data;
                });
        });
    }

    public ngOnDestroy() {
        this.unsubscribeFromStore();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { AppStore } from "angular2-redux";
import { ExplorePageActions, ExplorePageTypes } from "./../../actions/explore-page-action";
import { MapService } from './../services/map.service';
import { EntityDetails } from './entity-details';
import { Map } from './map';

@Component({
    selector: 'explore',
    viewProviders: [MapService],
    directives: [EntityDetails, Map],
    template: require('./explore.component.html'),
    styles: [require('./explore.component.scss')]
})
export class Explore implements OnInit, OnDestroy {

    lat:number = 0;
    lng:number = 0;
    place:string = null;
    entities:Object = [];
    isShowEntityDetails: boolean = false;
    private unsubscribeFromStore:()=>void;

    constructor(public mapService:MapService, routeParams:RouteParams, appStore: AppStore, exploreActions: ExplorePageActions) {
        this.lat = +routeParams.get('lat');
        this.lng = +routeParams.get('lng');
        this.place = routeParams.get('place');

        this.unsubscribeFromStore = appStore.subscribe((state) => {
            if(ExplorePageTypes.SHOW_DETAILS_WINDOW == state.explore.entityDetailsState){
                this.isShowEntityDetails = true;
            }
            if(ExplorePageTypes.HIDE_DETAILS_WINDOW == state.explore.entityDetailsState){
                this.isShowEntityDetails = false;
            }
        });
    }

    ngOnInit() {
        this.mapService.fetchEntities(this.lat, this.lng)
            .then(data => {
                this.entities = data;
            });
    }

    public ngOnDestroy() {
        this.unsubscribeFromStore();
    }
}

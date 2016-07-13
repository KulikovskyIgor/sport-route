import { Component, OnDestroy }                 from '@angular/core';
import { RouteParams }                          from '@angular/router-deprecated';
import { AppStore }                             from 'angular2-redux';
import { ExplorePageActions, ExplorePageTypes } from './../../actions/explore-page-actions';
import { EntityDetails }                        from './entity-details';
import { Map }                                  from './map';

@Component({
    selector      : 'explore',
    viewProviders : [ExplorePageActions],
    directives    : [EntityDetails, Map],
    template      : require('./explore.component.html'),
    styles        : [require('./explore.component.scss')]
})
export class Explore implements OnDestroy {
    private lat:number                    = 0;
    private lng:number                    = 0;
    private placeId:string                = null;
    private isShowEntityDetails:boolean   = false;
    private isOpenedEntityDetails:boolean = false;
    private unsubscribeFromStore:    ()   => void;

    constructor(private appStore:AppStore, private exploreActions:ExplorePageActions, routeParams:RouteParams) {
        this.lat     = +routeParams.get('lat');
        this.lng     = +routeParams.get('lng');
        this.placeId = routeParams.get('place');

        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.placeId = state.explore.placeId;

            if(ExplorePageTypes.SHOW_DETAILS_WINDOW === state.explore.entityDetailsState){
                if(!this.isShowEntityDetails) this.openEntityDetails();
            }else{
                if(this.isOpenedEntityDetails) this.hideEntityDetails();
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribeFromStore();
    }

    private openEntityDetails(){
        this.isShowEntityDetails = true;
        setTimeout(() => this.isOpenedEntityDetails = true, 0);
    }

    private hideEntityDetails(){
        this.isOpenedEntityDetails = false;
        setTimeout(() => this.isShowEntityDetails = false, 500);
    }
}

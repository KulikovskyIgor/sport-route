import { Component, OnDestroy }              from '@angular/core';
import { Http }                              from '@angular/http';
import { Router }                            from '@angular/router-deprecated';
import { AppStore }                          from "angular2-redux";
import { HomePageActions, ExplorePageTypes } from "./../../actions/home-page-actions";

@Component({
    selector      : 'my-home',
    viewProviders : [HomePageActions],
    template      : require('./home.component.html'),
    styles        : [require('./home.component.scss')]
})
export class HomeComponent implements OnDestroy {
    private q                     : string;
    private city                  : Object;
    private cities                : Array<Object>;
    private unsubscribeFromStore  : () => void;
    private qTimeout              = null;
    private isCitiesChooserOpened : bool = false;

    constructor(private router:Router, private appStore:AppStore, private homeActions:HomePageActions) {
        this.unsubscribeFromStore = appStore.subscribe((state) => {
            this.city = state.home.city;
            this.cities = state.home.cities;
        });
    }

    ngOnDestroy() {
        this.unsubscribeFromStore();
    }

    handleChangeQ(q) {
        if (q.length > 2) {
            if (this.qTimeout) clearTimeout(this.qTimeout);
            this.qTimeout = setTimeout(() => {
                this.appStore.dispatch(this.homeActions.FETCH_CITIES(q));
                this.isCitiesChooserOpened = true;
            }, 300);
        }
    }

    handleChooseCity(city){
        this.q = city.formattedAddress;
        this.isCitiesChooserOpened = false;
        this.appStore.dispatch(this.homeActions.SET_CITY(city));
    }

    goToExplorePage() {
        this.router.navigate(['Explore', this.city.geometry.location]);
    }
}


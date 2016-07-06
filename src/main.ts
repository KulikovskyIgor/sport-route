import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { JSONP_PROVIDERS } from '@angular/http';
import { GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

import {AppComponent} from './app/app.component';

const ENV_PROVIDERS = [];

if (process.env.ENV === 'build') {
    enableProdMode();
}

import {AppStore,createAppStoreFactoryWithOptions} from "angular2-redux";
import explore from './reducers/explore-page-reducer';
import {ExplorePageActions} from './actions/explore-page-action';

const appStoreFactory = createAppStoreFactoryWithOptions({
    reducers:{ explore },
    debug:true
});

bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    ...JSONP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provide(AppStore, { useFactory: appStoreFactory }),
    ExplorePageActions
])
    .catch(err => console.error('bootstrap', err));

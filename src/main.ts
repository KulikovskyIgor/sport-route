import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire,
    AuthMethods,
    AuthProviders,
    firebaseAuthConfig } from 'angularfire2';
import { JSONP_PROVIDERS } from '@angular/http';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import {AppComponent} from './app/app.component';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import {AppStore,createAppStoreFactoryWithOptions} from "angular2-redux";
import explore from './reducers/explore-page-reducer';
import {ExplorePageActions} from './actions/explore-page-action';

const appStoreFactory = createAppStoreFactoryWithOptions({
    reducers:{ explore },
    debug:true
});

bootstrap(AppComponent, [
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
    ...JSONP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    FIREBASE_PROVIDERS,
    defaultFirebase('https://changeyouself.firebaseio.com/'),
    firebaseAuthConfig({
        provider: AuthProviders.Password,
        method: AuthMethods.Password
    }),
    provide(AppStore, { useFactory: appStoreFactory }),
    ExplorePageActions
])
    .catch(err => console.error(err));

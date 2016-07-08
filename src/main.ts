import { enableProdMode, provide }                from '@angular/core';
import { bootstrap }                              from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS }                       from '@angular/router-deprecated';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS }                         from '@angular/http';
import { JSONP_PROVIDERS }                        from '@angular/http';
import { GOOGLE_MAPS_PROVIDERS }                  from 'angular2-google-maps/core';

import { AppComponent }                           from './app/app.component';

import { AppStore }                               from "angular2-redux";
import  AppStoreFactory                           from './store';

if (process.env.ENV === 'build') {
    enableProdMode();
}

bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    ...JSONP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provide(AppStore, {useFactory: AppStoreFactory})
])
    .catch(err => console.error('bootstrap', err));

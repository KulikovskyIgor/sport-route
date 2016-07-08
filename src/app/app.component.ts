import { Component, ViewEncapsulation }   from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { HomeComponent }                  from './home';
import { Explore }                        from './explore';
import { AboutComponent }                 from './about';

import '../style/app.scss';

@Component({
    selector      : 'my-app',
    encapsulation : ViewEncapsulation.None,
    directives    : [...ROUTER_DIRECTIVES],
    template      : require('./app.component.html'),
    styles        : [require('./app.component.scss')],
})
@RouteConfig([
    {path : '/', component        : HomeComponent, name  : 'Home'},
    {path : '/About', component   : AboutComponent, name : 'About'},
    {path : '/Explore', component : Explore, name        : 'Explore'}
])
export class AppComponent {}

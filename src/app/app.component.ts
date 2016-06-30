import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AuthService } from './services/auth.servise';

import { ApiService } from './shared';
import { HomeComponent } from './home';
import { Explore } from './explore';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { SignUpComponent } from './sign_up';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app', // <my-app></my-app>
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService],
  viewProviders: [AuthService],
  directives: [...ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/About', component: AboutComponent, name: 'About'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/signUp', component: SignUpComponent, name: 'SignUp'},
  {path: '/Explore', component: Explore, name: 'Explore'}
])
export class AppComponent {
  authState: boolean;
  user: any;

  constructor(private api: ApiService, public auth: AuthService) {
    this.user = auth.currentUser();
    this.authState = auth.authenticated;
    auth.getAuthChangeEmitter().subscribe(() => {
      this.user = auth.currentUser();
      this.authState = auth.authenticated;
    });
  }

  signOut(){
    this.auth.signOut()
  }

}

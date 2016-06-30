import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from '@angular/common';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods  } from 'angularfire2';
import { Router } from '@angular/router-deprecated'

@Component({
    selector: 'my-login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')],
    directives: [FORM_DIRECTIVES]
})
export class LoginComponent {
    form: ControlGroup;
    email: AbstractControl;
    password: AbstractControl;
    massage: string;

    constructor(public af: AngularFire, fb: FormBuilder, public router: Router) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    passwordLogin(form) {
        let promise = this.af.auth.login(form);
        promise.then(response => {
            this.router.navigate(['Home']);
        }).catch(err => {
            this.massage = "The specified user does not exist.";
        });
    }

    socialLogin(provider:string) {
        let promise = this.af.auth.login({
            provider: AuthProviders[provider],
            method: AuthMethods.Popup,
        });
        promise.then(response => {
            this.router.navigate(['Home']);
            console.log(response);
        }).catch(err => {
            console.log(err);
            this.massage = "Something when wrong.";
        });
    }

}

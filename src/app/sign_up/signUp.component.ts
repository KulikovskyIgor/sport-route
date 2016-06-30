import { Component } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from '@angular/common';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods  } from 'angularfire2';
import { Router } from '@angular/router-deprecated'

@Component({
    selector: 'my-signUp',
    template: require('./signUp.component.html'),
    styles: [require('./signUp.component.scss')],
    directives: [FORM_DIRECTIVES]
})
export class SignUpComponent {
    form: ControlGroup;
    email: AbstractControl;
    password: AbstractControl;
    confirm: AbstractControl;
    massage: string;

    constructor(public af: AngularFire, fb: FormBuilder, public router: Router) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'confirm': ['', Validators.required]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirm = this.form.controls['confirm'];
    }

    createUser(form) {
        if(form.password === form.confirm){
            let promise = this.af.auth.createUser(form);
            promise.then(response => {
                let promise = this.af.auth.login({
                    email: form.email,
                    password: form.password
                });
                promise.then(response=>{
                    console.log(response);
                    this.af.database.object('/users/' +  response.uid).set({
                        name: '',
                        email: response.password.email,
                        profileImageURL: response.password.profileImageURL,
                        id: response.uid,
                        role: 'user'
                    });
                    this.router.navigate(['Home']);
                });
            }).catch(err => {
                console.log(err.massage);
                this.massage = "Something when wrong.";
            });
        } else{

        }
    }

    socialLogin(provider:string) {
        let promise = this.af.auth.login({
            provider: AuthProviders[provider],
            method: AuthMethods.Popup,
        });
        promise.then(response => {
            let promise = this.af.database.object('/users/' + response.uid);
            promise.subscribe(user => {
                if(!user){
                    this.af.database.object('/users/' + response.uid).set({
                        name: response[provider.toLowerCase()].displayName,
                        email: '',
                        profileImageURL: response[provider.toLowerCase()].profileImageURL,
                        id: response.uid,
                        role: 'user'
                    });
                }
                this.router.navigate(['Home']);
            })
        }).catch(err => {
            console.log(err);
            this.massage = "Something when wrong.";
        });
    }

}

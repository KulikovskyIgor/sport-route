import { Injectable, Output, EventEmitter } from '@angular/core';
import { AuthProviders, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService{
    @Output() authChanged = new EventEmitter();
    private authState: FirebaseAuthData|FirebaseAuthState;
    constructor(public auth$: FirebaseAuth) {
        this.authState = auth$.getAuth();

        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
            this.authChanged.emit(this.authState);
        });
    }

    get authenticated(): boolean {
        return this.authState !== null && !this.expired;
    }

    currentUser(){
        var user = {
            uid: '',
            name: '',
            img: ''
        };
        if(this.authState){
            switch (this.authState.provider){
                case 1:
                    user.uid = this.authState.uid;
                    user.name = this.authState['twitter'].displayName;
                    user.img = this.authState['twitter'].profileImageURL;
                    break;
                case 2:
                    user.uid = this.authState.uid;
                    user.name = this.authState['facebook'].displayName;
                    user.img = this.authState['facebook'].profileImageURL;
                    break;
                case 3:
                    user.uid = this.authState.uid;
                    user.name = this.authState['google'].displayName;
                    user.img = this.authState['google'].profileImageURL;
                    break;
                case 4:
                    user.uid = this.authState.uid;
                    user.name = this.authState['password'].email;
                    user.img = this.authState['password'].profileImageURL;
                    break;
            }
        }

        return user;
        //return this.authState;
    }

    get expired(): boolean {
        return !this.authState || (this.authState.expires * 1000) < Date.now();
    }

    signOut(): void {
        this.auth$.logout();
    }

    getAuthChangeEmitter() {
        return this.authChanged;
    }
}

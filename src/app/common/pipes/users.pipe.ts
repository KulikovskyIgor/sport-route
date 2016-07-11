import { Pipe } from '@angular/core';

@Pipe({
    name: 'userspipe'
})
export class UsersPipe {
    transform(users = []) {
        return users.reduce((res, user) => {
            if (user.profilePhotoUrl && user.text) {
                res.push(user);
            }
            return res;
        }, []);
    }
}

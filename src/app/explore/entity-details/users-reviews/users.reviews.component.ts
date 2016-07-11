import { Component, Input }                 from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { UsersPipe } from '../../../common/pipes/users.pipe';

@Component({
    selector: 'users-reviews',
    template: require('./users.reviews.component.html'),
    styles: [require('./users.reviews.component.scss')],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    pipes: [UsersPipe]
})
export class UsersReviewsComponent {
    @Input() reviews:Array<Object>;
    private dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    getFormatedDate(time) {
        const date = new Date(+`${time}000`);
        return date.toLocaleString("en-US", this.dateOptions);
    }
}

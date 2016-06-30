import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    selector: 'my-about',
    template: require('./about.component.html'),
    styles: [require('./about.component.scss')],
    directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AboutComponent {
    public singleModel:string = '1';
    public radioModel:string = 'Middle';
    public checkModel:any = {left: false, middle: true, right: false};
}

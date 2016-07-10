import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Slide } from '../../../common/carousel/slide.component';
import { Carousel } from '../../../common/carousel/carousel.component';

@Component({
    selector: 'carousel',
    encapsulation: ViewEncapsulation.none,
    template: require('./carousel.component.html'),
    styles: [require('./carousel.component.scss')],
    directives: [Slide, Carousel, CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class Carousel {
    @Input() photos : Array<Object>;


    private NextPhotoInterval:number = 5000;
    //Looping or not
    private noLoopSlides:boolean = true;
    //Photos
    private slides:Array<any> = [];

    private removeLastSlide() {
        this.slides.pop();
    }
}

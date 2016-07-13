import { Component, Input }                 from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Slide }                            from '../../../common/carousel/slide.component';
import { Carousel }                         from '../../../common/carousel/carousel.component';

@Component({
    selector   : 'carousel',
    template   : require('./carousel.component.html'),
    styles     : [require('./carousel.component.scss')],
    directives : [Slide, Carousel, CORE_DIRECTIVES, FORM_DIRECTIVES],
})
export class CarouselComponent {
    @Input() photos           : Array<Object>;
    private NextPhotoInterval : number = 3000000;
    private noLoopSlides      : boolean = false;
}

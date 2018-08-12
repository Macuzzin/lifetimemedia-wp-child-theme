import $ from 'jquery';

class Slider {
    constructor() {
        this.el = $(".slider");
        this.init();
    }

    init() {
        this.el.slick({
            slidesToShow: 1
        });
    }
}

export default Slider;
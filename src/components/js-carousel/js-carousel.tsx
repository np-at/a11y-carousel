import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'js-carousel',
  styleUrl: 'js-carousel.scss',
  shadow: true,
})
export class JsCarousel {

  private _animateHeight = function() {
    let _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      let targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };
  private  _animateSlide = (targetLeft, callback) => {

  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}

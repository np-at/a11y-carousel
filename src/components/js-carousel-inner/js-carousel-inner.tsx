import {Component, Element, h, Host, Listen, Prop, State} from '@stencil/core';
import {swipeEnd, swipeMove, swipeStart} from "../js-carousel/js-carousel-anim-utils";

@Component({
  tag: 'js-carousel-inner',
  styleUrl: 'js-carousel-inner.scss',
  shadow: true,
})
export class JsCarouselInner {

  @Element() host: HTMLJsCarouselInnerElement;

  @Prop() readonly unslick: boolean;
//  @Prop() readonly draggable: boolean;


  @Prop() readonly swipe: any;
  @Prop() readonly vertical: boolean = false;
  @Prop() readonly rtl: boolean = true;
  @Prop() readonly infinite: boolean = false
  @Prop() readonly touchMove: boolean;


  @State() touchObject: { curX: number; curY: number; startY: number; startX: number } = {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  };

  // internal state representations that do not require a re-render on change
  private internalState = {
    dragging: false,
    animating: false,
    scrolling: false,
    clickable: false,
    currentSlide: undefined


  }
  private listRefHandler = (ref: HTMLDivElement) => {this.listRef = ref}
  private listRef: any;

  @Listen('touchstart', {})
  @Listen('mousedown', {})
  handleSwipeStart(ev: TouchEvent | MouseEvent) {
    console.log("Swipe Start Fired", ev);

//    if (this.props.verticalSwiping) {
//      this.disableBodyScroll();
//    }
    let state = swipeStart(ev, this.swipe, this.host.draggable);
    if (!state) return;
    {
      this.touchObject = state.touchObject;
      this.internalState.dragging = state.dragging
    }
  };

  @Listen('touchmove')
  @Listen('mousemove')
  handleSwipeMove(ev: TouchEvent | MouseEvent) {
    console.log("Swipe Move Fired", ev);

    let state = swipeMove(ev, {
      ...this.host.attributes,
      ...this.internalState,
      touchObject: this.touchObject,
//      trackRef: this.track,
//      listRef: this.list,
      slideIndex: this.internalState.currentSlide
    });
    if (!state) return;
    if (state["swiping"]) {
      this.internalState.clickable = false;
    }
    Object.assign(state, this.internalState);
  };

  @Listen('touchend')
  touchEndHandler(ev: TouchEvent) {
    console.log("Touch End fired", ev);

    swipeEnd(ev, {});
    this.internalState.clickable = true;
  }

  @Listen('touchcancel')
  touchCancelHandler(ev: TouchEvent) {
    this.internalState.dragging && this.touchMove ? swipeEnd(ev, { }) : null;
    console.log("Touch Cancel fired", ev);
  }

  @Listen('mouseout')
  handleSwipeEnd(ev: TouchEvent | MouseEvent) {

  }


//   componentDidMount() {
//    this.props.onInit && this.props.onInit();
//    if (this.props.lazyLoad) {
//      let slidesToLoad = getOnDemandLazySlides({
//        ...this.props,
//        ...this.state
//      });
//      if (slidesToLoad.length > 0) {
//        this.setState(prevState => ({
//          lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
//        }));
//        if (this.props.onLazyLoad) {
//          this.props.onLazyLoad(slidesToLoad);
//        }
//      }
//    }
//    let spec = { listRef: this.list, trackRef: this.track, ...this.props };
//    this.updateState(spec, true, () => {
//      this.adaptHeight();
//      this.props.autoplay && this.autoPlay("update");
//    });
//    if (this.props.lazyLoad === "progressive") {
//      this.lazyLoadTimer = setInterval(this.progressiveLazyLoad, 1000);
//    }
//    this.ro = new ResizeObserver(() => {
//      if (this.state.animating) {
//        this.onWindowResized(false); // don't set trackStyle hence don't break animation
//        this.callbackTimers.push(
//          setTimeout(() => this.onWindowResized(), this.props.speed)
//        );
//      } else {
//        this.onWindowResized();
//      }
//    });
//    this.ro.observe(this.list);
//    document.querySelectorAll &&
//    Array.prototype.forEach.call(
//      document.querySelectorAll(".slick-slide"),
//      slide => {
//        slide.onfocus = this.props.pauseOnFocus ? this.onSlideFocus : null;
//        slide.onblur = this.props.pauseOnFocus ? this.onSlideBlur : null;
//      }
//    );
//    if (window.addEventListener) {
//      window.addEventListener("resize", this.onWindowResized);
//    } else {
//      window.attachEvent("onresize", this.onWindowResized);
//    }
//  };
  render() {
    return (
      <Host>
        {/*<div {...innerSliderProps}>*/}
        <div>
          {/*{!this.unslick ? prevArrow : ""}*/}
          <div ref={this.listRefHandler} >
            {Array.from(this.host.children).map((child, index) => <li key={`c+${index}`}
                                                                      aria-setsize={this.host.children.length}
                                                                      aria-posinset={index}
                                                                      innerHTML={child.outerHTML}/>)}
            {/*<Track ref={this.trackRefHandler} {...trackProps}>*/}
            {/*  {this.children}*/}
            {/*</Track>*/}
          </div>
          {/*{!this.unslick ? nextArrow : ""}*/}
          {/*{!this.unslick ? dots : ""}*/}
        </div>
      </Host>
    );
  }

}

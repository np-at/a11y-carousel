import {
  canGoNext,
  checkNavigable,
  getSlideCount,
  getSwipeDirection,
  getTrackAnimateCSS,
  getTrackCSS,
  getTrackLeft,
  safePreventDefault
} from "./js-carousel-utils";


export const swipeStart: (e: any, swipe: any, draggable: boolean) => (null | { dragging: boolean; touchObject: { curX: any; curY: any; startY: any; startX: any } }) = (e: any, swipe: any, draggable: boolean) => {
  e.target.tagName === "IMG" && safePreventDefault(e);
  if (!swipe || (!draggable && e.type.indexOf("mouse") !== -1)) return null;
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};

export const swipeMove = (e, spec) => {
  // spec also contains, trackRef and slideIndex
  const {
    scrolling,
    animating,
    vertical,
    swipeToSlide,
    verticalSwiping,
    rtl,
    currentSlide,
    edgeFriction,
    edgeDragged,
    onEdge,
    swiped,
    swiping,
    slideCount,
    slidesToScroll,
    infinite,
    touchObject,
    swipeEvent,
    listHeight,
    listWidth
  } = spec;
  if (scrolling) return;
  if (animating) return safePreventDefault(e);
  if (vertical && swipeToSlide && verticalSwiping) safePreventDefault(e);
  let swipeLeft,
    state = {};
  let curLeft = getTrackLeft(spec);
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
  touchObject.swipeLength = Math.round(
    Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2))
  );
  let verticalSwipeLength = Math.round(
    Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2))
  );
  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return {scrolling: true};
  }
  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  let positionOffset =
    (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping)
    positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;

  let dotCount = Math.ceil(slideCount / slidesToScroll);
  let swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  let touchSwipeLength = touchObject.swipeLength;
  if (!infinite) {
    if (
      (currentSlide === 0 && (swipeDirection === "right" || swipeDirection === "down")) ||
      (currentSlide + 1 >= dotCount && (swipeDirection === "left" || swipeDirection === "up")) ||
      (!canGoNext(spec) && (swipeDirection === "left" || swipeDirection === "up"))
    ) {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;
      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state["edgeDragged"] = true;
      }
    }
  }
  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state["swiped"] = true;
  }
  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft =
      curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }
  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }
  state = {
    ...state,
    touchObject,
    swipeLeft,
    trackStyle: getTrackCSS({...spec, left: swipeLeft})
  };
  if (
    Math.abs(touchObject.curX - touchObject.startX) <
    Math.abs(touchObject.curY - touchObject.startY) * 0.8
  ) {
    return state;
  }
  if (touchObject.swipeLength > 10) {
    state["swiping"] = true;
    safePreventDefault(e);
  }
  return state;
};
export const swipeEnd = (e, spec) => {
  const {
    dragging,
    swipe,
    touchObject,
    listWidth,
    touchThreshold,
    verticalSwiping,
    listHeight,
    swipeToSlide,
    scrolling,
    onSwipe,
    targetSlide,
    currentSlide,
    infinite
  } = spec;
  if (!dragging) {
    if (swipe) safePreventDefault(e);
    return {};
  }
  let minSwipe = verticalSwiping
    ? listHeight / touchThreshold
    : listWidth / touchThreshold;
  let swipeDirection = getSwipeDirection(touchObject, verticalSwiping);
  // reset the state of touch related state variables.
  let state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };
  if (scrolling) {
    return state;
  }
  if (!touchObject.swipeLength) {
    return state;
  }
  if (touchObject.swipeLength > minSwipe) {
    safePreventDefault(e);
    if (onSwipe) {
      onSwipe(swipeDirection);
    }
    let slideCount, newSlide;
    let activeSlide = infinite ? currentSlide : targetSlide;
    switch (swipeDirection) {
      case "left":
      case "up":
        newSlide = activeSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 0;
        break;
      case "right":
      case "down":
        newSlide = activeSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 1;
        break;
      default:
        slideCount = activeSlide;
    }
    state["triggerSlideHandler"] = slideCount;
  } else {
    // Adjust the track back to it's original position.
    let currentLeft = getTrackLeft(spec);
    state["trackStyle"] = getTrackAnimateCSS({...spec, left: currentLeft});
  }
  return state;
};

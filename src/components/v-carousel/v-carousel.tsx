import {Component, Element, h, Host, Prop, State} from '@stencil/core';


@Component({
  tag: 'v-carousel',
  styleUrl: 'v-carousel.scss',
  shadow: true,
  assetsDirs: ["assets"]
})

export class VCarousel {
  @Element() host: HTMLVCarouselElement

  /**
   * Section title to use in heading
   * @type {string}
   */
  @Prop() readonly sectionTitle = "Carousel!"

  /**
   *   The number of elements to show per page view.
   Defaults to 3
   * @type {number}
   */
  @Prop() readonly pagesize: number = 3;


  /**
   * If defined/true, sets a mutation observer to reinitialize
   * the component when child nodes are changed.
   *
   * Otherwise ignores changes to child nodes.
   * @type {boolean}
   */
  @Prop() readonly watchchildren: boolean = false;

  @State() private page = 0;

  @State() children: HTMLElement[] | undefined = [];

  @State() paginationItems: HTMLLIElement[] | undefined = [];

  private pageMax;


  private paginationIcon = () => <svg aria-hidden={"true"} viewBox="0 0 10 10" height="10px" width="10px"
                                      xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="4" fill="grey" class="pg-circ" opacity=".9"/>
  </svg>


  componentWillLoad() {
    if (this.watchchildren) {
      const observer = new MutationObserver(this._initilize);
      observer.observe(this.host, {attributes: false, childList: true, subtree: false})

    }
    this._initilize();
  }

  componentDidLoad() {
    this._updateActive();
  }

  private _initilize = (..._) => {
    console.debug("mutation args?: ", ..._)
    this.children = Array.from(this.host.children).map((child, index) => <li key={`c+${index}`}
                                                                             innerHTML={child.outerHTML}/>);
    this.pageMax = Math.floor(this.children.length / this.pagesize) + (this.children.length % this.pagesize === 0 ? 0 : 1);
    this._initPaginationItems();

  }
  private _initPaginationItems = () => {
    const p = [];
    for (let i = 0; i < this.pageMax; i++) {
      p.push(<li class={"pagination-item"}>
        <button onClick={this._handlePaginationClick} data-index={i}>{this.paginationIcon()}<span
          class={"sr-only"}>page {i + 1}</span>
        </button>
      </li>)
    }
    this.paginationItems = p;
  }
  private _handlePaginationClick = (e: MouseEvent) => {
    // find the button (target and currentTarget seem to all return the host element for some reason....)
    const targetButton = e.composedPath().find(x => (x as HTMLElement).nodeName === 'BUTTON')
    const dataIndexString = (targetButton as HTMLElement).getAttribute('data-index');
    const newIndex = Number.parseInt(dataIndexString);

    // nothing to do if it's the active page so return
    if (newIndex === this.page) return;

    // const dir = (newIndex > this.page);
    this.page = newIndex;
    this._updateActive();
    this._setFocusToStart();
  }

  // Increments page count by one and updates view;
  private _advSlide = () => {
    this.page++

    // wrap around if needed
    if (this.page >= this.pageMax)
      this.page = 0;

    this._updateActive(true);
    this._setFocusToStart();
  };

  // Decrements page count by 1 and updates view;
  private _decSlide = () => {
    this.page--

    // wrap around if needed
    if (this.page < 0)
      this.page = this.pageMax - 1;
    this._updateActive(false);
    this._setFocusToStart();
  };
  private _updateActive = (inc = undefined) => {
    /**
     * Convenience functions to set `l-slide`
     * and `r-slide` classes
     * @param el - list item to mutate
     */
    const setR = (el) => {
      el.classList?.toggle('l-slide', false);
      el.classList?.toggle('r-slide', true);
      el.classList?.toggle('active', false);
    }
    const setL = (el) => {
      el.classList?.toggle('l-slide', true);
      el.classList?.toggle('r-slide', false);
      el.classList?.toggle('active', false);
    }

    // starting index of our active range
    const start = this.page * this.pagesize;

    // ending index of our active range
    const end = start + this.pagesize;


    for (let i = 0; i < this.children.length; i++) {

      const cur = this.children[i]['$elm$'];
      if (i < start) {

        if (inc === true && this.page === (this.pageMax - 1) && i < this.pagesize) {
          // if we're on the last page (and incrementing), prep to the first view's
          // worth of children so if we increment again and wrap around, the animation comes from the right side
          setR(cur);
          continue;
        }
        setL(cur);
      } else {
        if (i < end) {
          cur.classList?.toggle('active', true);
        } else {
          if (inc === false && this.page === 0 && (this.children.length - this.pagesize) < i) {
            // if we're on the first page (and decrementing), prep to the last view's
            // worth of children so if we decrement again and wrap around, the animation comes from the left side
            console.log("special")
            setL(cur);
            continue
          }
          setR(cur);
        }
      }
    }
    for (let i = 0; i < this.paginationItems.length; i++) {
      const currentItem = this.paginationItems[i]['$elm$'];
      console.debug("current pagination item: ", currentItem)
      if (i === this.page) {
        currentItem.classList.toggle('active', true);
        currentItem.setAttribute('aria-current', 'true');
      } else {
        currentItem.classList?.toggle('active', false);
        currentItem.toggleAttribute('aria-current', false);

      }

    }
  };
  private _setFocusToStart = () => {
    this.host.shadowRoot.querySelector('h2').focus({preventScroll: false});
  }

  render() {
    return (
      <Host>
        <style>
          {`.carousel-wrapper { min-width: calc(${this.pagesize * 50}px + ${this.pagesize} * 3em)}
          .carousel-wrapper > li {
            margin: 0 ${100 / this.pagesize / 4}%;
           }`}
        </style>
        <section>
          <h2 tabindex={"-1"}>{this.sectionTitle}<span
            class={"sr-only"}>{`, has ${this.pageMax} pages with ${this.pagesize} each`}</span></h2>
          <div class={"carousel-body"}>
            <button type={'button'} onClick={this._decSlide}><span
              class={"sr-only"}>{`Show page ${this.page - 1} of ${this.pageMax}`}</span></button>
            <button type={'button'} onClick={this._advSlide}><span
              class={"sr-only"}>{`Show page ${this.page + 1} of ${this.pageMax}`}</span></button>
            <ol class={"carousel-wrapper"}>
              {this.children}
            </ol>
          </div>
          <ol class={"pagination-nav"}>{this.paginationItems}</ol>

        </section>
      </Host>
    );
  }

}

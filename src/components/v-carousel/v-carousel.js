var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, h, Host, Prop, State } from '@stencil/core';
let VCarousel = class VCarousel {
    constructor() {
        /**
         * Section title to use in heading
         * @type {string}
         */
        this.sectionTitle = "Carousel!";
        /**
         *   The number of elements to show per page view.
         Defaults to 3
         * @type {number}
         */
        this.pagesize = 3;
        /**
         * If defined/true, sets a mutation observer to reinitialize
         * the component when child nodes are changed.
         *
         * Otherwise ignores changes to child nodes.
         * @type {boolean}
         */
        this.watchchildren = false;
        this.page = 0;
        this.children = [];
        this.paginationItems = [];
        this.paginationIcon = () => h("svg", { "aria-hidden": "true", viewBox: "0 0 10 10", height: "10px", width: "10px", xmlns: "http://www.w3.org/2000/svg" },
            h("circle", { cx: "5", cy: "5", r: "4", fill: "grey", class: "pg-circ", opacity: ".9" }));
        this._initilize = (..._) => {
            console.debug("mutation args?: ", ..._);
            this.children = Array.from(this.host.children).map((child, index) => h("li", { key: `c+${index}`, innerHTML: child.outerHTML }));
            this.pageMax = Math.floor(this.children.length / this.pagesize) + (this.children.length % this.pagesize === 0 ? 0 : 1);
            this._initPaginationItems();
        };
        this._initPaginationItems = () => {
            const p = [];
            for (let i = 0; i < this.pageMax; i++) {
                p.push(h("li", { class: "pagination-item" },
                    h("button", { onClick: this._handlePaginationClick, "data-index": i },
                        this.paginationIcon(),
                        h("span", { class: "sr-only" },
                            "page ",
                            i + 1))));
            }
            this.paginationItems = p;
        };
        this._handlePaginationClick = (e) => {
            // find the button (target and currentTarget seem to all return the host element for some reason....)
            const targetButton = e.composedPath().find(x => x.nodeName === 'BUTTON');
            const dataIndexString = targetButton.getAttribute('data-index');
            const newIndex = Number.parseInt(dataIndexString);
            // nothing to do if it's the active page so return
            if (newIndex === this.page)
                return;
            // const dir = (newIndex > this.page);
            this.page = newIndex;
            this._updateActive();
            this._setFocusToStart();
        };
        // Increments page count by one and updates view;
        this._advSlide = () => {
            this.page++;
            // wrap around if needed
            if (this.page >= this.pageMax)
                this.page = 0;
            this._updateActive(true);
            this._setFocusToStart();
        };
        // Decrements page count by 1 and updates view;
        this._decSlide = () => {
            this.page--;
            // wrap around if needed
            if (this.page < 0)
                this.page = this.pageMax - 1;
            this._updateActive(false);
            this._setFocusToStart();
        };
        this._updateActive = (inc = undefined) => {
            var _a, _b;
            /**
             * Convenience functions to set `l-slide`
             * and `r-slide` classes
             * @param el - list item to mutate
             */
            const setR = (el) => {
                var _a, _b, _c;
                (_a = el.classList) === null || _a === void 0 ? void 0 : _a.toggle('l-slide', false);
                (_b = el.classList) === null || _b === void 0 ? void 0 : _b.toggle('r-slide', true);
                (_c = el.classList) === null || _c === void 0 ? void 0 : _c.toggle('active', false);
            };
            const setL = (el) => {
                var _a, _b, _c;
                (_a = el.classList) === null || _a === void 0 ? void 0 : _a.toggle('l-slide', true);
                (_b = el.classList) === null || _b === void 0 ? void 0 : _b.toggle('r-slide', false);
                (_c = el.classList) === null || _c === void 0 ? void 0 : _c.toggle('active', false);
            };
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
                }
                else {
                    if (i < end) {
                        (_a = cur.classList) === null || _a === void 0 ? void 0 : _a.toggle('active', true);
                    }
                    else {
                        if (inc === false && this.page === 0 && (this.children.length - this.pagesize) < i) {
                            // if we're on the first page (and decrementing), prep to the last view's
                            // worth of children so if we decrement again and wrap around, the animation comes from the left side
                            console.log("special");
                            setL(cur);
                            continue;
                        }
                        setR(cur);
                    }
                }
            }
            for (let i = 0; i < this.paginationItems.length; i++) {
                const currentItem = this.paginationItems[i]['$elm$'];
                console.debug("current pagination item: ", currentItem);
                if (i === this.page) {
                    currentItem.classList.toggle('active', true);
                    currentItem.setAttribute('aria-current', 'true');
                }
                else {
                    (_b = currentItem.classList) === null || _b === void 0 ? void 0 : _b.toggle('active', false);
                    currentItem.toggleAttribute('aria-current', false);
                }
            }
        };
        this._setFocusToStart = () => {
            this.host.shadowRoot.querySelector('h2').focus({ preventScroll: false });
        };
    }
    componentWillLoad() {
        if (this.watchchildren) {
            const observer = new MutationObserver(this._initilize);
            observer.observe(this.host, { attributes: false, childList: true, subtree: false });
        }
        this._initilize();
    }
    componentDidLoad() {
        this._updateActive();
    }
    render() {
        return (h(Host, null,
            h("style", null, `.carousel-wrapper { min-width: calc(${this.pagesize * 50}px + ${this.pagesize} * 3em)}
          .carousel-wrapper > li {
            margin: 0 ${100 / this.pagesize / 4}%;
           }`),
            h("section", null,
                h("h2", { tabindex: "-1" },
                    this.sectionTitle,
                    h("span", { class: "sr-only" }, `, has ${this.pageMax} pages with ${this.pagesize} each`)),
                h("div", { class: "carousel-body" },
                    h("button", { type: 'button', onClick: this._decSlide },
                        h("span", { class: "sr-only" }, `Show page ${this.page - 1} of ${this.pageMax}`)),
                    h("button", { type: 'button', onClick: this._advSlide },
                        h("span", { class: "sr-only" }, `Show page ${this.page + 1} of ${this.pageMax}`)),
                    h("ol", { class: "carousel-wrapper" }, this.children)),
                h("ol", { class: "pagination-nav" }, this.paginationItems))));
    }
};
__decorate([
    Element()
], VCarousel.prototype, "host", void 0);
__decorate([
    Prop()
], VCarousel.prototype, "sectionTitle", void 0);
__decorate([
    Prop()
], VCarousel.prototype, "pagesize", void 0);
__decorate([
    Prop()
], VCarousel.prototype, "watchchildren", void 0);
__decorate([
    State()
], VCarousel.prototype, "page", void 0);
__decorate([
    State()
], VCarousel.prototype, "children", void 0);
__decorate([
    State()
], VCarousel.prototype, "paginationItems", void 0);
VCarousel = __decorate([
    Component({
        tag: 'v-carousel',
        styleUrl: 'v-carousel.scss',
        shadow: true,
        assetsDirs: ["assets"]
    })
], VCarousel);
export { VCarousel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1jYXJvdXNlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInYtY2Fyb3VzZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVV2RSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBQXRCO1FBR0U7OztXQUdHO1FBQ2MsaUJBQVksR0FBRyxXQUFXLENBQUE7UUFFM0M7Ozs7V0FJRztRQUNjLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHdEM7Ozs7OztXQU1HO1FBQ2Msa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVqQixhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUV6QyxvQkFBZSxHQUFnQyxFQUFFLENBQUM7UUFLbkQsbUJBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQywwQkFBa0IsTUFBTSxFQUFFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUNuRSxLQUFLLEVBQUMsNEJBQTRCO1lBQ3BFLGNBQVEsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEdBQUUsQ0FDbEUsQ0FBQTtRQWdCRSxlQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FB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VUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3ZCLENBQUM7R0FFVyxTQUFTLENBK01yQjtTQS9NWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnQsIGgsIEhvc3QsIFByb3AsIFN0YXRlfSBmcm9tICdAc3RlbmNpbC9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgdGFnOiAndi1jYXJvdXNlbCcsXG4gIHN0eWxlVXJsOiAndi1jYXJvdXNlbC5zY3NzJyxcbiAgc2hhZG93OiB0cnVlLFxuICBhc3NldHNEaXJzOiBbXCJhc3NldHNcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBWQ2Fyb3VzZWwge1xuICBARWxlbWVudCgpIGhvc3Q6IEhUTUxWQ2Fyb3VzZWxFbGVtZW50XG5cbiAgLyoqXG4gICAqIFNlY3Rpb24gdGl0bGUgdG8gdXNlIGluIGhlYWRpbmdcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBQcm9wKCkgcmVhZG9ubHkgc2VjdGlvblRpdGxlID0gXCJDYXJvdXNlbCFcIlxuXG4gIC8qKlxuICAgKiAgIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gc2hvdyBwZXIgcGFnZSB2aWV3LlxuICAgRGVmYXVsdHMgdG8gM1xuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKi9cbiAgQFByb3AoKSByZWFkb25seSBwYWdlc2l6ZTogbnVtYmVyID0gMztcblxuXG4gIC8qKlxuICAgKiBJZiBkZWZpbmVkL3RydWUsIHNldHMgYSBtdXRhdGlvbiBvYnNlcnZlciB0byByZWluaXRpYWxpemVcbiAgICogdGhlIGNvbXBvbmVudCB3aGVuIGNoaWxkIG5vZGVzIGFyZSBjaGFuZ2VkLlxuICAgKlxuICAgKiBPdGhlcndpc2UgaWdub3JlcyBjaGFuZ2VzIHRvIGNoaWxkIG5vZGVzLlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBQcm9wKCkgcmVhZG9ubHkgd2F0Y2hjaGlsZHJlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBTdGF0ZSgpIHByaXZhdGUgcGFnZSA9IDA7XG5cbiAgQFN0YXRlKCkgY2hpbGRyZW46IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBbXTtcblxuICBAU3RhdGUoKSBwYWdpbmF0aW9uSXRlbXM6IEhUTUxMSUVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IFtdO1xuXG4gIHByaXZhdGUgcGFnZU1heDtcblxuXG4gIHByaXZhdGUgcGFnaW5hdGlvbkljb24gPSAoKSA9PiA8c3ZnIGFyaWEtaGlkZGVuPXtcInRydWVcIn0gdmlld0JveD1cIjAgMCAxMCAxMFwiIGhlaWdodD1cIjEwcHhcIiB3aWR0aD1cIjEwcHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPGNpcmNsZSBjeD1cIjVcIiBjeT1cIjVcIiByPVwiNFwiIGZpbGw9XCJncmV5XCIgY2xhc3M9XCJwZy1jaXJjXCIgb3BhY2l0eT1cIi45XCIvPlxuICA8L3N2Zz5cblxuXG4gIGNvbXBvbmVudFdpbGxMb2FkKCkge1xuICAgIGlmICh0aGlzLndhdGNoY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5faW5pdGlsaXplKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5ob3N0LCB7YXR0cmlidXRlczogZmFsc2UsIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogZmFsc2V9KVxuXG4gICAgfVxuICAgIHRoaXMuX2luaXRpbGl6ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTG9hZCgpIHtcbiAgICB0aGlzLl91cGRhdGVBY3RpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpbGl6ZSA9ICguLi5fKSA9PiB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIm11dGF0aW9uIGFyZ3M/OiBcIiwgLi4uXylcbiAgICB0aGlzLmNoaWxkcmVuID0gQXJyYXkuZnJvbSh0aGlzLmhvc3QuY2hpbGRyZW4pLm1hcCgoY2hpbGQsIGluZGV4KSA9PiA8bGkga2V5PXtgYyske2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTD17Y2hpbGQub3V0ZXJIVE1MfS8+KTtcbiAgICB0aGlzLnBhZ2VNYXggPSBNYXRoLmZsb29yKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC8gdGhpcy5wYWdlc2l6ZSkgKyAodGhpcy5jaGlsZHJlbi5sZW5ndGggJSB0aGlzLnBhZ2VzaXplID09PSAwID8gMCA6IDEpO1xuICAgIHRoaXMuX2luaXRQYWdpbmF0aW9uSXRlbXMoKTtcblxuICB9XG4gIHByaXZhdGUgX2luaXRQYWdpbmF0aW9uSXRlbXMgPSAoKSA9PiB7XG4gICAgY29uc3QgcCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYWdlTWF4OyBpKyspIHtcbiAgICAgIHAucHVzaCg8bGkgY2xhc3M9e1wicGFnaW5hdGlvbi1pdGVtXCJ9PlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuX2hhbmRsZVBhZ2luYXRpb25DbGlja30gZGF0YS1pbmRleD17aX0+e3RoaXMucGFnaW5hdGlvbkljb24oKX08c3BhblxuICAgICAgICAgIGNsYXNzPXtcInNyLW9ubHlcIn0+cGFnZSB7aSArIDF9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbGk+KVxuICAgIH1cbiAgICB0aGlzLnBhZ2luYXRpb25JdGVtcyA9IHA7XG4gIH1cbiAgcHJpdmF0ZSBfaGFuZGxlUGFnaW5hdGlvbkNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAvLyBmaW5kIHRoZSBidXR0b24gKHRhcmdldCBhbmQgY3VycmVudFRhcmdldCBzZWVtIHRvIGFsbCByZXR1cm4gdGhlIGhvc3QgZWxlbWVudCBmb3Igc29tZSByZWFzb24uLi4uKVxuICAgIGNvbnN0IHRhcmdldEJ1dHRvbiA9IGUuY29tcG9zZWRQYXRoKCkuZmluZCh4ID0+ICh4IGFzIEhUTUxFbGVtZW50KS5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpXG4gICAgY29uc3QgZGF0YUluZGV4U3RyaW5nID0gKHRhcmdldEJ1dHRvbiBhcyBIVE1MRWxlbWVudCkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgY29uc3QgbmV3SW5kZXggPSBOdW1iZXIucGFyc2VJbnQoZGF0YUluZGV4U3RyaW5nKTtcblxuICAgIC8vIG5vdGhpbmcgdG8gZG8gaWYgaXQncyB0aGUgYWN0aXZlIHBhZ2Ugc28gcmV0dXJuXG4gICAgaWYgKG5ld0luZGV4ID09PSB0aGlzLnBhZ2UpIHJldHVybjtcblxuICAgIC8vIGNvbnN0IGRpciA9IChuZXdJbmRleCA+IHRoaXMucGFnZSk7XG4gICAgdGhpcy5wYWdlID0gbmV3SW5kZXg7XG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlKCk7XG4gICAgdGhpcy5fc2V0Rm9jdXNUb1N0YXJ0KCk7XG4gIH1cblxuICAvLyBJbmNyZW1lbnRzIHBhZ2UgY291bnQgYnkgb25lIGFuZCB1cGRhdGVzIHZpZXc7XG4gIHByaXZhdGUgX2FkdlNsaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucGFnZSsrXG5cbiAgICAvLyB3cmFwIGFyb3VuZCBpZiBuZWVkZWRcbiAgICBpZiAodGhpcy5wYWdlID49IHRoaXMucGFnZU1heClcbiAgICAgIHRoaXMucGFnZSA9IDA7XG5cbiAgICB0aGlzLl91cGRhdGVBY3RpdmUodHJ1ZSk7XG4gICAgdGhpcy5fc2V0Rm9jdXNUb1N0YXJ0KCk7XG4gIH07XG5cbiAgLy8gRGVjcmVtZW50cyBwYWdlIGNvdW50IGJ5IDEgYW5kIHVwZGF0ZXMgdmlldztcbiAgcHJpdmF0ZSBfZGVjU2xpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wYWdlLS1cblxuICAgIC8vIHdyYXAgYXJvdW5kIGlmIG5lZWRlZFxuICAgIGlmICh0aGlzLnBhZ2UgPCAwKVxuICAgICAgdGhpcy5wYWdlID0gdGhpcy5wYWdlTWF4IC0gMTtcbiAgICB0aGlzLl91cGRhdGVBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMuX3NldEZvY3VzVG9TdGFydCgpO1xuICB9O1xuICBwcml2YXRlIF91cGRhdGVBY3RpdmUgPSAoaW5jID0gdW5kZWZpbmVkKSA9PiB7XG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2UgZnVuY3Rpb25zIHRvIHNldCBgbC1zbGlkZWBcbiAgICAgKiBhbmQgYHItc2xpZGVgIGNsYXNzZXNcbiAgICAgKiBAcGFyYW0gZWwgLSBsaXN0IGl0ZW0gdG8gbXV0YXRlXG4gICAgICovXG4gICAgY29uc3Qgc2V0UiA9IChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0Py50b2dnbGUoJ2wtc2xpZGUnLCBmYWxzZSk7XG4gICAgICBlbC5jbGFzc0xpc3Q/LnRvZ2dsZSgnci1zbGlkZScsIHRydWUpO1xuICAgICAgZWwuY2xhc3NMaXN0Py50b2dnbGUoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB9XG4gICAgY29uc3Qgc2V0TCA9IChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0Py50b2dnbGUoJ2wtc2xpZGUnLCB0cnVlKTtcbiAgICAgIGVsLmNsYXNzTGlzdD8udG9nZ2xlKCdyLXNsaWRlJywgZmFsc2UpO1xuICAgICAgZWwuY2xhc3NMaXN0Py50b2dnbGUoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBzdGFydGluZyBpbmRleCBvZiBvdXIgYWN0aXZlIHJhbmdlXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLnBhZ2UgKiB0aGlzLnBhZ2VzaXplO1xuXG4gICAgLy8gZW5kaW5nIGluZGV4IG9mIG91ciBhY3RpdmUgcmFuZ2VcbiAgICBjb25zdCBlbmQgPSBzdGFydCArIHRoaXMucGFnZXNpemU7XG5cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXG4gICAgICBjb25zdCBjdXIgPSB0aGlzLmNoaWxkcmVuW2ldWyckZWxtJCddO1xuICAgICAgaWYgKGkgPCBzdGFydCkge1xuXG4gICAgICAgIGlmIChpbmMgPT09IHRydWUgJiYgdGhpcy5wYWdlID09PSAodGhpcy5wYWdlTWF4IC0gMSkgJiYgaSA8IHRoaXMucGFnZXNpemUpIHtcbiAgICAgICAgICAvLyBpZiB3ZSdyZSBvbiB0aGUgbGFzdCBwYWdlIChhbmQgaW5jcmVtZW50aW5nKSwgcHJlcCB0byB0aGUgZmlyc3QgdmlldydzXG4gICAgICAgICAgLy8gd29ydGggb2YgY2hpbGRyZW4gc28gaWYgd2UgaW5jcmVtZW50IGFnYWluIGFuZCB3cmFwIGFyb3VuZCwgdGhlIGFuaW1hdGlvbiBjb21lcyBmcm9tIHRoZSByaWdodCBzaWRlXG4gICAgICAgICAgc2V0UihjdXIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHNldEwoY3VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpIDwgZW5kKSB7XG4gICAgICAgICAgY3VyLmNsYXNzTGlzdD8udG9nZ2xlKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaW5jID09PSBmYWxzZSAmJiB0aGlzLnBhZ2UgPT09IDAgJiYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5wYWdlc2l6ZSkgPCBpKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSdyZSBvbiB0aGUgZmlyc3QgcGFnZSAoYW5kIGRlY3JlbWVudGluZyksIHByZXAgdG8gdGhlIGxhc3QgdmlldydzXG4gICAgICAgICAgICAvLyB3b3J0aCBvZiBjaGlsZHJlbiBzbyBpZiB3ZSBkZWNyZW1lbnQgYWdhaW4gYW5kIHdyYXAgYXJvdW5kLCB0aGUgYW5pbWF0aW9uIGNvbWVzIGZyb20gdGhlIGxlZnQgc2lkZVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGVjaWFsXCIpXG4gICAgICAgICAgICBzZXRMKGN1cik7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRSKGN1cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2luYXRpb25JdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLnBhZ2luYXRpb25JdGVtc1tpXVsnJGVsbSQnXTtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJjdXJyZW50IHBhZ2luYXRpb24gaXRlbTogXCIsIGN1cnJlbnRJdGVtKVxuICAgICAgaWYgKGkgPT09IHRoaXMucGFnZSkge1xuICAgICAgICBjdXJyZW50SXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgY3VycmVudEl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAndHJ1ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudEl0ZW0uY2xhc3NMaXN0Py50b2dnbGUoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudEl0ZW0udG9nZ2xlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCBmYWxzZSk7XG5cbiAgICAgIH1cblxuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0Rm9jdXNUb1N0YXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMuaG9zdC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2gyJykuZm9jdXMoe3ByZXZlbnRTY3JvbGw6IGZhbHNlfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxIb3N0PlxuICAgICAgICA8c3R5bGU+XG4gICAgICAgICAge2AuY2Fyb3VzZWwtd3JhcHBlciB7IG1pbi13aWR0aDogY2FsYygke3RoaXMucGFnZXNpemUgKiA1MH1weCArICR7dGhpcy5wYWdlc2l6ZX0gKiAzZW0pfVxuICAgICAgICAgIC5jYXJvdXNlbC13cmFwcGVyID4gbGkge1xuICAgICAgICAgICAgbWFyZ2luOiAwICR7MTAwIC8gdGhpcy5wYWdlc2l6ZSAvIDR9JTtcbiAgICAgICAgICAgfWB9XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgIDxoMiB0YWJpbmRleD17XCItMVwifT57dGhpcy5zZWN0aW9uVGl0bGV9PHNwYW5cbiAgICAgICAgICAgIGNsYXNzPXtcInNyLW9ubHlcIn0+e2AsIGhhcyAke3RoaXMucGFnZU1heH0gcGFnZXMgd2l0aCAke3RoaXMucGFnZXNpemV9IGVhY2hgfTwvc3Bhbj48L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9e1wiY2Fyb3VzZWwtYm9keVwifT5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT17J2J1dHRvbid9IG9uQ2xpY2s9e3RoaXMuX2RlY1NsaWRlfT48c3BhblxuICAgICAgICAgICAgICBjbGFzcz17XCJzci1vbmx5XCJ9PntgU2hvdyBwYWdlICR7dGhpcy5wYWdlIC0gMX0gb2YgJHt0aGlzLnBhZ2VNYXh9YH08L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9eydidXR0b24nfSBvbkNsaWNrPXt0aGlzLl9hZHZTbGlkZX0+PHNwYW5cbiAgICAgICAgICAgICAgY2xhc3M9e1wic3Itb25seVwifT57YFNob3cgcGFnZSAke3RoaXMucGFnZSArIDF9IG9mICR7dGhpcy5wYWdlTWF4fWB9PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPG9sIGNsYXNzPXtcImNhcm91c2VsLXdyYXBwZXJcIn0+XG4gICAgICAgICAgICAgIHt0aGlzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8b2wgY2xhc3M9e1wicGFnaW5hdGlvbi1uYXZcIn0+e3RoaXMucGFnaW5hdGlvbkl0ZW1zfTwvb2w+XG5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9Ib3N0PlxuICAgICk7XG4gIH1cblxufVxuIl19
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
        this.pageSize = 3;
        /**
         * If defined/true, sets a mutation observer to reinitialize
         * the component when child nodes are changed.
         *
         * Otherwise ignores changes to child nodes.
         * @type {boolean}
         */
        this.watchChildren = false;
        this.page = 0;
        this.children = [];
        this.paginationItems = [];
        this.paginationIcon = () => h("svg", { "aria-hidden": "true", viewBox: "0 0 10 10", height: "10px", width: "10px", xmlns: "http://www.w3.org/2000/svg" },
            h("circle", { cx: "5", cy: "5", r: "4", fill: "grey", class: "pg-circ", opacity: ".9" }));
        this._initialize = (..._) => {
            console.debug("mutation args?: ", ..._);
            this.children = Array.from(this.host.children).map((child, index) => h("li", { key: `c+${index}`, "aria-setsize": this.host.children.length, "aria-posinset": index, innerHTML: child.outerHTML }));
            this.pageMax = Math.floor(this.children.length / this.pageSize) + (this.children.length % this.pageSize === 0 ? 0 : 1);
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
            const start = this.page * this.pageSize;
            // ending index of our active range
            const end = start + this.pageSize;
            for (let i = 0; i < this.children.length; i++) {
                const cur = this.children[i]['$elm$'];
                if (i < start) {
                    if (inc === true && this.page === (this.pageMax - 1) && i < this.pageSize) {
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
                        if (inc === false && this.page === 0 && (this.children.length - this.pageSize) < i) {
                            // if we're on the first page (and decrementing), prep to the last view's
                            // worth of children so if we decrement again and wrap around, the animation should come from the left side
                            setL(cur);
                            continue;
                        }
                        setR(cur);
                    }
                }
            }
            for (let i = 0; i < this.paginationItems.length; i++) {
                const currentItem = this.paginationItems[i]['$elm$'].querySelector('button');
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
        if (this.watchChildren) {
            const observer = new MutationObserver(this._initialize);
            observer.observe(this.host, { attributes: false, childList: true, subtree: false });
        }
        this._initialize();
    }
    componentDidLoad() {
        this._updateActive();
    }
    render() {
        return (h(Host, null,
            h("style", null, `.carousel-wrapper { min-width: calc(${this.pageSize * 50}px + ${this.pageSize} * 3em)}
          .carousel-wrapper > li {
            margin: 0 ${100 / this.pageSize / 4}%;
           }`),
            h("section", { "aria-labeledby": "sectionTitle" },
                h("h2", { id: "sectionTitle", tabindex: "-1" },
                    this.sectionTitle,
                    h("span", { class: "sr-only" }, `, has ${this.pageMax} pages with ${this.pageSize} each`)),
                h("div", { class: "carousel-body" },
                    h("button", { type: 'button', onClick: this._decSlide },
                        h("span", { class: "sr-only" }, `Previous Page Show page ${this.page <= 0 ? this.pageMax : this.page - 1} of ${this.pageMax}`)),
                    h("button", { type: 'button', onClick: this._advSlide },
                        h("span", { class: "sr-only" }, `Next Page Show page ${this.page + 1} of ${this.pageMax}`)),
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
], VCarousel.prototype, "pageSize", void 0);
__decorate([
    Prop()
], VCarousel.prototype, "watchChildren", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1jYXJvdXNlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInYtY2Fyb3VzZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVV2RSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBQXRCO1FBR0U7OztXQUdHO1FBQ2MsaUJBQVksR0FBRyxXQUFXLENBQUE7UUFFM0M7Ozs7V0FJRztRQUNjLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHdEM7Ozs7OztXQU1HO1FBQ2Msa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVqQixhQUFRLEdBQThCLEVBQUUsQ0FBQztRQUV6QyxvQkFBZSxHQUFnQyxFQUFFLENBQUM7UUFLbkQsbUJBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQywwQkFBa0IsTUFBTSxFQUFFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUNuRSxLQUFLLEVBQUMsNEJBQTRCO1lBQ3BFLGNBQVEsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEdBQUUsQ0FDbEUsQ0FBQTtRQWdCRSxnQkFBVyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENB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QVIsS0FBSyxFQUFFOzJDQUEwQztBQUV6QztJQUFSLEtBQUssRUFBRTtrREFBbUQ7QUE5QmhELFNBQVM7SUFQckIsU0FBUyxDQUFDO1FBQ1QsR0FBRyxFQUFFLFlBQVk7UUFDakIsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixNQUFNLEVBQUUsSUFBSTtRQUNaLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUN2QixDQUFDO0dBRVcsU0FBUyxDQThNckI7U0E5TVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50LCBoLCBIb3N0LCBQcm9wLCBTdGF0ZX0gZnJvbSAnQHN0ZW5jaWwvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHRhZzogJ3YtY2Fyb3VzZWwnLFxuICBzdHlsZVVybDogJ3YtY2Fyb3VzZWwuc2NzcycsXG4gIHNoYWRvdzogdHJ1ZSxcbiAgYXNzZXRzRGlyczogW1wiYXNzZXRzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgVkNhcm91c2VsIHtcbiAgQEVsZW1lbnQoKSBob3N0OiBIVE1MVkNhcm91c2VsRWxlbWVudFxuXG4gIC8qKlxuICAgKiBTZWN0aW9uIHRpdGxlIHRvIHVzZSBpbiBoZWFkaW5nXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBAUHJvcCgpIHJlYWRvbmx5IHNlY3Rpb25UaXRsZSA9IFwiQ2Fyb3VzZWwhXCJcblxuICAvKipcbiAgICogICBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNob3cgcGVyIHBhZ2Ugdmlldy5cbiAgIERlZmF1bHRzIHRvIDNcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIEBQcm9wKCkgcmVhZG9ubHkgcGFnZVNpemU6IG51bWJlciA9IDM7XG5cblxuICAvKipcbiAgICogSWYgZGVmaW5lZC90cnVlLCBzZXRzIGEgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gcmVpbml0aWFsaXplXG4gICAqIHRoZSBjb21wb25lbnQgd2hlbiBjaGlsZCBub2RlcyBhcmUgY2hhbmdlZC5cbiAgICpcbiAgICogT3RoZXJ3aXNlIGlnbm9yZXMgY2hhbmdlcyB0byBjaGlsZCBub2Rlcy5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBAUHJvcCgpIHJlYWRvbmx5IHdhdGNoQ2hpbGRyZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAU3RhdGUoKSBwcml2YXRlIHBhZ2UgPSAwO1xuXG4gIEBTdGF0ZSgpIGNoaWxkcmVuOiBIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gW107XG5cbiAgQFN0YXRlKCkgcGFnaW5hdGlvbkl0ZW1zOiBIVE1MTElFbGVtZW50W10gfCB1bmRlZmluZWQgPSBbXTtcblxuICBwcml2YXRlIHBhZ2VNYXg7XG5cblxuICBwcml2YXRlIHBhZ2luYXRpb25JY29uID0gKCkgPT4gPHN2ZyBhcmlhLWhpZGRlbj17XCJ0cnVlXCJ9IHZpZXdCb3g9XCIwIDAgMTAgMTBcIiBoZWlnaHQ9XCIxMHB4XCIgd2lkdGg9XCIxMHB4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgIDxjaXJjbGUgY3g9XCI1XCIgY3k9XCI1XCIgcj1cIjRcIiBmaWxsPVwiZ3JleVwiIGNsYXNzPVwicGctY2lyY1wiIG9wYWNpdHk9XCIuOVwiLz5cbiAgPC9zdmc+XG5cblxuICBjb21wb25lbnRXaWxsTG9hZCgpIHtcbiAgICBpZiAodGhpcy53YXRjaENoaWxkcmVuKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX2luaXRpYWxpemUpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmhvc3QsIHthdHRyaWJ1dGVzOiBmYWxzZSwgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiBmYWxzZX0pXG5cbiAgICB9XG4gICAgdGhpcy5faW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTG9hZCgpIHtcbiAgICB0aGlzLl91cGRhdGVBY3RpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxpemUgPSAoLi4uXykgPT4ge1xuICAgIGNvbnNvbGUuZGVidWcoXCJtdXRhdGlvbiBhcmdzPzogXCIsIC4uLl8pXG4gICAgdGhpcy5jaGlsZHJlbiA9IEFycmF5LmZyb20odGhpcy5ob3N0LmNoaWxkcmVuKS5tYXAoKGNoaWxkLCBpbmRleCkgPT4gPGxpIGtleT17YGMrJHtpbmRleH1gfSBhcmlhLXNldHNpemU9e3RoaXMuaG9zdC5jaGlsZHJlbi5sZW5ndGh9IGFyaWEtcG9zaW5zZXQ9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw9e2NoaWxkLm91dGVySFRNTH0vPik7XG4gICAgdGhpcy5wYWdlTWF4ID0gTWF0aC5mbG9vcih0aGlzLmNoaWxkcmVuLmxlbmd0aCAvIHRoaXMucGFnZVNpemUpICsgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICUgdGhpcy5wYWdlU2l6ZSA9PT0gMCA/IDAgOiAxKTtcbiAgICB0aGlzLl9pbml0UGFnaW5hdGlvbkl0ZW1zKCk7XG5cbiAgfVxuICBwcml2YXRlIF9pbml0UGFnaW5hdGlvbkl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IHAgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnZU1heDsgaSsrKSB7XG4gICAgICBwLnB1c2goPGxpIGNsYXNzPXtcInBhZ2luYXRpb24taXRlbVwifT5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLl9oYW5kbGVQYWdpbmF0aW9uQ2xpY2t9IGRhdGEtaW5kZXg9e2l9Pnt0aGlzLnBhZ2luYXRpb25JY29uKCl9PHNwYW5cbiAgICAgICAgICBjbGFzcz17XCJzci1vbmx5XCJ9PnBhZ2Uge2kgKyAxfTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2xpPilcbiAgICB9XG4gICAgdGhpcy5wYWdpbmF0aW9uSXRlbXMgPSBwO1xuICB9XG4gIHByaXZhdGUgX2hhbmRsZVBhZ2luYXRpb25DbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgLy8gZmluZCB0aGUgYnV0dG9uICh0YXJnZXQgYW5kIGN1cnJlbnRUYXJnZXQgc2VlbSB0byBhbGwgcmV0dXJuIHRoZSBob3N0IGVsZW1lbnQgZm9yIHNvbWUgcmVhc29uLi4uLilcbiAgICBjb25zdCB0YXJnZXRCdXR0b24gPSBlLmNvbXBvc2VkUGF0aCgpLmZpbmQoeCA9PiAoeCBhcyBIVE1MRWxlbWVudCkubm9kZU5hbWUgPT09ICdCVVRUT04nKVxuICAgIGNvbnN0IGRhdGFJbmRleFN0cmluZyA9ICh0YXJnZXRCdXR0b24gYXMgSFRNTEVsZW1lbnQpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgIGNvbnN0IG5ld0luZGV4ID0gTnVtYmVyLnBhcnNlSW50KGRhdGFJbmRleFN0cmluZyk7XG5cbiAgICAvLyBub3RoaW5nIHRvIGRvIGlmIGl0J3MgdGhlIGFjdGl2ZSBwYWdlIHNvIHJldHVyblxuICAgIGlmIChuZXdJbmRleCA9PT0gdGhpcy5wYWdlKSByZXR1cm47XG5cbiAgICAvLyBjb25zdCBkaXIgPSAobmV3SW5kZXggPiB0aGlzLnBhZ2UpO1xuICAgIHRoaXMucGFnZSA9IG5ld0luZGV4O1xuICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZSgpO1xuICAgIHRoaXMuX3NldEZvY3VzVG9TdGFydCgpO1xuICB9XG5cbiAgLy8gSW5jcmVtZW50cyBwYWdlIGNvdW50IGJ5IG9uZSBhbmQgdXBkYXRlcyB2aWV3O1xuICBwcml2YXRlIF9hZHZTbGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnBhZ2UrK1xuXG4gICAgLy8gd3JhcCBhcm91bmQgaWYgbmVlZGVkXG4gICAgaWYgKHRoaXMucGFnZSA+PSB0aGlzLnBhZ2VNYXgpXG4gICAgICB0aGlzLnBhZ2UgPSAwO1xuXG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlKHRydWUpO1xuICAgIHRoaXMuX3NldEZvY3VzVG9TdGFydCgpO1xuICB9O1xuXG4gIC8vIERlY3JlbWVudHMgcGFnZSBjb3VudCBieSAxIGFuZCB1cGRhdGVzIHZpZXc7XG4gIHByaXZhdGUgX2RlY1NsaWRlID0gKCkgPT4ge1xuICAgIHRoaXMucGFnZS0tXG5cbiAgICAvLyB3cmFwIGFyb3VuZCBpZiBuZWVkZWRcbiAgICBpZiAodGhpcy5wYWdlIDwgMClcbiAgICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZU1heCAtIDE7XG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLl9zZXRGb2N1c1RvU3RhcnQoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlID0gKGluYyA9IHVuZGVmaW5lZCkgPT4ge1xuICAgIC8qKlxuICAgICAqIENvbnZlbmllbmNlIGZ1bmN0aW9ucyB0byBzZXQgYGwtc2xpZGVgXG4gICAgICogYW5kIGByLXNsaWRlYCBjbGFzc2VzXG4gICAgICogQHBhcmFtIGVsIC0gbGlzdCBpdGVtIHRvIG11dGF0ZVxuICAgICAqL1xuICAgIGNvbnN0IHNldFIgPSAoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdD8udG9nZ2xlKCdsLXNsaWRlJywgZmFsc2UpO1xuICAgICAgZWwuY2xhc3NMaXN0Py50b2dnbGUoJ3Itc2xpZGUnLCB0cnVlKTtcbiAgICAgIGVsLmNsYXNzTGlzdD8udG9nZ2xlKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnN0IHNldEwgPSAoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdD8udG9nZ2xlKCdsLXNsaWRlJywgdHJ1ZSk7XG4gICAgICBlbC5jbGFzc0xpc3Q/LnRvZ2dsZSgnci1zbGlkZScsIGZhbHNlKTtcbiAgICAgIGVsLmNsYXNzTGlzdD8udG9nZ2xlKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gc3RhcnRpbmcgaW5kZXggb2Ygb3VyIGFjdGl2ZSByYW5nZVxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5wYWdlICogdGhpcy5wYWdlU2l6ZTtcblxuICAgIC8vIGVuZGluZyBpbmRleCBvZiBvdXIgYWN0aXZlIHJhbmdlXG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyB0aGlzLnBhZ2VTaXplO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgY29uc3QgY3VyID0gdGhpcy5jaGlsZHJlbltpXVsnJGVsbSQnXTtcbiAgICAgIGlmIChpIDwgc3RhcnQpIHtcblxuICAgICAgICBpZiAoaW5jID09PSB0cnVlICYmIHRoaXMucGFnZSA9PT0gKHRoaXMucGFnZU1heCAtIDEpICYmIGkgPCB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgLy8gaWYgd2UncmUgb24gdGhlIGxhc3QgcGFnZSAoYW5kIGluY3JlbWVudGluZyksIHByZXAgdG8gdGhlIGZpcnN0IHZpZXcnc1xuICAgICAgICAgIC8vIHdvcnRoIG9mIGNoaWxkcmVuIHNvIGlmIHdlIGluY3JlbWVudCBhZ2FpbiBhbmQgd3JhcCBhcm91bmQsIHRoZSBhbmltYXRpb24gY29tZXMgZnJvbSB0aGUgcmlnaHQgc2lkZVxuICAgICAgICAgIHNldFIoY3VyKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXRMKGN1cik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaSA8IGVuZCkge1xuICAgICAgICAgIGN1ci5jbGFzc0xpc3Q/LnRvZ2dsZSgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluYyA9PT0gZmFsc2UgJiYgdGhpcy5wYWdlID09PSAwICYmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIHRoaXMucGFnZVNpemUpIDwgaSkge1xuICAgICAgICAgICAgLy8gaWYgd2UncmUgb24gdGhlIGZpcnN0IHBhZ2UgKGFuZCBkZWNyZW1lbnRpbmcpLCBwcmVwIHRvIHRoZSBsYXN0IHZpZXcnc1xuICAgICAgICAgICAgLy8gd29ydGggb2YgY2hpbGRyZW4gc28gaWYgd2UgZGVjcmVtZW50IGFnYWluIGFuZCB3cmFwIGFyb3VuZCwgdGhlIGFuaW1hdGlvbiBzaG91bGQgY29tZSBmcm9tIHRoZSBsZWZ0IHNpZGVcbiAgICAgICAgICAgIHNldEwoY3VyKTtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFIoY3VyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnaW5hdGlvbkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50SXRlbSA9IHRoaXMucGFnaW5hdGlvbkl0ZW1zW2ldWyckZWxtJCddLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgICAgY29uc29sZS5kZWJ1ZyhcImN1cnJlbnQgcGFnaW5hdGlvbiBpdGVtOiBcIiwgY3VycmVudEl0ZW0pXG4gICAgICBpZiAoaSA9PT0gdGhpcy5wYWdlKSB7XG4gICAgICAgIGN1cnJlbnRJdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICBjdXJyZW50SXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICd0cnVlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50SXRlbS5jbGFzc0xpc3Q/LnRvZ2dsZSgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICBjdXJyZW50SXRlbS50b2dnbGVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsIGZhbHNlKTtcblxuICAgICAgfVxuXG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRGb2N1c1RvU3RhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5ob3N0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignaDInKS5mb2N1cyh7cHJldmVudFNjcm9sbDogZmFsc2V9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEhvc3Q+XG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICB7YC5jYXJvdXNlbC13cmFwcGVyIHsgbWluLXdpZHRoOiBjYWxjKCR7dGhpcy5wYWdlU2l6ZSAqIDUwfXB4ICsgJHt0aGlzLnBhZ2VTaXplfSAqIDNlbSl9XG4gICAgICAgICAgLmNhcm91c2VsLXdyYXBwZXIgPiBsaSB7XG4gICAgICAgICAgICBtYXJnaW46IDAgJHsxMDAgLyB0aGlzLnBhZ2VTaXplIC8gNH0lO1xuICAgICAgICAgICB9YH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPHNlY3Rpb24gYXJpYS1sYWJlbGVkYnk9e1wic2VjdGlvblRpdGxlXCJ9PlxuICAgICAgICAgIDxoMiBpZD17XCJzZWN0aW9uVGl0bGVcIn0gdGFiaW5kZXg9e1wiLTFcIn0+e3RoaXMuc2VjdGlvblRpdGxlfTxzcGFuXG4gICAgICAgICAgICBjbGFzcz17XCJzci1vbmx5XCJ9PntgLCBoYXMgJHt0aGlzLnBhZ2VNYXh9IHBhZ2VzIHdpdGggJHt0aGlzLnBhZ2VTaXplfSBlYWNoYH08L3NwYW4+PC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPXtcImNhcm91c2VsLWJvZHlcIn0+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9eydidXR0b24nfSBvbkNsaWNrPXt0aGlzLl9kZWNTbGlkZX0+PHNwYW5cbiAgICAgICAgICAgICAgY2xhc3M9e1wic3Itb25seVwifT57YFByZXZpb3VzIFBhZ2UgU2hvdyBwYWdlICR7dGhpcy5wYWdlIDw9IDAgPyB0aGlzLnBhZ2VNYXggOiB0aGlzLnBhZ2UgLSAxfSBvZiAke3RoaXMucGFnZU1heH1gfTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT17J2J1dHRvbid9IG9uQ2xpY2s9e3RoaXMuX2FkdlNsaWRlfT48c3BhblxuICAgICAgICAgICAgICBjbGFzcz17XCJzci1vbmx5XCJ9PntgTmV4dCBQYWdlIFNob3cgcGFnZSAke3RoaXMucGFnZSArIDF9IG9mICR7dGhpcy5wYWdlTWF4fWB9PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPG9sIGNsYXNzPXtcImNhcm91c2VsLXdyYXBwZXJcIn0+XG4gICAgICAgICAgICAgIHt0aGlzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8b2wgY2xhc3M9e1wicGFnaW5hdGlvbi1uYXZcIn0+e3RoaXMucGFnaW5hdGlvbkl0ZW1zfTwvb2w+XG5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9Ib3N0PlxuICAgICk7XG4gIH1cblxufVxuIl19
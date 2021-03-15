var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
let MyComponent = class MyComponent {
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", null,
            "Hello, World! I'm ",
            this.getText());
    }
};
__decorate([
    Prop()
], MyComponent.prototype, "first", void 0);
__decorate([
    Prop()
], MyComponent.prototype, "middle", void 0);
__decorate([
    Prop()
], MyComponent.prototype, "last", void 0);
MyComponent = __decorate([
    Component({
        tag: 'my-component',
        styleUrl: 'my-component.css',
        shadow: true,
    })
], MyComponent);
export { MyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXktY29tcG9uZW50LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTzNDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFnQmQsT0FBTztRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPOztZQUF3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQU8sQ0FBQztJQUN2RCxDQUFDO0NBQ0YsQ0FBQTtBQW5CUztJQUFQLElBQUksRUFBRTswQ0FBZTtBQUtkO0lBQVAsSUFBSSxFQUFFOzJDQUFnQjtBQUtmO0lBQVAsSUFBSSxFQUFFO3lDQUFjO0FBZFYsV0FBVztJQUx2QixTQUFTLENBQUM7UUFDVCxHQUFHLEVBQUUsY0FBYztRQUNuQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLE1BQU0sRUFBRSxJQUFJO0tBQ2IsQ0FBQztHQUNXLFdBQVcsQ0F1QnZCO1NBdkJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFByb3AsIGggfSBmcm9tICdAc3RlbmNpbC9jb3JlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHRhZzogJ215LWNvbXBvbmVudCcsXG4gIHN0eWxlVXJsOiAnbXktY29tcG9uZW50LmNzcycsXG4gIHNoYWRvdzogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTXlDb21wb25lbnQge1xuICAvKipcbiAgICogVGhlIGZpcnN0IG5hbWVcbiAgICovXG4gIEBQcm9wKCkgZmlyc3Q6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG1pZGRsZSBuYW1lXG4gICAqL1xuICBAUHJvcCgpIG1pZGRsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBuYW1lXG4gICAqL1xuICBAUHJvcCgpIGxhc3Q6IHN0cmluZztcblxuICBwcml2YXRlIGdldFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0KHRoaXMuZmlyc3QsIHRoaXMubWlkZGxlLCB0aGlzLmxhc3QpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2PkhlbGxvLCBXb3JsZCEgSSdtIHt0aGlzLmdldFRleHQoKX08L2Rpdj47XG4gIH1cbn1cbiJdfQ==
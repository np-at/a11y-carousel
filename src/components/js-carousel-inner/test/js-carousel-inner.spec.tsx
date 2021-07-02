import { newSpecPage } from '@stencil/core/testing';
import { JsCarouselInner } from '../js-carousel-inner';

describe('js-carousel-inner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsCarouselInner],
      html: `<js-carousel-inner></js-carousel-inner>`,
    });
    expect(page.root).toEqualHtml(`
      <js-carousel-inner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </js-carousel-inner>
    `);
  });
});

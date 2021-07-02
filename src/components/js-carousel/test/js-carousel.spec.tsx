import { newSpecPage } from '@stencil/core/testing';
import { JsCarousel } from '../js-carousel';

describe('js-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsCarousel],
      html: `<js-carousel></js-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <js-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </js-carousel>
    `);
  });
});

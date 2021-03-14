import { newSpecPage } from '@stencil/core/testing';
import { VCarousel } from '../v-carousel';

describe('v-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VCarousel],
      html: `<v-carousel></v-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <v-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </v-carousel>
    `);
  });
});

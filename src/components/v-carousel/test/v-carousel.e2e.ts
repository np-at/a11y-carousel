import { newE2EPage } from '@stencil/core/testing';

describe('v-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<v-carousel></v-carousel>');

    const element = await page.find('v-carousel');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('js-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<js-carousel></js-carousel>');

    const element = await page.find('js-carousel');
    expect(element).toHaveClass('hydrated');
  });
});

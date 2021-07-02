import { newE2EPage } from '@stencil/core/testing';

describe('js-carousel-inner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<js-carousel-inner></js-carousel-inner>');

    const element = await page.find('js-carousel-inner');
    expect(element).toHaveClass('hydrated');
  });
});

import {newE2EPage} from '@stencil/core/testing';
//import { axe } from 'jest-axe';


describe('v-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<v-carousel></v-carousel>');

    const element = await page.find('v-carousel');
    expect(element).toHaveClass('hydrated');
  });
  it('passes basic axe test', async () => {

    const page = await newE2EPage({});
    await page.setContent(`<v-carousel>
  <div><p>testing 1234</p>
    <p>testinsgngnshjshsjs</p></div>
  <div>two!</div></v-carousel>`, {})
    await page.waitForChanges();
    const s = await page.find('v-carousel')

//    const content = await page.find('v-carousel')
//    await page.setContent();
//    await page.waitForEvent('domcontentloaded');

//    const element = await page.find('v-carousel');
//  const res = await new AxePuppeteer(page).include('v-carousel').analyze();
    // pass anything that outputs html to axe
    const res = s.shadowRoot.innerHTML as string
    console.log(res);

//     expect(await axe(s.shadowRoot.innerHTML)).toHaveNoViolations()
//    expect(await axe('<div class="stinky"></div>')).toHaveNoViolations();
  })
});

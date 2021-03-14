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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1jYXJvdXNlbC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidi1jYXJvdXNlbC5zcGVjLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDO1lBQzdCLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN2QixJQUFJLEVBQUUsMkJBQTJCO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDOzs7Ozs7S0FNN0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5ld1NwZWNQYWdlIH0gZnJvbSAnQHN0ZW5jaWwvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IFZDYXJvdXNlbCB9IGZyb20gJy4uL3YtY2Fyb3VzZWwnO1xuXG5kZXNjcmliZSgndi1jYXJvdXNlbCcsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcGFnZSA9IGF3YWl0IG5ld1NwZWNQYWdlKHtcbiAgICAgIGNvbXBvbmVudHM6IFtWQ2Fyb3VzZWxdLFxuICAgICAgaHRtbDogYDx2LWNhcm91c2VsPjwvdi1jYXJvdXNlbD5gLFxuICAgIH0pO1xuICAgIGV4cGVjdChwYWdlLnJvb3QpLnRvRXF1YWxIdG1sKGBcbiAgICAgIDx2LWNhcm91c2VsPlxuICAgICAgICA8bW9jazpzaGFkb3ctcm9vdD5cbiAgICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICAgIDwvbW9jazpzaGFkb3ctcm9vdD5cbiAgICAgIDwvdi1jYXJvdXNlbD5cbiAgICBgKTtcbiAgfSk7XG59KTtcbiJdfQ==
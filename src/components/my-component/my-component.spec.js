import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';
describe('my-component', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [MyComponent],
            html: '<my-component></my-component>',
        });
        expect(root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </my-component>
    `);
    });
    it('renders with values', async () => {
        const { root } = await newSpecPage({
            components: [MyComponent],
            html: `<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`,
        });
        expect(root).toEqualHtml(`
      <my-component first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </my-component>
    `);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO0lBQzVCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDO1lBQ2pDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN6QixJQUFJLEVBQUUsK0JBQStCO1NBQ3RDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7O0tBUXhCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ25DLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQztZQUNqQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDekIsSUFBSSxFQUFFLHFGQUFxRjtTQUM1RixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDOzs7Ozs7OztLQVF4QixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3U3BlY1BhZ2UgfSBmcm9tICdAc3RlbmNpbC9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHsgTXlDb21wb25lbnQgfSBmcm9tICcuL215LWNvbXBvbmVudCc7XG5cbmRlc2NyaWJlKCdteS1jb21wb25lbnQnLCAoKSA9PiB7XG4gIGl0KCdyZW5kZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgcm9vdCB9ID0gYXdhaXQgbmV3U3BlY1BhZ2Uoe1xuICAgICAgY29tcG9uZW50czogW015Q29tcG9uZW50XSxcbiAgICAgIGh0bWw6ICc8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50PicsXG4gICAgfSk7XG4gICAgZXhwZWN0KHJvb3QpLnRvRXF1YWxIdG1sKGBcbiAgICAgIDxteS1jb21wb25lbnQ+XG4gICAgICAgIDxtb2NrOnNoYWRvdy1yb290PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBIZWxsbywgV29ybGQhIEknbVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21vY2s6c2hhZG93LXJvb3Q+XG4gICAgICA8L215LWNvbXBvbmVudD5cbiAgICBgKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgd2l0aCB2YWx1ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyByb290IH0gPSBhd2FpdCBuZXdTcGVjUGFnZSh7XG4gICAgICBjb21wb25lbnRzOiBbTXlDb21wb25lbnRdLFxuICAgICAgaHRtbDogYDxteS1jb21wb25lbnQgZmlyc3Q9XCJTdGVuY2lsXCIgbGFzdD1cIidEb24ndCBjYWxsIG1lIGEgZnJhbWV3b3JrJyBKU1wiPjwvbXktY29tcG9uZW50PmAsXG4gICAgfSk7XG4gICAgZXhwZWN0KHJvb3QpLnRvRXF1YWxIdG1sKGBcbiAgICAgIDxteS1jb21wb25lbnQgZmlyc3Q9XCJTdGVuY2lsXCIgbGFzdD1cIidEb24ndCBjYWxsIG1lIGEgZnJhbWV3b3JrJyBKU1wiPlxuICAgICAgICA8bW9jazpzaGFkb3ctcm9vdD5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgSGVsbG8sIFdvcmxkISBJJ20gU3RlbmNpbCAnRG9uJ3QgY2FsbCBtZSBhIGZyYW1ld29yaycgSlNcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tb2NrOnNoYWRvdy1yb290PlxuICAgICAgPC9teS1jb21wb25lbnQ+XG4gICAgYCk7XG4gIH0pO1xufSk7XG4iXX0=
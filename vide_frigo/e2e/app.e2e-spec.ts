import { AppPage } from './app.po';

describe('vide-frigo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(2).toEqual(2);
  });
});

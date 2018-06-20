import { SearchPage } from './search.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('Did it search', () => {
    page.navigateTo().then(() => {

      page.searchFilter();

    });

  });

  it('Add book my library', () => {
    page.navigateTo().then(() => {

      page.addBookMyLibrary();

    });

  });

  it('Add book already read my library', () => {
    page.navigateTo().then(() => {

      page.addBookMyLibraryAlreadyRead();

    });

  });
});

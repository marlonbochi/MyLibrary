import { browser, by, element } from 'protractor';

export class SearchPage {
  //go to the page
  navigateTo() {
    return browser.wait(browser.get('/search'));
  }


  searchFilter() {
    //selects the field and places the search word
    var inputSearch = element.all(by.id("query"));
    inputSearch.sendKeys("hobbit");
    //selects the field and places the search word

    var btnSearch = element.all(by.id("btnSearch"));
    browser.wait(btnSearch.click()).then(() => {

      var books = element.all(by.className('books')).all(by.tagName('a'));
      var firstBook = books.get(0);
      var nameBook = firstBook.all(by.tagName("h4")).getText();

      nameBook.then((name) => {
        expect(name).toContain("El Hobbit");
      });
      
    });
  }

  addBookMyLibrary() {
    //selects the field and places the search word
    var inputSearch = element.all(by.id("query"));
    inputSearch.sendKeys("hobbit");
    //selects the field and places the search word

    var btnSearch = element.all(by.id("btnSearch"));
    browser.wait(btnSearch.click()).then(() => {

      var books = element.all(by.className('books'));
      var firstBook = books.get(0);

      firstBook.all(by.className('btn-group')).all(by.className("btn")).click();
      var btnAddMyLibrary = firstBook
        .all(by.className('btn-group'))
        .all(by.className("divFunctions"))
        .all(by.tagName("button"));

      btnAddMyLibrary.get(1).click();

      expect(element.all(by.className("toast-success"))).length > 0;
      
    });
  }

  addBookMyLibraryAlreadyRead() {
    //selects the field and places the search word
    var inputSearch = element.all(by.id("query"));
    inputSearch.sendKeys("hobbit");
    //selects the field and places the search word

    var btnSearch = element.all(by.id("btnSearch"));
    browser.wait(btnSearch.click()).then(() => {

      var books = element.all(by.className('books'));
      var firstBook = books.get(0);

      firstBook.all(by.className('btn-group')).all(by.className("btn")).click();
      var btnAddMyLibrary = firstBook
        .all(by.className('btn-group'))
        .all(by.className("divFunctions"))
        .all(by.tagName("button"));

      btnAddMyLibrary.get(0).click();

      expect(element.all(by.className("toast-success"))).length > 0;
      
    });
  }
}

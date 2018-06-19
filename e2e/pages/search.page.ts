import { element, browser, by, Key } from 'protractor';

export class SearchPage {
	getPage() {
		return browser.get('/');
	}

	getPageTitle() {
		return browser.getTitle();
	}

}
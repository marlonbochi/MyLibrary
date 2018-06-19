import { by, browser, element } from 'protractor';

import { SearchPage } from './pages/search.page';

describe('Conduit App E2E Test Suite', () => {
	const searchPage = new SearchPage();
	describe('home page should work fine', () => {
		beforeAll(() => {
			searchPage.getPage();
		});
		
		it('should have right title', () => {
			searchPage.getPageTitle()
				.then((title: string) => {
					expect(title).toEqual('Conduit');
				});
		})
		
	})
})
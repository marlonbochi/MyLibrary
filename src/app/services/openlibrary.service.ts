import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Config } from '../config';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ngx-webstorage';


// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
import { Book } from '../model/book.model';

@Injectable()
export class OpenLibraryService {

    options: RequestOptions;

    constructor(public config: Config, 
        private http: Http, 
        private storage: LocalStorageService) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });

    }

    searchBooks(query: string, typeSearch: string, page: number = 1): Observable<any> {
        let url = this.config.urlSearch;
        switch(typeSearch){
            case "author":
                url += '?author='+ encodeURIComponent(query) + '&page=' + page;
            break;

            case "title":
                url += '?title='+ encodeURIComponent(query) + '&page=' + page;
            break;

            case "subject":
                url += '?subject='+ encodeURIComponent(query) + '&page=' + page;
            break;

            case "all":
                url += '?q='+ encodeURIComponent(query) + '&page=' + page;
            break;

            default:
                url += '?title='+ encodeURIComponent(query) + '&page=' + page;
            break;
        }

       return this.http.get(url)
                .pipe(map(res => this.extractData(res)));
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public getMyBooks(){
        let books = this.storage.retrieve("books");
        if(books == null){
            return [];
        }else{
            return books;
        }
    }

    public addStorage(bookModel: Book){
        let books = this.getMyBooks();
        books[bookModel.Id] = bookModel;
        this.storage.store("books", books);
    }

    public removeStorage(bookModel: Book){
        let books = this.getMyBooks();
        delete books[bookModel.Id];
        this.storage.store("books", books);     
    }

    public loading(show: boolean){
        let divLoading = document.getElementById("loadingId") as HTMLBaseElement;

        if(show){
            divLoading.classList.add('show');
        }else{
            divLoading.classList.remove('show');
        }
    }
}

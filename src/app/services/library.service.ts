import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Config } from '../config';
import { Observable } from 'rxjs/Observable';
import { Book, IBook } from '../model/book.model';
import { IdbService } from './idb.service';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';


@Injectable()
export class LibraryService extends BaseService {

    options: RequestOptions;

    constructor(public config: Config,
        private http: Http,
        private IdbService: IdbService) {
        super();

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });

    }

    searchBooks(query: string, typeSearch: string, page: number = 1): Observable<any> {
        let url = this.config.urlSearch;
        switch (typeSearch) {
            case "author":
                url += '?author=' + encodeURIComponent(query) + '&page=' + page;
                break;

            case "title":
                url += '?title=' + encodeURIComponent(query) + '&page=' + page;
                break;

            case "subject":
                url += '?subject=' + encodeURIComponent(query) + '&page=' + page;
                break;

            case "all":
                url += '?q=' + encodeURIComponent(query) + '&page=' + page;
                break;

            default:
                url += '?title=' + encodeURIComponent(query) + '&page=' + page;
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

    public loading(show: boolean) {
        let divLoading = document.getElementById("loadingId") as HTMLBaseElement;

        if (show) {
            divLoading.classList.add('show');
        } else {
            divLoading.classList.remove('show');
        }
    }

    getMyBooks(): Promise<Book[]> {
        return this.connection.select({
            from: 'Books'
        });
    }

    verifyIfExistInDatebase(IdBook: string) {
        return this.connection.count({
            from: 'Books',
            where: {
                IdBook: IdBook
            }
        });
    }

    addBook(book: IBook) {
        return this.connection.insert({
            into: 'Books',
            return: true, // as id is autoincrement, so we would like to get the inserted value
            values: [book]
        });
    }

    deleteBook(IdBook: string) {
        return this.connection.remove({
          from: 'Books',
          where: {
            IdBook: IdBook
          }
        });
    }

    updateBook(IdBook: string, updateValue: IBook) {
        return this.connection.update({
          in: 'Books',
          where: {
            IdBook: IdBook
          },
          set: updateValue
        });
      }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Config } from '../config';
import { Observable } from 'rxjs/Observable';

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
import {map} from 'rxjs/operators';

@Injectable()
export class OpenLibraryService {

    options: RequestOptions;

    constructor(public config: Config, private http: Http) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });

    }

    searchBooks(query: string, page: number = 1): Observable<any> {
        let url = this.config.urlSearch + '?q='+ encodeURIComponent(query) + '&page=' + page;

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
}

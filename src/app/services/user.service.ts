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

@Injectable()
export class UserService {

    options: RequestOptions;

    constructor(public config: Config, private http: Http) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });

    }

    // getSignup(email: string, password: string, confirmPassword: string): Observable<any> {
    //     let body = JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword });
    //     return this.http
    //         .post(this.config.url + 'api/signup', body, this.options)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

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

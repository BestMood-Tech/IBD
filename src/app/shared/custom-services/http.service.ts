import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';

export interface RequestParams {
  headers?: { name: string, value: string }[];
  selectors?: string[];
  searchParams?: any;
}

@Injectable()
export class HttpService {
  private authToken;
  private host = 'https://myhost.com';

  constructor(private http: Http) {
    let token: string;
    try {
      token = localStorage.getItem('token');
      if (token) {
        this.authToken = token;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }

  get auth() {
    return { Authorization: this.authToken };
  }

  public get(url, requestParams?: RequestParams) {
    if (requestParams && requestParams.selectors) {
      url += requestParams.selectors.join(',');
    }
    return this.http.get(this.host + url, this.getOptions(requestParams))
      .catch((error) => this.handleError(error, requestParams));
  }

  public post(url, data, requestParams?: RequestParams) {
    return this.http.post(this.host + url, JSON.stringify(data), this.getOptions(requestParams))
      .catch((error) => this.handleError(error, requestParams, data));
  }

  public put(url, data, requestParams?: RequestParams) {
    return this.http.put(this.host + url, JSON.stringify(data), this.getOptions(requestParams))
      .catch((error) => this.handleError(error, requestParams, data));
  }

  public delete(url, requestParams?: RequestParams) {
    return this.http.delete(this.host + url, this.getOptions(requestParams))
      .catch((error) => this.handleError(error, requestParams));
  }

  private getOptions(requestOptions?: any) {
    const headers = new Headers(this.auth);
    if (requestOptions && requestOptions.headers) {
      requestOptions.headers.forEach((param) => headers.append(param.name, param.value));
    }

    const urlSearchParams = new URLSearchParams();
    if (requestOptions && requestOptions.searchParams) {
      for (const name in requestOptions.searchParams) {
        if (Array.isArray(requestOptions.searchParams[name])) {
          requestOptions.searchParams[name].forEach((value) => {
            urlSearchParams.append(name, value);
          });
        } else {
          urlSearchParams.append(name, requestOptions.searchParams[name]);
        }
      }
    }

    return new RequestOptions({ headers, withCredentials: true, search: urlSearchParams });
  }

  private handleError(error, options, body?: any): Observable<any> {
    let errorInfo =
      `Error:
        STATUS - ${error.status}
        URL - ${error.url}
        MESSAGE - ${error.statusText}`;
    if (body) {
      errorInfo += `
        PAYLOAD - ${JSON.stringify(body)}`;
    }
    if (options) {
      errorInfo += `
        OPTIONS - ${JSON.stringify(options)}}`;
    }
    console.warn(errorInfo);
    return Observable.throw(error);
  }
}

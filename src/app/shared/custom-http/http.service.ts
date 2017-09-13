import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/operator/map';
import 'rxjs/add/operator/toPromise';

enum ApiVersion {
  V4 = 4,
  V5 = 5
}

export interface RequestParams {
  headers?: { name: string, value: string }[];
  selectors?: string[];
  searchParams?: any;
}

@Injectable()
export class HttpService {
  private authHeaders;
  private host;
  private langCode;

  constructor(private http: Http,
              private translate: TranslateService) {
  }

  get key() {
    return this.authHeaders.Key;
  }

  get token() {
    return this.authHeaders.Token;
  }


  public appHost() {
    return this.host;
  }

  public appAuthHeaders(v = ApiVersion.V4) {
    if (!this.authHeaders) {
      return [];
    }

    if (v === ApiVersion.V4) {
      return [
        { name: 'Key', value: this.authHeaders.Key },
        { name: 'Token', value: this.authHeaders.Token },
      ];
    }

    return [{ name: 'Authorization', value: this.authHeaders.Authorization }];
  }

  public get(url, requestParams?: RequestParams) {
    if (requestParams && requestParams.selectors) {
      url += requestParams.selectors.join(',');
    }
    return this.http.get(this.host + url, this.getOptions(url[1], false, requestParams))
      .catch((error) => this.handleError(error, requestParams));
  }

  public post(url, data, requestParams?: RequestParams) {
    return this.http.post(this.host + url, JSON.stringify(data), this.getOptions(url[1], true, requestParams))
      .catch((error) => this.handleError(error, requestParams, data));
  }

  public put(url, data, requestParams?: RequestParams) {
    return this.http.put(this.host + url, JSON.stringify(data), this.getOptions(url[1], true, requestParams))
      .catch((error) => this.handleError(error, requestParams, data));
  }

  public delete(url, requestParams?: RequestParams) {
    return this.http.delete(this.host + url, this.getOptions(url[1], true, requestParams))
      .catch((error) => this.handleError(error, requestParams));
  }

  private getOptions(v = '4', json = true, requestOptions?: any) {
    let headers;
    switch (v) {
      case '5':
        // headers = new Headers(this.auth);
        headers.append('Accept-Language', this.langCode);
        break;
      default:
        headers = new Headers(this.authHeaders);
    }

    if (json) {
      headers.append('Content-Type', 'application/json');
    }

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
    /*
        Re-enable this when salesagent doesn't return 401
        if (error.status === 401) {
          window.location.href = 'https://sello.io';
        }
     */

    if (error.status === 500) {
      this.translate.get(['OOPS', 'SOMETHING_WRONG'])
        .subscribe((data) => alert(`${data['OOPS']}\n${data['SOMETHING_WRONG']}`));
    }
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

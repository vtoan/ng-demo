import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject } from 'rxjs';
import { PagingResponse } from '../models/paging.model';
import { ProductResponse } from '../models/product.model';
import { config } from '../config';
import { GetAllProductRequest } from '../types/product-request.type';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getRepoData(
    req: GetAllProductRequest = {} as GetAllProductRequest
  ): Observable<PagingResponse<ProductResponse> | null> {
    let path = '/products';
    let queryString = this.queryStringBuilder(req);

    // send to serve
    return this.http
      .get<PagingResponse<ProductResponse>>(config.apiUrl + path + queryString)
      .pipe(delay(3000));
    // return of(null).pipe(delay(3000));
  }

  private queryStringBuilder(obj: any) {
    if (!obj) {
      return '';
    }
    let queryString: string[] = [];
    for (const key in obj) {
      if (obj[key]) {
        queryString.push(`${key}=${obj[key]}`);
      }
    }
    return queryString.length > 0 ? '?' + queryString.join('&') : '';
  }
}

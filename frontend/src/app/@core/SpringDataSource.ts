import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class SpringDataSource extends ServerDataSource {

    constructor(
      http: HttpClient,
      endPoint:         string,
      dataKey:          string,
      totalKey:         string,
      private filterPathKey:    string,
    ) {
      super(http, {
        endPoint:       endPoint,
        pagerPageKey:   'page',
        pagerLimitKey:  'size',
        dataKey:        dataKey,
        totalKey:       totalKey,
        sortFieldKey:   'sort',
        filterPath:     filterPathKey,
      });

    }

    // Makes it start at 0
    protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
      if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
        httpParams = httpParams.set(this.conf.pagerPageKey, String(Number(this.pagingConf['page']) - 1));
        httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
      }
      return httpParams;
    }

    //add support for sorting, NOT TESTED ON MULTIPLE PARAMS
    protected addSortRequestParams(httpParams: HttpParams): HttpParams {
      var _this = this;
      if (this.sortConf) {
          this.sortConf.forEach(function (fieldConf) {
              httpParams = httpParams.set(
                _this.conf.sortFieldKey,
                `${fieldConf.field},${fieldConf.direction.toUpperCase()}`,
              );
          });
      }
      return httpParams;
    }

    //adds support for param filtering
    protected addFilterRequestParams(httpParams: HttpParams): HttpParams {
      var _this = this;
      if (this.filterConf.filters) {
          this.filterConf.filters.forEach(function (fieldConf) {
              if (fieldConf['search']) {
                  httpParams = httpParams.set( fieldConf['field'], fieldConf['search'] );
              }
          });
      }
      return httpParams;
    }

    protected requestElements(): Observable<any> {
      var httpParams = this.createRequesParams();
      return this.http.get(
        ( this.filterConf.filters && this.filterConf.filters.length > 0)
          ? this.conf.endPoint + '/' + this.filterPathKey
          : this.conf.endPoint,
        { params: httpParams, observe: 'response' });
    }

}

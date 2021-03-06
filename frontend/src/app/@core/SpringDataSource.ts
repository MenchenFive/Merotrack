import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getDeepFromObject } from 'ng2-smart-table/lib/helpers';

/*export abstract class SpringDataSource extends ServerDataSource {

    constructor(
      http: HttpClient,
      endPoint:         string,
      dataKey:          string,
      totalKey:         string,
      private filterPathKey:    string,
      private projectionKey?:    string,
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

    //adds projectionParams
    protected addProjectionParam(httpParams: HttpParams): HttpParams {
      console.debug('ping');
      var _this = this;
      if (!!this.filterConf.projectionKey) {
        httpParams = httpParams.set('projection', this.projectionKey );
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

    protected extractDataFromResponse(res: any): Array<any>{
      var rawData = res.body;
        var data = !!this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;
        if (data instanceof Array) {
            return data;
        }
        return [];
        throw new Error("Data must be an array.\n    Please check that data extracted from the server response by the key '" + this.conf.dataKey + "' exists and is array.");
    }

    protected createRequesParams(): HttpParams {
      var httpParams = new HttpParams();
      httpParams = this.addSortRequestParams(httpParams);
      httpParams = this.addFilterRequestParams(httpParams);
      httpParams = this.addProjectionParam(httpParams);
      return this.addPagerRequestParams(httpParams);
    }

}
*/

import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';

import { ExternalConfigurationService } from '../../../ExternalConfigurationService';
import { Trip } from './trip';
import { SpringDataSource } from 'spring-table-source';

const urlRoute = 'tripStages';

export class TripStage extends Resource {

  constructor(
    public id?:                 number | null,
    public lat?:           number | null,
    public lon?:           number | null,
    public trip?:       Trip | null,
    public ord?:      number | null,
  )
  { super(); }

  public static newNull(): TripStage {
    return new TripStage(null,null,null,null,null);
  }

  public static compare( a: TripStage, b: TripStage ) {
    if ( a.ord < b.ord ){
      return -1;
    }
    if ( a.ord > b.ord ){
      return 1;
    }
    return 0;
  }

}

@Injectable({
  providedIn: 'root',
})
export class TripStageService extends RestService<TripStage> {
  constructor(injector: Injector) {
    super(TripStage, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TripStageTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.tripStages`, 'page.totalElements', 'specificationquery');
  }
}

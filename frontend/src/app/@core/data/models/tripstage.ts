import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../../SpringDataSource';
import { ExternalConfigurationService } from '../../../ExternalConfigurationService';
import { Trip } from './trip';

const urlRoute = 'tripStages';

export class TripStage extends Resource {

  constructor(
    public id?:                 number | null,
    public lat?:           number | null,
    public lon?:           number | null,
    public trip?:       Trip | null,
  )
  { super(); }

  public static newNull(): TripStage {
    return new TripStage(null,null,null,null);
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

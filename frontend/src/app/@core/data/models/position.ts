import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';

import { ExternalConfigurationService } from '../../../ExternalConfigurationService';
import { Vehicle } from './vehicle';
import { SpringDataSource } from 'spring-table-source';

const urlRoute = 'vehiclePositions';

export class Position extends Resource {

  constructor(
    public id?:                 number | null,
    public date?:               Date | null,
    public course?:           number | null,
    public satellites?:           number | null,
    public speed?:           number | null,
    public lat?:       number | null,
    public lon?:             number | null,
    public vehicle?:             Vehicle | null,
  )
  { super(); }

  public static newNull(): Position {
    return new Position(null,null,null,null,null,null,null);
  }



}

@Injectable({
  providedIn: 'root',
})
export class PositionService extends RestService<Position> {
  constructor(injector: Injector) {
    super(Position, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PositionTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.vehiclePositions`, 'page.totalElements', 'specificationquery');
  }
}

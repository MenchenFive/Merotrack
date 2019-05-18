import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../SpringDataSource';
import { ExternalConfigurationService } from '../../ExternalConfigurationService';
import { Vehicle } from './vehicle';

const urlRoute = 'vehicleIncidences';

export class Incidence extends Resource {

  constructor(
    public id?:                 number,
    public dateStart?:              Date,
    public dateEnd?:              Date,
    public title?:              string,
    public description?:            string,
    public vehicle?:            Vehicle,
  )
  { super(); }

  public static newNull(): Incidence {
    return new Incidence(null,null,null,null,null,null);
  }

}

@Injectable({
  providedIn: 'root',
})
export class IncidenceService extends RestService<Incidence> {
  constructor(injector: Injector) {
    super(Incidence, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleIncidencesTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.vehicleIncidences`, 'page.totalElements', 'specificationquery');
  }
}

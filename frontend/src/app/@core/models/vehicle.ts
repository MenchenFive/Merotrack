import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../SpringDataSource';
import { ExternalConfigurationService } from '../../ExternalConfigurationService';
import { Incidence } from './incidence';
import { Position } from './position';
import { Trip } from './trip';

const urlRoute = 'vehicles';

export class Vehicle extends Resource {

  constructor(
    public id?:                 number | null,
    public brand?:               string | null,
    public model?:           string | null,
    public plate?:           string | null,
    public publicId?:           string | null,
    public privateId?:       string | null,
    public trips?:             Trip[] | null,
    public positions?:      Position[] | null,
    public incidences? :    Incidence[] | null,
  )
  { super(); }

  public static newNull(): Vehicle {
    return new Vehicle(null,null,null,null,null,null,[],[],[]);
  }



}

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends RestService<Vehicle> {
  constructor(injector: Injector) {
    super(Vehicle, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.vehicles`, 'page.totalElements', 'specificationquery');
  }
}

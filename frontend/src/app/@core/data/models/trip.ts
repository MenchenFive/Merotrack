import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../../SpringDataSource';
import { Vehicle } from './vehicle';
import { TripStage } from './tripstage';


const urlRoute = 'trips';

export class Trip extends Resource {

  constructor(
    public id?:                 number | null,
    public description?:               string | null,
    public vehicle?:           Vehicle | null,
    public dateStart?:          Date |null,
    public stages?:           TripStage[] | null,
  )
  { super(); }

  public static newNull(): Trip {
    return new Trip(null, null, null, null, []);
  }

}

@Injectable({
  providedIn: 'root',
})
export class TripService extends RestService<Trip> {
  constructor(injector: Injector) {
    super(Trip, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TripTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.trips`, 'page.totalElements', 'specificationquery');
  }
}

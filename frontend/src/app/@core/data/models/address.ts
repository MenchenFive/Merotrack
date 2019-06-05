import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from 'spring-table-source';



const urlRoute = 'adresses';

export class Adress extends Resource {

  constructor(
    public id?:                 number | null,
    public description?:               string | null,
    public lat?:  number |null,
    public lon?:  number | null,
  )
  { super(); }

  public static newNull(): Adress {
    return new Adress(null, null, null, null);
  }

}

@Injectable({
  providedIn: 'root',
})
export class TripService extends RestService<Adress> {
  constructor(injector: Injector) {
    super(Adress, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TripTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.adresses`, 'page.totalElements', 'specificationquery');
  }
}

import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../SpringDataSource';
import { ExternalConfigurationService } from '../../ExternalConfigurationService';

const urlRoute = 'companies';

export class Company extends Resource {

  public id:                number  | null;
  public name:              string  | null;

}

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends RestService<Company> {
  constructor(injector: Injector) {
    super(Company, urlRoute, injector);
  }
}

/*@Injectable({
  providedIn: 'root',
})
export class PersonTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`,  `_embedded.${urlRoute}`, 'page.totalElements', 'specificationquery');
  }
}*/

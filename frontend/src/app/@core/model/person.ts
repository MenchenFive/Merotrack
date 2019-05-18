import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../SpringDataSource';
import { ExternalConfigurationService } from '../../ExternalConfigurationService';
import { PersonExperience } from './person-experiences';
import { DocumentType } from './document-type';

const urlRoute = 'people';

export class Person extends Resource {

  /*public id:                 number | null;
  public name:               string | null;
  public surname1:           string | null;
  public surname2:           string | null;
  public document:           string | null;
  public phone1:             string | null;
  public phone2:             string | null;
  public address:            string | null;
  public email:              string | null;
  public personExperiences:  PersonExperience[] | null;*/

  constructor(
    public id?:                 number,
    public name?:               string,
    public surname1?:           string,
    public surname2?:           string,
    public document?:           string,
    public documentType?:       DocumentType,
    public phone1?:             string,
    public phone2?:             string,
    public address?:            string,
    public email?:              string,
    public personExperiences?:  PersonExperience[],
  )
  { super(); }

  public static newNull(): Person {
    return new Person(null,null,null,null,null,null,null,null,null,null,[]);
  }



}

@Injectable({
  providedIn: 'root',
})
export class PersonService extends RestService<Person> {
  constructor(injector: Injector) {
    super(Person, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PersonTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.persons`, 'page.totalElements', 'specificationquery');
  }
}

import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../SpringDataSource';
import { ExternalConfigurationService } from '../../ExternalConfigurationService';
import { PersonExperience } from './person-experiences';
import { DocumentType } from './document-type';
import { PersonQualification } from './person-qualification';
import { PersonKnowledge } from './person-knowledges';
import { PersonLanguage } from './person-languages';

const urlRoute = 'people';

export class Person extends Resource {

  constructor(
    public id?:                     number,
    public name?:                   string,
    public surname1?:               string,
    public surname2?:               string,
    public document?:               string,
    public documentType?:           DocumentType,
    public phone1?:                 string,
    public phone2?:                 string,
    public address?:                string,
    public email?:                  string,
    public personExperiences?:      PersonExperience[],
    public personQualifications?:   PersonQualification[],
    public personKnowledges?:       PersonKnowledge[],
    public personLanguages?:        PersonLanguage[],
  )
  { super(); }

  public static newNull(): Person {
    return new Person(null, null, null, null, null, null, null, null, null, null, [], [], [], []);
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

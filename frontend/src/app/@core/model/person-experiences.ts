import { Injectable, Injector } from '@angular/core';
import { RestService, Resource, HalOptions, SubTypeBuilder } from 'angular4-hal';
import { Company } from './company';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

const urlRoute = 'personExperiences';

export class PersonExperience extends Resource {


  /*public id:                number | null;
  public role:              string | null;
  public description:       string | null;
  public dateStart:         Date | null;
  public dateEnd:           Date | null;
  public company:           Company | null;*/

  constructor (
    public id?:                number   ,
    public role?:              string   ,
    public description?:       string   ,
    public dateStart?:         Date     ,
    public dateEnd?:           Date     ,
    public company?:           Company  ,
  ) {
    super();
  }

  public static newNull(): PersonExperience {
    return new PersonExperience(null, null, null, null, null, null);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PersonExperienceService extends RestService<PersonExperience> {
  constructor(injector: Injector) {
    super(PersonExperience, urlRoute, injector);
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

import { Injectable, Injector } from '@angular/core';
import { RestService, Resource } from 'angular4-hal';
import { HttpClient } from '@angular/common/http';
import { SpringDataSource } from '../../SpringDataSource';
import { ExternalConfigurationService } from '../../../ExternalConfigurationService';

const urlRoute = 'users';

export class User extends Resource {

  constructor(
    public id?:                 number,
    public name?:               string,
    public email?:           string,
    /*public password?:           string,
    public salt?:           string,
    public rol?:              Rol,*/
  )
  { super(); }

  public static newNull(): User {
    return new User(null,null,null);
  }



}

@Injectable({
  providedIn: 'root',
})
export class UserService extends RestService<User> {
  constructor(injector: Injector) {
    super(User, urlRoute, injector);
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserTableServerDataSource extends SpringDataSource {
  constructor(http: HttpClient) {
    super(http, `http://localhost:8090/${urlRoute}`, `_embedded.users`, 'page.totalElements', 'specificationquery');
  }
}

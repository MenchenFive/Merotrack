import {Injectable} from '@angular/core';
import {ExternalConfigurationHandlerInterface, ExternalConfiguration} from 'angular4-hal';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  deserialize() {
    //console.debug('serialize accesed');
    return null;
  }

  serialize() {
    //console.debug('serialize accesed');
    return null;
  }

  getProxyUri(): string {
    //console.debug('proxy accesed');
    //return 'http://proxy.url/api/';
    return this.getRootUri();
  }

  getRootUri(): string {
    //console.debug('root uri accesed');
    return 'http://localhost:8090/';
  }

  getHttp(): HttpClient {
    //console.debug('http accesed');
    return this.http;
  }

  constructor(private http: HttpClient) {
  }

  getExternalConfiguration(): ExternalConfiguration {
    //console.debug('external conf accesed');
    return null;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
    //console.debug('external conf setted');
  }
}

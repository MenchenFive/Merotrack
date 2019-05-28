import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from './models/position';
import { Coordinate } from './models/coordinate';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private tripOptimizationUrl: string = 'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/';
  private snapToRoadsUrl: string = 'https://api.mapbox.com/matching/v5/mapbox/driving/';
  private andAccessToken: string = '?access_token=pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw';

  constructor(private http: HttpClient) { }

  public snapToRoads(pos: Position[]): Observable<any>{
    let url = this.snapToRoadsUrl;
    for ( let i = 0 ; i < pos.length ; i++ ) {
      url += pos[i].lon.toFixed(5) + ',' + pos[i].lat.toFixed(5);
      if ( i<pos.length-1 )
      url += ';';
    }
    url += this.andAccessToken + "&geometries=polyline6";

    return this.http.get<any>(url).pipe(
      //map((data: any) => data.map((item: Person) => this.adapt(item))),
    );
    //

  }

  public optimizeRoute(pos: Array<any>): Observable<any> {
    let url = this.tripOptimizationUrl;
    for ( let i = 0 ; i < pos.length ; i++ ) {
      url += pos[i].latLng.lng.toFixed(5) + ',' + pos[i].latLng.lat.toFixed(5);
      if ( i<pos.length-1 )
      url += ';';
    }
    url += this.andAccessToken + "&source=first&roundtrip=true&destination=any";

    return this.http.get<any>(url).pipe(
      //map((data: any) => data.map((item: Person) => this.adapt(item))),
    );
  }

  public static compareReceivedWaypoint( a, b ) {
    if ( a.waypoint_index < b.waypoint_index ){
      return -1;
    }
    if ( a.waypoint_index > b.waypoint_index ){
      return 1;
    }
    return 0;
  }

}

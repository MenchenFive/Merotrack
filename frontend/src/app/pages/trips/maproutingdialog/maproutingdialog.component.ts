import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-icon.png';
import { NbDialogService } from '@nebular/theme';
import { Trip, TripService } from '../../../@core/data/models/trip';
import { isNgTemplate } from '@angular/compiler';
import { TripStageService, TripStage } from '../../../@core/data/models/tripstage';
import { Observable } from 'rxjs';
import { Vehicle, VehicleService } from '../../../@core/data/models/vehicle';


@Component({
  selector: 'ngx-maproutingdialog',
  templateUrl: './maproutingdialog.component.html',
  styleUrls: []
})
export class MaproutingdialogComponent implements OnInit {

  private mapboxapikey = 'pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw';
  private googlekey = 'AIzaSyC-hcxwWIvr4BrdX1jMZyT6FjJ29BGVz-U';

  protected currentTr:      Trip = Trip.newNull();

  protected vehicleResults:   Observable<Vehicle[]>;

  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  @Input() item: Trip;

  protected waypoints: Array<any>;

  constructor(
    private dialogService: NbDialogService,
    protected tripservice: TripService,
    protected tripstageservice: TripStageService,
    protected vehicleService: VehicleService,
  ) {

   }

  ngOnInit() {
    this.currentTr = this.item;

    if ( this.currentTr.stages.length == 0 ) {
      this.waypoints = [L.latLng(39.012039, -3.366161)];
    } else {
      this.waypoints = [];
      for (let i = 0; i < this.item.stages.length ; i++) {
        let stage = this.item.stages[i];
        this.waypoints.push(L.latLng(stage.lat, stage.lon));
      }
    }
  }

  protected map: L.map;

  onMapReady(map: L.Map) {
    this.map = map;

    L.Icon.Default.imagePath = '/assets/img/markers/';
    var control = L.Routing.control({
      waypoints: this.waypoints,
      geocoder: L.Control.Geocoder.nominatim(),
      router: L.Routing.mapbox(this.mapboxapikey, {language: 'es'}),
      language: 'es',
      showAlternatives: true,
    })
    .on('routeselected', (e) => {
      var route = e.route;
      this.waypoints = route.waypoints;
    })
    .addTo(map);

    map.on('click', (e) => {
      var container = L.DomUtil.create('div'),
          startBtn = this.createButton('Desde aquí', container),
          destBtn = this.createButton('Hasta aquí', container);
      container.setAttribute('class', 'btn-group btn-group-full-width');

      L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
      });

      L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
      });

      L.popup()
          .setContent(container)
          .setLatLng(e.latlng)
          .openOn(map);
    })
  }

  search(event) {
    this.vehicleResults = this.vehicleService.search(
        'findByPlateIgnoreCaseContaining',
        {params: [{key: 'plate', value: event.query}]},
    )
  }

  options = {
    layers: [
      L.tileLayer('https://api.mapbox.com/styles/v1/menchencito/cjw12mnjv0n651ctlq2czl3ri/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw', {
        maxZoom: 18,
        attribution: '<a href="https://www.openstreetmap.org/about">OpenStreetMap</a> contributors | '
        + '<a href="https://www.mapbox.com/about/maps">Mapbox</a> | '
        + '<a href="https://apps.mapbox.com/feedback/#/-74.5/40/10">Improve this map</a> | '
        + 'Leaflet, Leaflet-routing-machine'
      }),
    ],
    zoom: 6,
    center: L.latLng({ lat: 39.012039, lng: -3.366161 }),
  };

  protected createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-primary');
    btn.innerHTML = label;
    return btn;
  }

  protected onSubmit(event){
    if ( this.waypoints.length >= 2 ) {
      if (this.currentTr.id != null) {
        this.deleteprevious([...this.currentTr.stages]);
        this.currentTr.stages = [];
        this.tripservice.patch(this.currentTr).subscribe(
          (res: Trip) => {
            let trip: Trip = res;
            this.insertStages(trip);
          }
        );
      } else {
        this.tripservice.create(this.currentTr).subscribe(
          (res: Trip) => {
            let trip: Trip = res;
            this.insertStages(trip);
          }
        );
      }
    } else {
      window.alert( 'Seleccione al menos dos puntos' );
    }
  }

  protected deleteprevious (ts: TripStage[]){
    ts.forEach (
      stage => {
        this.tripstageservice.delete(stage).subscribe( res => { } );
      }
    )
  }

  protected insertStages (t: Trip) {
    this.waypoints.forEach( stage => {
      let ts: TripStage = new TripStage(null,stage.latLng.lat,stage.latLng.lng,t);
      this.tripstageservice.create(ts).subscribe( res => {} );
    } );
  }

}

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet-moving-rotated-marker'
import { PositionService } from '../../@core/data/models/position';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['100size.scss'],
})
export class MapsComponent {

  constructor (
    protected positionService: PositionService,
    protected dateService: NbDateService<Date>,
  ) {}

  private map: L.Map;

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

  onMapReady(map: L.Map) {
    this.map = map;
    L.Icon.Default.imagePath = '/assets/img/markers/';
    L.Control.geocoder({
      defaultMarkGeocode: false
    }).on('markgeocode', function(e) {
      let bbox = e.geocode.bbox;
      let poly = L.polygon([
           bbox.getSouthEast(),
           bbox.getNorthEast(),
           bbox.getNorthWest(),
           bbox.getSouthWest(),
      ])
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);

    this.getHistoric();
  }

  protected getGlobalPos() {
    return this.positionService.search('getLastOfEach'/*, {params: [{key: 'name', value: name}]}*/).subscribe(
      res => {
        var group = []

        res.forEach( pos => {
          let marker = L.marker([pos.lat, pos.lon], {
            icon: this.getIcon(),
            rotationAngle: pos.course,
          }).addTo(this.map);

          group.push(marker);

          var popup = L.tooltip({permanent: true})
            .setContent(
              '<b>' + pos.vehicle.plate + '</b>&nbsp;(' + pos.vehicle.brand + '&nbsp;' + pos.vehicle.model + ')'
              + '<b><br>Satelites</b>: ' + pos.satellites
              + '<b><br>Velocidad</b>: ' + pos.speed
              + '<b><br>Fecha</b>: ' + this.dateService.format(new Date(pos.date),'dd/MM/yyyy hh:mm:ss')
            )
            marker.bindTooltip(popup).openTooltip();
        })

        this.map.fitBounds((new L.featureGroup(group)).getBounds());
      }
    );
  }

  protected getHistoric() {
    return this.positionService.search('getPeriod', {params: [
      {key: 'dateStart', value: new Date('2018-05-06T10:30:23.000+0000').toString()},
      {key: 'dateEnd', value: new Date('2020-05-06T10:30:23.000+0000').toString()},
      {key: 'vehicleId', value: 1},
    ]})
    .subscribe(
      res => {
        var group = []

        res.forEach( pos => {
          let marker = L.marker([pos.lat, pos.lon], {
            icon: this.getIcon(),
            rotationAngle: pos.course,
          }).addTo(this.map);

          group.push(marker);

          var popup = L.tooltip()
            .setContent(
              + '<b><br>Satelites</b>: ' + pos.satellites
              + '<b><br>Velocidad</b>: ' + pos.speed
              + '<b><br>Fecha</b>: ' + this.dateService.format(new Date(pos.date),'dd/MM/yyyy hh:mm:ss')
            )
            marker.bindTooltip(popup);
        });

        this.map.fitBounds((new L.featureGroup(group)).getBounds());
      }
    );
  }

  protected getIcon(){
    return L.icon({
      iconUrl: '/assets/images/markerArrow.png',
      iconSize:     [40, 40], // size of the icon
      iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
      popupAnchor:  [-80, 0] // point from which the popup should open relative to the iconAnchor
  });
  }

}

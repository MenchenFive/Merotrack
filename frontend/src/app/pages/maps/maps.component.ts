import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-icon.png';

@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['100size.scss'],
})
export class MapsComponent {

  protected waypoints = [
    L.latLng(38.991709, -3.886109),
    L.latLng(39.991709, -4.886109)
  ];

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
    L.Icon.Default.imagePath = '/assets/img/markers/';
    L.Control.geocoder({
      defaultMarkGeocode: false
  }).on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
           bbox.getSouthEast(),
           bbox.getNorthEast(),
           bbox.getNorthWest(),
           bbox.getSouthWest()
      ])
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);
  }

}

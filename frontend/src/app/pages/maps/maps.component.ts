import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
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
      L.tileLayer('https://api.mapbox.com/styles/v1/menchencito/cjvfn4t2838je1fprnc72qg4k/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw', {
        maxZoom: 18,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
    ],
    zoom: 6,
    center: L.latLng({ lat: 38.991709, lng: -3.88610 }),
  };

  onMapReady(map: L.Map) {
    L.Icon.Default.imagePath = '/assets/img/markers/';
    L.Routing.control({
      //waypoints: this.waypoints,
      routeWhileDragging: false,
    })
    .on('routeselected', (e) => {
      var route = e.route;
      this.waypoints = route.waypoints;
    })
    .addTo(map);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/images/marker-icon.png';
import { NbDialogService } from '@nebular/theme';
import { Trip } from '../../../@core/data/models/trip';


@Component({
  selector: 'ngx-maproutingdialog',
  templateUrl: './maproutingdialog.component.html',
  styleUrls: []
})
export class MaproutingdialogComponent implements OnInit {

  @Input() item: Trip;

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {
  }

  protected map: L.map;

  onMapReady(map: L.Map) {
    this.map = map;

    L.Icon.Default.imagePath = '/assets/img/markers/';
    var control = L.Routing.control({
      waypoints: this.waypoints,
      routeWhileDragging: false,
      router: L.Routing.mapbox('pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw')
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
      container.setAttribute('class','btn-group btn-group-full-width');

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

  protected waypoints = [
    L.latLng(39.012039, -3.366161),L.latLng(38.012039, -2.366161),
  ];

  options = {
    layers: [
      L.tileLayer('https://api.mapbox.com/styles/v1/menchencito/cjvfn4t2838je1fprnc72qg4k/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWVuY2hlbmNpdG8iLCJhIjoiY2pxd3Y0dGwyMGRocDN4cXU0c2xrdmswdiJ9.fWZ9jJbD-scJ2zWdGMsobw', {
        maxZoom: 18,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

  protected plan(event){
    L.Routing.plan(this.waypoints).addTo(this.map);
  }

}

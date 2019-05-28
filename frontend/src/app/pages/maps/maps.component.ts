import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet-moving-rotated-marker'
import * as polyline from '@mapbox/polyline';
import { PositionService, Position } from '../../@core/data/models/position';
import { NbDateService } from '@nebular/theme';
import { MapboxService } from '../../@core/data/mapboxService.service';
import { Vehicle, VehicleService } from '../../@core/data/models/vehicle';

@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['100size.scss','../autocompleter-nebular-adapt.scss'],
})
export class MapsComponent {

  constructor (
    protected positionService: PositionService,
    protected dateService: NbDateService<Date>,
    protected mapboxService: MapboxService,
    protected vehicleService: VehicleService,
  ) {
    this.today = this.dateService.today();
  }

  private map: L.Map;

  protected radioSelection: string = 'fleet';
  protected dateStart: Date;
  protected dateEnd: Date;
  protected currentVehicle: Vehicle;

  protected layerGroup;

  protected vehicleResults;
  protected today: Date;

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
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.getGlobalPos();
  }

  protected onbutton(event) {
    this.getHistoric(event.dateend, event.datestart, event.vehicle);
  }
  protected onchange(event) {
    if(this.radioSelection == 'fleet'){
      this.getGlobalPos();
    }
  }

  protected getGlobalPos() {
    return this.positionService.search('getLastOfEach'/*, {params: [{key: 'name', value: name}]}*/).subscribe(
      res => {
        this.layerGroup.clearLayers();
        var group = []

        res.forEach( pos => {
          let marker = L.marker([pos.lat, pos.lon], {
            icon: this.getIcon(),
            rotationAngle: pos.course,
          }).addTo(this.layerGroup);

          group.push(marker);

          var popup = L.tooltip({permanent: true})
            .setContent(
              '<b>' + pos.vehicle.plate + '</b>&nbsp;(' + pos.vehicle.brand + '&nbsp;' + pos.vehicle.model + ')'
              + '<b><br>Satelites</b>: ' + pos.satellites
              + '<b><br>Velocidad</b>: ' + (pos.speed * 1.82)
              + '<b><br>Fecha</b>: ' + this.dateService.format(new Date(pos.date),'dd/MM/yyyy hh:mm:ss')
            )
            marker.bindTooltip(popup).openTooltip();
        })

        this.map.fitBounds((new L.featureGroup(group)).getBounds());
      }
    );
  }

  protected getHistoric(dateend: Date, datestart: Date, vehicle: Vehicle) {
    this.positionService.search('getPeriod', {params: [
      {key: 'dateStart', value: datestart.toString()},
      {key: 'dateEnd', value: dateend.toString()},
      {key: 'vehicleId', value: vehicle.id},
    ]})
    .subscribe(
      res => {
        this.layerGroup.clearLayers();
        var group = [];

        this.splitArrayByDate(res).forEach(
         day => {
            let dayPositions = this.interpolatePositions(day, Math.min(95, day.length));

            this.mapboxService.snapToRoads(dayPositions).subscribe(
              data => {
                this.drawPathLine(data.matchings);
              }
            );
          }
        );

        res.forEach(pos => {
          let marker = L.marker([pos.lat, pos.lon], {
            icon: this.getIcon(),
            rotationAngle: pos.course,
          }).addTo(this.layerGroup);

          group.push(marker);

          var popup = L.tooltip()
            .setContent(
              + '<b><br>Satelites</b>: ' + pos.satellites
              + '<b><br>Velocidad</b>: ' + (pos.speed * 1.82).toFixed()
              + '<b><br>Fecha</b>: ' + this.dateService.format(new Date(pos.date),'dd/MM/yyyy hh:mm:ss')
            )
            marker.bindTooltip(popup);
        });

        this.map.fitBounds((new L.featureGroup(group)).getBounds());
      }
    );
  }

  private getDate(date): string {
    let ret = date.toString().split('T')[0];
    return ret;
  }

  protected splitArrayByDate(input: Position[]): Array<Position[]> {
    let dayArrays: Array<Position[]> = [];
    let currentDate = '';
    let currentDayIndex: number = -1

    for (let i = 0; i < input.length; i++) {
      if (currentDate != this.getDate(input[0].date)){
        dayArrays.push([]); currentDayIndex++; currentDate=this.getDate(input[0].date);
      }
      dayArrays[currentDayIndex].push(input[i]);
    }

    return dayArrays;
  }

  protected drawPathLine(matchings) {
    let maxGeom = matchings[0];
    for (let ixj = 0 ; ixj < matchings.length ; ixj++) {
      if (matchings[ixj].confidence > maxGeom.confidence) {
        maxGeom = matchings[ixj];
      }
    }
    L.polyline(polyline.decode(maxGeom.geometry, 6), {color:
        '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      }).addTo(this.layerGroup);
  }

  protected getIcon(){
    return L.icon({
      iconUrl: '/assets/images/markerArrow.png',
      iconSize:     [40, 40],
      iconAnchor:   [20, 20],
      popupAnchor:  [-80, 0]
  });
  }

  protected linearInterpolate(before: Position, after: Position, atPoint): Position {
    let p: Position = new Position();
    p.lat = before.lat + (after.lat - before.lat) * atPoint;
    p.lon = before.lon + (after.lon - before.lon) * atPoint;
    p.satellites = before.satellites + (after.satellites - before.satellites) * atPoint;
    p.speed = before.speed + (after.speed - before.speed) * atPoint;
    p.vehicle = before.vehicle;
    p.course = before.course + (after.course - before.course) * atPoint;
    let beforedate = new Date(before.date).getTime();
    let afterdate = new Date(after.date).getTime();
    p.date = new Date(beforedate + (afterdate - beforedate) * atPoint);
    return p;
  };

  protected interpolatePositions(data: Position[], fitCount): Position[] {
    let newData: Position[] = [];
    let springFactor: number = Math.floor((data.length - 1) / (fitCount - 1));
    newData[0] = data[0];
    for ( let i = 1; i < fitCount - 1; i++) {
      let tmp = i * springFactor;
      let before = Math.floor(tmp);
      let after = Math.ceil(tmp);
      let atPoint = tmp - before;
      newData[i] = this.linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1];
    //console.debug(newData);
    return newData;
  };

}

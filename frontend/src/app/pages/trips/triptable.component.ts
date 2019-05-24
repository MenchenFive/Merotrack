import { Component, OnInit, ɵConsole, TemplateRef, ViewChild } from '@angular/core';
import { Vehicle, VehicleService } from '../../@core/models/vehicle';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { IncidenceService, VehicleIncidencesTableServerDataSource, Incidence } from '../../@core/models/incidence';
import { Observable } from 'rxjs';
import { ElipsisPipe } from '../../@core/pipes/elipsis.pipe';
import { TripTableServerDataSource, Trip, TripService } from '../../@core/models/trip';
import { TripStageService } from '../../@core/models/tripstage';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet/dist/images/marker-icon.png';

@Component({
  selector: 'ngx-trip-table',
  templateUrl: './triptable.component.html',
  styleUrls: ['../autocompleter-nebular-adapt.scss'],
})
export class TripTableComponent implements OnInit {

  @ViewChild('dialog') dialog;

  protected today: Date;
  private DATEFORMAT = 'dd/MM/yyyy';

  protected currentTrEdit:  Trip = null ;
  protected currentTr:      Trip = Trip.newNull() ;

  protected vehicleResults:   Observable<Vehicle[]>;

  constructor(
    protected vehicleService: VehicleService,
    protected tripService: TripService,
    protected tripStageService: TripStageService,
    protected source: TripTableServerDataSource,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
  ) {
  }

  sortByDateFrom() {
    this.source.setSort([{ field: 'dateStart', direction: 'desc' }], true);
  }

  ngOnInit(): void {
    this.sortByDateFrom();
  }

  onDelete(event): void {
    if (window.confirm('Deseas eliminar el viaje?\nEsta acción es irreversible')) {
      this.tripService.delete(event.data);
    }
  }

  onAdd(event): void{
    this.dialogService.open(this.dialog , { context: null } );
  }

  onEditTable(event): void{
    this.dialogService.open(this.dialog , { context: null } );
  }

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

  settings = {
    mode: 'external',
    hideSubHeader: false,
    noDataMessage: 'Sin viajes que cumplan los criterios de busqueda',
    pager: {
      display: true,
      perPage: 10, // Items per page
    },
    actions: {
      edit: true,
      delete: true,
      add: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      vehicle: {
        title: 'Vehiculo',
        type: 'string',
        editable: false,
        valuePrepareFunction: (v: Vehicle) => {
            return v.plate;
        },
      },
      title: {
        title: 'Concepto',
        type: 'html',
        editable: false,
        valuePrepareFunction: (title,row) => {
          let elipsistitle = new ElipsisPipe().transform(title,45);
          return `<span title="${elipsistitle}:\n${row.description}">${elipsistitle}</span>`;
        }
      },
      dateStart: {
        title: 'From',
        type: 'string',
        filter: false,
        editable: false,
        valuePrepareFunction: (date: Date) => {
          return this.dateService.format(date, this.DATEFORMAT);
        },
      },
      dateEnd: {
        title: 'To',
        type: 'string',
        filter: false,
        editable: false,
        valuePrepareFunction: (date: Date) => {
          return this.dateService.format(date, this.DATEFORMAT);
        },
      },
    },
  };
}

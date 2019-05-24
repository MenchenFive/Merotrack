import { Component, OnInit, ɵConsole, TemplateRef, ViewChild } from '@angular/core';
import { Vehicle, VehicleService } from '../../@core/data/models/vehicle';
import { NbDateService, NbDialogService } from '@nebular/theme';
import { IncidenceService, VehicleIncidencesTableServerDataSource, Incidence } from '../../@core/data/models/incidence';
import { Observable } from 'rxjs';
import { ElipsisPipe } from '../../@core/data/pipes/elipsis.pipe';
import { TripTableServerDataSource, Trip, TripService } from '../../@core/data/models/trip';
import { TripStageService, TripStage } from '../../@core/data/models/tripstage';
import { MaproutingdialogComponent } from './maproutingdialog/maproutingdialog.component';

@Component({
  selector: 'ngx-trip-table',
  templateUrl: './triptable.component.html',
  styleUrls: ['../autocompleter-nebular-adapt.scss'],
})
export class TripTableComponent implements OnInit {

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
    this.dialogService.open(MaproutingdialogComponent, {
      context: {
        item: TripStage.newNull(),
      },
    });
  }

  onEditTable(event): void{
    this.dialogService.open(MaproutingdialogComponent, {
      context: {
        item: event.data,
      },
    });
  }

  settings = {
    mode: 'external',
    hideSubHeader: false,
    noDataMessage: 'Sin viajes que cumplan los criterios de busqueda',
    pager: {
      display: true,
      perPage: 10, // Items per page
    },
    actions: {
      edit: false,
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

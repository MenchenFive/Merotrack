import { Component, OnInit, ɵConsole } from '@angular/core';
import { Vehicle, VehicleService } from '../../@core/data/models/vehicle';
import { NbDateService } from '@nebular/theme';
import { IncidenceService, VehicleIncidencesTableServerDataSource, Incidence } from '../../@core/data/models/incidence';
import { Observable } from 'rxjs';
import { ElipsisPipe } from '../../@core/data/pipes/elipsis.pipe';


@Component({
  selector: 'ngx-incidence-table',
  templateUrl: './incidencetable.component.html',
  styleUrls: ['../autocompleter-nebular-adapt.scss'],
})
export class IncidenceTableComponent implements OnInit {

  protected today: Date;
  private DATEFORMAT = 'dd/MM/yyyy';

  protected currentInEdit:  Incidence = null;
  protected currentIn:      Incidence = Incidence.newNull();

  protected vehicleResults:   Observable<Vehicle[]>;

  constructor(
    protected vehicleService: VehicleService,
    protected incidenceService: IncidenceService,
    protected dateService: NbDateService<Date>,
    protected source: VehicleIncidencesTableServerDataSource,
  ) {
    this.today = this.dateService.today();
    this.refreshTable();
  }

  refreshTable(): void {
    this.source.refresh();
  }

  sortByDateFrom() {
    this.source.setSort([{ field: 'dateStart', direction: 'desc' }], true);
  }


  ngOnInit(): void {
    this.sortByDateFrom();
  }

  onSubmit(event) {
    this.form2table();
    this.onButtonCancel(null);
  }

  onButtonCancel(event) {
    this.currentInEdit = null;
    this.currentIn = Incidence.newNull();
  }

  form2table() {
    if (this.currentInEdit) {
      this.incidenceService.update(this.currentIn).subscribe(
        res => { this.refreshTable(); }
      );
    }else{
      this.incidenceService.create(this.currentIn).subscribe(
        res => { this.refreshTable(); }
      );
    }

  }

  table2form(tabledata: any) {
    if (typeof tabledata.dateStart === 'string') {
      tabledata.dateStart = this.dateService.parse(tabledata.dateStart, this.DATEFORMAT);
      tabledata.dateEnd = this.dateService.parse(tabledata.dateEnd, this.DATEFORMAT);
    }
    this.currentInEdit = tabledata;
    this.currentIn = tabledata;
  }

  search(event) {
    this.vehicleResults = this.vehicleService.search(
        'findByPlateIgnoreCaseContaining',
        {params: [{key: 'plate', value: event.query}]},
    )
  }

  onDelete(event): void {
    if (window.confirm('Deseas eliminar la incidencia?')) {
      this.incidenceService.delete(event.data).subscribe( res => this.source.refresh() );
      this.onButtonCancel(event);
    }
  }

  onEditTable(event) {
    if(this.currentInEdit)
      this.onButtonCancel(null);
    this.table2form(event.data);
  }

  settings = {
    mode: 'external',
    hideSubHeader: false,
    noDataMessage: 'Sin incidencias que cumplan los criterios de busqueda',
    pager: {
      display: true,
      perPage: 6, // Items per page
    },
    actions: {
      edit: true,
      delete: true,
      add: false,
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

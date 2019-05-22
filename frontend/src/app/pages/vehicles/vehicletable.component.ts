import { Component } from '@angular/core';
import { Vehicle, VehicleService, VehicleTableServerDataSource } from '../../@core/models/vehicle';
import { Incidence, IncidenceService, VehicleIncidencesTableServerDataSource } from '../../@core/models/incidence';
import { Observable } from 'rxjs';
import { NbDateService } from '@nebular/theme';
import { ElipsisPipe } from '../../@core/pipes/elipsis.pipe';

@Component({
  selector: 'ngx-vehicle-table',
  templateUrl: './vehicletable.component.html',
})
export class VehicleTableComponent {


  protected today: Date;
  private DATEFORMAT = 'dd/MM/yyyy';

  protected currentInEdit:  Incidence = null;
  protected currentIn:      Incidence = Incidence.newNull();

  protected vehicleResults:   Observable<Vehicle[]>;

  constructor(
    protected vehicleService: VehicleService,
    protected dateService: NbDateService<Date>,
    protected source: VehicleTableServerDataSource,
  ) {
    this.today = this.dateService.today();
    this.refreshTable();
  }

  refreshTable(): void {
    this.source.refresh();
    this.source.reset();
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
    /*if (this.currentInEdit) {
      this.incidenceService.update(this.currentIn).subscribe(
      );
    }else{
      this.incidenceService.create(this.currentIn).subscribe(
      );
    }*/
    this.refreshTable();
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
      //this.incidenceService.delete(event.data);
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
      perPage: 10, // Items per page
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
      plate: {
        title: 'Matricula',
        type: 'string',
      },
      brand: {
        title: 'Marca',
        type: 'string',
      },
      model: {
        title: 'Modelo',
        type: 'string',
      },
    },
  };
}

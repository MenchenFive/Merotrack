import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

import { Person } from '../../../../@core/model/person';
import { EditMode } from '../cv-person-editor.component';
import { PersonExperience } from '../../../../@core/model/person-experiences';
import { Company, CompanyService } from '../../../../@core/model/company';

@Component({
  selector: 'ngx-cv-ped-experiences',
  templateUrl: './cv-ped-experiences.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  styleUrls: ['../../../forms/form-inputs/form-inputs.component.scss',
              '../../../forms/form-layouts/form-layouts.component.scss',
              './autocompleter-nebular-adapt.scss'],
})
export class CvPedExperiencesComponent implements OnInit {

  private readonly DATEFORMAT: string = 'dd/MM/yyyy';

  @Output() experiencesChange = new EventEmitter<PersonExperience[]>();
  @Input() experiences:   PersonExperience[];

  @Input() mode:          EditMode;
  protected modes:        typeof EditMode;

  protected currentPeEdit:  PersonExperience = null;
  protected currentPe:      PersonExperience = PersonExperience.newNull();

  protected today: Date;
  protected companyResults//:   Observable<Company[]>;

  protected source: LocalDataSource = new LocalDataSource(this.experiences);

  constructor(
    protected companyService: CompanyService,
    protected dateService: NbDateService<Date>,
  ) {
    this.today = this.dateService.today();
    this.modes = EditMode;
  }

  udpateExperiences() {
    this.source.getAll().then(
      items => {
        this.experiences = items;
        this.experiencesChange.emit(this.experiences);
      }
    );
  }

  ngOnInit(): void {
    if (this.mode !== EditMode.Add){

      this.experiences.map(item => {
        item.dateEnd = new Date(item.dateEnd);
        item.dateStart = new Date(item.dateStart);
      });

      this.source.load(this.experiences);

    }

    const isViewing: boolean = EditMode.View === this.mode;
    this.settings.actions.delete = !isViewing;
    this.settings.actions.edit = !isViewing;
    this.settings = this.settings;

    this.sortByDateFrom();
  }

  sortByDateFrom() {
    this.source.setSort([{ field: 'dateStart', direction: 'desc' }], true);
  }

  onSubmit(event) {
    if (this.currentPeEdit) {
      this.source.remove(this.currentPeEdit);
    }
    this.form2table();

    this.onButtonCancel(null);
    this.sortByDateFrom();
  }

  onButtonCancel(event) {
    this.currentPeEdit = null;
    this.currentPe = PersonExperience.newNull();
  }

  form2table() {
    this.source.add(this.currentPe);
    this.udpateExperiences();
  }

  table2form(tabledata: any) {

    this.currentPe = new PersonExperience(
      tabledata.id,
      tabledata.role,
      tabledata.description,
      tabledata.dateStart,
      tabledata.dateEnd,
      tabledata.company,
    );

  }

  search(event) {
    /*this.companyResults = this.companyService.search(
        'findByNameIgnoreCaseContaining',
        {params: [{key: 'name', value: event.query}]},
    )/*.subscribe(
        data => {
          this.companyResults = data;
        }
    );*/
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditTable(event) {
    if(this.currentPeEdit)
      this.onButtonCancel(null);
    this.currentPeEdit = event.data;
    this.table2form(event.data);
  }

  settings = {
    mode: 'external',
    hideSubHeader: true,
    noDataMessage: 'No experiences',
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
      role: {
        title: 'As role:',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      dateStart: {
        title: 'From',
        type: 'string',
        editable: false,
        valuePrepareFunction: (date: Date) => {
          return this.dateService.format(date, this.DATEFORMAT);
        },
      },
      dateEnd: {
        title: 'To',
        type: 'string',
        editable: false,
        valuePrepareFunction: (date: Date) => {
          return this.dateService.format(date, this.DATEFORMAT);
        },
      },
      company: {
        title: 'Company',
        type: 'string',
        editable: false,
        valuePrepareFunction: (company: { name: any; }) => {
          return company.name;
        },
      },
    },
  };

}

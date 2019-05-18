import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CvPersonEditorComponent, EditMode } from '../cv-person-editor/cv-person-editor.component';
import { CurriculumRoutingModule } from '../curriculum-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Person, PersonService, PersonTableServerDataSource } from '../../../@core/model/person';
import { PersonExperience } from '../../../@core/model/person-experiences';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './cv-person-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class CVPersonTableComponent implements OnInit {

  settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10, // Items per page
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
      confirmDelete: true,
    },
    columns: { // Columns
      name: {
        title: 'First Name',
        type: 'string',
      },
      surname1: {
        title: 'Middle Name',
        type: 'string',
      },
      surname2: {
        title: 'Last Name',
        type: 'string',
      },
      phone1: {
        title: 'Phone 1',
        type: 'string',
      },
      email: {
        title: 'E-Mail',
        type: 'string',
      },
    },
  };

  constructor(
    protected personService: PersonService,
    protected source: PersonTableServerDataSource,
    private router: Router,
    private route: ActivatedRoute) {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {

  }

  onEdit(event): void {
    this.personService.get(event.data.id, [{value: 'fullPersonProjection', key: 'projection'}]).subscribe(
      data => {
        this.router.navigate(
          ['../editor'], {
            state: {
              person: data,
              mode: EditMode.Edit,
            },
            relativeTo: this.route,
          }
        );
      },
    );
  }

  onAdd(event): void {
    this.router.navigate(
      ['../editor'], {
        state: {
          person: new Person(),
          mode: EditMode.Add,
        },
        relativeTo: this.route,
      }
    );
  }

  onClick(event): void {
    this.personService.get(event.data.id, [{value: 'fullPersonProjection', key: 'projection'}]).subscribe(
      data => {
        this.router.navigate(
          ['../editor'], {
            state: {
              person: data,
              mode: EditMode.View
            },
            relativeTo: this.route,
          }
        );
      },
    );
  }

}

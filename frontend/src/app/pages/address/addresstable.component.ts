import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';

import { User, UserTableServerDataSource, UserService } from '../../@core/data/models/user';

@Component({
  selector: 'ngx-address-table',
  templateUrl: './addresstable.component.html',
})
export class AddressTableComponent {


  protected today: Date;
  protected DATEFORMAT = 'dd/MM/yyyy';
  protected PLATEREGEX = '([0-9]{4}[A-Za-z]{3})|([A-Za-z]{1,2}[0-9]{4}[A-Za-z]{1,2})';

  protected currentVe:      User = User.newNull();

  protected isAdmin: boolean = false;

  constructor(
    protected userService: UserService,
    protected source: UserTableServerDataSource,
  ) {
    this.refreshTable();
  }
  refreshTable(): void {
    this.source.refresh();
  }

  sortByDateFrom() {
    this.source.setSort([{ field: 'email', direction: 'desc' }], true);
  }


  ngOnInit(): void {
    this.sortByDateFrom();
  }

  onSubmit(event) {
    console.debug("isadmin: "+this.isAdmin);
    this.form2table();
  }

  form2table() {
    this.currentVe.role = (this.isAdmin) ? 'admin' : 'standard';
      this.userService.create(this.currentVe).subscribe(
        res => {
          this.refreshTable();
          this.isAdmin=false;
        }
      );
  }

  onDelete(event): void {
    if (window.confirm('Deseas eliminar el usuario?')) {
      this.userService.delete(event.data).subscribe( res => this.source.refresh() );
    }
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
      edit: false,
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
      name: {
        title: 'Nombre',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      role: {
        title: 'Rol',
        type: 'string',
      },
    },
  };
}

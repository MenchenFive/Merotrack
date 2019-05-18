import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Person } from '../../../@core/model/person';
import { DocumentTypeService, DocumentType } from '../../../@core/model/document-type';
import { Observable } from 'rxjs';

export enum EditMode { Add, Edit, View }

@Component({
  selector: 'ngx-user-edit-dialog',
  templateUrl: './cv-person-editor.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class CvPersonEditorComponent implements OnInit {

  person: Person;
  mode: EditMode = EditMode.Edit;
  public EditModes = EditMode;

  //protected doctypes: Observable<DocumentType[]>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    //protected documentTypeService: DocumentTypeService,
  ) {

    //this.doctypes = documentTypeService.getAll();

    const state: any = this.route.paramMap.pipe(
      map(() => window.history.state),
    );

    state.subscribe(s => {
      if (!s.person) {
        this.mode = EditMode.Add;
        this.person = Person.newNull();
      } else {
        this.mode = s.mode;
        this.person = s.person;
      }
    })

  };

  /*// ESTO ES MUY SUCIO, CAMBIAR
  onDoctypeSelect(event){
    (!!event) ? this.findDocTypeById(event) : this.person.documentType = event ;
  }

  // ESTO ES MUY SUCIO, CAMBIAR
  findDocTypeById(i: number) {
    this.documentTypeService.get(i).subscribe(
      data => { this.person.documentType = data; }
    );
  }*/

  testdebug(){
    console.debug(this.person.documentType);
  }

  ngOnInit(): void { }



}

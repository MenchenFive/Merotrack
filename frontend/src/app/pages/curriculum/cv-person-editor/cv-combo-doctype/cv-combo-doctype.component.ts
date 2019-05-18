import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnChanges, AfterViewChecked } from '@angular/core';

import { Observable } from 'rxjs';
import { DocumentType, DocumentTypeService } from '../../../../@core/model/document-type';



@Component({
  selector: 'ngx-cv-combo-doctype',
  templateUrl: './cv-combo-doctype.component.html',
  styleUrls: [],
  styles: ['/deep/ select.form-control{max-height:3rem;}'],
})
export class CvComboDoctypeComponent implements OnInit {

  protected doctypes: Array<DocumentType>;

  @Input() isDisabled: boolean;

  @Input() selected:   DocumentType;
  @Output() selectedChange: EventEmitter<DocumentType> = new EventEmitter<DocumentType>();

  protected selectedId;

  constructor(
    private service: DocumentTypeService,
  ) { }

  async ngOnInit() {
    await this.loadData();
    this.selectedId = (!!this.selected) ? this.selected.id : 0;
  }

  onDoctypeSelect(event){
    this.emitChange(event);
  }

  async loadData(){
    await this.service.getAll().toPromise().then( result => { this.doctypes = result; } );
  }

  emitChange(i) {
    if (this.selectedId > 0) {
      this.service.get(this.selectedId).subscribe(
        data => {
          this.selected=data
          this.selectedChange.emit(this.selected);
        },
      );
    } else {
      this.selected=null;
      this.selectedChange.emit(this.selected);
    }
  }



}

/*import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnChanges, AfterViewChecked } from '@angular/core';

import { Observable } from 'rxjs';
import { LanguageCertificate, LanguageCertificateService } from '../../../../@core/model/languageCertificates';




@Component({
  selector: 'ngx-cv-combo-language-certificate',
  template: `<select class="form-control"
  name="sel"
  [(ngModel)]="selectedId"
  (ngModelChange)="onDoctypeSelect($event)"
  [disabled]="isDisabled"
>
<option [ngValue]="0">None</option>
<option *ngFor="let dt of doctypes" [ngValue]="dt.id">{{dt.name}}</option>
</select>
`,
  styleUrls: [],
  styles: ['/deep/ select.form-control{max-height:3rem;}'],
})
export class CvComboLanguageCertificateComponent implements OnInit {

  protected doctypes: Array<LanguageCertificate>;

  @Input() isDisabled: boolean;

  @Input() selected:   LanguageCertificate;
  @Output() selectedChange: EventEmitter<LanguageCertificate> = new EventEmitter<LanguageCertificate>();

  protected selectedId;

  constructor(
    private service: LanguageCertificateService,
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
*/

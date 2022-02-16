import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';
import { IItemModel } from '../../models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IItemModel, private api: ApiService, private facade: FacadeService) { }

  ngOnInit(): void {

  }
  
  updateItem(id: number, data: IItemModel) {
    this.api.updateItem(id, data).subscribe();
    this.facade.getItems();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemModel } from '../../models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IItemModel, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

  }
  
  updateItem(id: number, data: IItemModel) {
    this.dialogRef.close(data);
  }

}

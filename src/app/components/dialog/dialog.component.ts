import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItemModel } from '../../models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IItemModel, 
    private dialogRef: MatDialogRef<DialogComponent>, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.data.id,
      name: this.data.name,
      type: this.data.type,
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

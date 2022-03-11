import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IItemModel } from 'src/app/models';
import { map, switchMap } from 'rxjs/operators'
import { FacadeService } from 'src/app/services/facade.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { strTransform } from 'src/app/utils';
import { CreateComponent } from '../create/create.component';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'type', 'delete', 'update'];
  items$!: Observable<IItemModel[]>;
  constructor(private readonly facade: FacadeService, private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.facade.getItems();
    this.items$ = this.facade.items$.pipe(
      switchMap(items => this.route.queryParams
        .pipe(
          map(param => items.filter(item => {
            return strTransform(item.name, param.name) && strTransform(item.type, param.type)
            
              // strTransform(item.name).includes(strTransform(param.name)) &&
              // strTransform(item.type).includes(strTransform(param.type))
          })
          )
        )
      ));
  }

  deleteItem(id: number) {
    this.facade.deleteItem(id);
  }

  async openDialog(item: IItemModel) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = item;
    dialogConfig.width = '300px';
    
    const dialogRef: MatDialogRef<DialogComponent, IItemModel> = this.dialog.open(DialogComponent, dialogConfig);
    const data = await dialogRef.afterClosed().toPromise()
    if (data && typeof data !== 'undefined' && (data.name !== item.name || data.type !== item.type)) {
      this.facade.updateItem(data); 
    }
    // .then(data => {
    //   if (data && typeof data !== 'undefined' && (data.name !== item.name || data.type !== item.type)) {
    //     this.facade.updateItem(data);
    //   }
    // });
  }

  async createItem() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = '300px';
    
    const dialogRef: MatDialogRef<CreateComponent> = this.dialog.open(CreateComponent, dialogConfig);
    const data = await dialogRef.afterClosed().toPromise()
    if (data && typeof data !== 'undefined') {
      this.facade.createItem(data); 
    }
  }

  ngOnDestroy() { }

}

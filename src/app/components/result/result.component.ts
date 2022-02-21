import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IItemModel } from 'src/app/models';
import { map, switchMap, tap } from 'rxjs/operators'
import { FacadeService } from 'src/app/services/facade.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { strTransform } from 'src/app/utils';


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
            return strTransform(item.name).includes(strTransform(param.name)) &&
              strTransform(item.type).includes(strTransform(param.type))
          })
          )
        )
      ));
  }

  deleteItem(id: number) {
    this.facade.deleteItem(id);
  }

  async openDialog(item: IItemModel) {
    const dialogRef: MatDialogRef<DialogComponent, IItemModel> = this.dialog.open(DialogComponent, { data: item });
    await dialogRef.afterClosed().toPromise().then(res => {
      if (res) {
        return this.facade.updateItem(res);
      }
    }
    );

  }

  ngOnDestroy() { }

}

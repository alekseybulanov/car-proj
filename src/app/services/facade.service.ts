import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  private _getItemsRequest = new Subject<void>();
  private _deleteItemRequest = new Subject<number>();

  get items$() {
    return this.storage.storageService;
  }

  constructor(
    private readonly api: ApiService,
    private readonly storage: StorageService
  ) {
    this._getItemsRequest.asObservable().pipe(
      switchMap(() => this.api.getItems()),
      tap((items) => this.storage.loadItems(items))
    ).subscribe(console.log);
    this._deleteItemRequest.asObservable().pipe(
    //  tap(itemId => this.storage.deleteItems(itemId)),
    //   switchMap((itemId) => this.api.deleteItem(itemId)),
      tap(itemId => this.api.deleteItem(itemId)),
      tap(itemId => this.storage.deleteItems(itemId))
    ).subscribe(console.log);


  }

  getItems() {
    this._getItemsRequest.next();
  }

  deleteItem(itemId: number) {
    this._deleteItemRequest.next(itemId);
  }

}

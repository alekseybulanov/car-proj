import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IItemModel } from '../models';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  private _getItemsRequest = new Subject<void>();
  private _deleteItemRequest = new Subject<number>();
  private _updateItemRequest = new Subject<IItemModel>();
  private _createItemRequest = new Subject<IItemModel>();

  get items$() {
    return this.storage.storageData;
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
      tap(itemId => this.api.deleteItem(itemId)),
      tap(itemId => this.storage.deleteItem(itemId))
    ).subscribe(console.log);
    this._updateItemRequest.asObservable().pipe(
      tap(item => this.api.updateItem(item.id, item)),
      tap(item => this.storage.updateItem(item))
    ).subscribe(console.log);
    this._createItemRequest.asObservable().pipe(
      tap(item => this.api.createItem(item)),
      tap(item => this.storage.createItem(item))
    ).subscribe(console.log);
  }

  getItems() {
    this._getItemsRequest.next();
  }

  deleteItem(itemId: number) {
    this._deleteItemRequest.next(itemId);
  }

  updateItem(item: IItemModel) {
    this._updateItemRequest.next(item); 
  } 
  createItem(item: IItemModel) {
    this._createItemRequest.next(item);
  }

}

import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IItemModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {
  
  private _storageData = new BehaviorSubject<IItemModel[]>([]);
  storageData = this._storageData.asObservable();

  ngOnInit() { }

  loadItems(items: IItemModel[]) {
    this._storageData.next(items);
  }

  deleteItem(itemId: number) {
    const newItems = this._storageData.getValue().filter(item => itemId !== item.id);
    this._storageData.next(newItems);
  }

  updateItem(item: IItemModel) {
    const newItems = this._storageData.getValue().map(storageItem => storageItem.id === item.id ? item : storageItem);
    this._storageData.next(newItems);
  }

  createItem(item: IItemModel) {
    const newItems = this._storageData.getValue();
    newItems.push(item);
    this._storageData.next(newItems);
  }
  
}

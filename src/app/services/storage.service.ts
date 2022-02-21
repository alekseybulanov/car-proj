import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItemModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {
  
  private _storageService = new BehaviorSubject<IItemModel[]>([]);
  storageService = this._storageService.asObservable();

  ngOnInit() { }

  loadItems(items: IItemModel[]) {
    this._storageService.next(items);
  }

  deleteItem(itemId: number) {
    const newItems = this._storageService.getValue().filter(item => itemId !== item.id);
    this._storageService.next(newItems);
  }

  updateItem(item: IItemModel) {
    const newItems = this._storageService.getValue().map(storageItem => storageItem.id === item.id ? item : storageItem);
    this._storageService.next(newItems);
  }
  
}

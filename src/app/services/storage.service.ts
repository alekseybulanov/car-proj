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

  deleteItems(itemId: number) {
    this._storageService.next(this._storageService.getValue().filter(item => itemId !== item.id));
    console.log('deleted:',itemId);
  }
  
}

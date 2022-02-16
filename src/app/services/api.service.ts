import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItemModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ITEMS_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<IItemModel[]>(this.ITEMS_URL);
  }
  getItem(itemId: number) {
    return this.http.get<IItemModel>(`${this.ITEMS_URL}/${itemId}`);
  }
  updateItem(itemId: number, payload: IItemModel) {
    return this.http.put<IItemModel>(`${this.ITEMS_URL}/${itemId}`, payload);
  }
  deleteItem(itemId: number) {
    return this.http.delete<void>(`${this.ITEMS_URL}/${itemId}`);
  }
  createItem(payload: IItemModel) {
    return this.http.post<IItemModel>(this.ITEMS_URL, payload);
  }
}

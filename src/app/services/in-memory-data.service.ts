import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {
        id: 1,
        name: 'Audi',
        type: 'sedan'
      },
      {
        id: 2,
        name: 'BMW',
        type: 'coupe'
      },
      {
        id: 3,
        name: 'Toyota',
        type: 'suv'
      },
      {
        id: 4,
        name: 'Nissan',
        type: 'truck'
      },
      {
        id: 5,
        name: 'Tesla',
        type: 'electric'
      },
      {
        id: 6,
        name: 'Mazda',
        type: 'crossover'
      },
      {
        id: 7,
        name: 'Toyota',
        type: 'suv'
      },
      {
        id: 8,
        name: 'Audi',
        type: 'sedan'
      },
      {
        id: 9,
        name: 'BMW',
        type: 'coupe'
      },
      {
        id: 10,
        name: 'Tesla',
        type: 'electric'
      }
    ];
    return {items};
  }
}

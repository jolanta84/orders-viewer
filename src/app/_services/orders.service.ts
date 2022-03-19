import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url: string = 'https://jolanta84.github.io/orders-json-api/orders.json';

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<Order[]>(this.url);
  }
}

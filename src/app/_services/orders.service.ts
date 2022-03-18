import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private url: string = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<Order[]>(this.url);
  }
}

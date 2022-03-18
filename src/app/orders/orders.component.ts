import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Order } from '../_models/order';
import { OrdersService } from '../_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public orders!: Order[];
  public displayedColumns: string[] = [
    'name',
    'status',
    'createdAt',
    'boxesCount',
  ];
  public dataSource = new MatTableDataSource<Order>();
  public statuses = ['Open', 'Closed', 'In transit'];
  public form = new FormGroup({
    status: new FormControl(),
  });

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private ordersService: OrdersService) {}

  public ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.ordersService
      .getAll()
      .pipe(first())
      .subscribe(
        (orders) => (
          (this.orders = orders), (this.dataSource.data = orders as Order[])
        )
      );

    this.dataSource.filterPredicate = (
      data: Order,
      filter: string
    ): boolean => {
      const obj = JSON.parse(filter);
      let find: boolean = obj.status;

      return obj.status
        ? (find = find && obj.status.indexOf(data.status) >= 0)
        : true;
    };

    this.form.valueChanges.subscribe((res) => {
      this.dataSource.filter = JSON.stringify(res);
    });
  }
  public isChecked(field: string, value: string) {
    const control = this.form.get(field);
    return control && control.value && control.value.indexOf(value) >= 0;
  }

  public change(list: any[], field: string, value: string, isChecked: boolean) {
    const control = this.form.get(field);
    const oldValue = control ? control.value || [] : [];
    if (control) {
      if (!isChecked) {
        const newValue = oldValue.filter((x: string) => x != value);
        control.setValue(newValue.length > 0 ? newValue : null);
      } else {
        const newValue = list.filter(
          (x) => oldValue.indexOf(x) >= 0 || x == value
        );
        control.setValue(newValue);
      }
    }
  }
}

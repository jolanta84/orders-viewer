import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  public openSnackBar(message: string) {
    this.matSnackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snack-style'],
    });
  }
}

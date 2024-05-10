import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomAlertService {

  constructor(private snackBar: MatSnackBar) {}

  errorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3 * 1000,
    });
  }

  errorSnakBarNotAutoClose(message: string) {
    this.snackBar.open(message, 'Close');
  }

  genericErrorMessage() {
    this.snackBar.open('Something went wrong!', 'Close', {
      duration: 3 * 1000,
    });
  }

  successSnackBar( message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3 * 1000,
    });
  }

  successSnackBarNotAutoClose(message: string) {
    this.snackBar.open(message, 'Close');
  }
}

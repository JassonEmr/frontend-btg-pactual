import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/user.service';
import { FundService } from 'src/app/services/fund.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-subscribe-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.css']
})
export class SubscribeDialogComponent {
  user: any;
  fund: any;
  email: string = '';
  fondo: string = '';
  balance: number = 0;
  nombre: string = '';
  minAmountRequired: number;
  canSubscribe: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string, fund: any }, private dialogRef: MatDialogRef<SubscribeDialogComponent>,
    private userService: UserService, private fundService: FundService, private snackBar: MatSnackBar) {
    this.fund = data.fund;
    this.minAmountRequired = this.fund.minimumAmount;
  }

  ngOnInit(): void {
    this.userService.existUser(this.data.email).subscribe(userData => {
      this.user = userData;
      this.balance = this.user.balance;
    });

    this.fundService.getFundById(this.data.fund.id).subscribe(fundData => {
      this.fund = fundData;
    });
  }

  subscribe() {
    this.fundService.createSubscription(this.user.id, this.data.fund.id).subscribe(resp => {
      this.openSnackBar(resp.message, 'Cerrar');
      this.dialogRef.close();
    }, error => {
      this.openSnackBar(error.error.message, 'Cerrar');
      this.dialogRef.close();
    })}


  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }


}



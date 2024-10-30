import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';
import { RegisterComponent } from '../register/register.component';
import { FundService } from 'src/app/services/fund.service';

@Component({
  selector: 'app-validation-email',
  templateUrl: './validation-email.component.html',
  styleUrls: ['./validation-email.component.css']
})
export class ValidationEmailComponent {

  email: string = '';
  fundId: string;

  constructor(private dialogRef: MatDialogRef<ValidationEmailComponent>,
    private userService: UserService,
    private fundService: FundService,
    @Inject(MAT_DIALOG_DATA) public data: { fundId: string },
    private dialog: MatDialog) {
    this.fundId = data.fundId;
  }

  checkUser() {
    this.userService.existUser(this.email).subscribe(exists => {
      this.dialogRef.close();
      if (exists) {

        this.fundService.getFundById(this.fundId).subscribe(fund => {
          this.dialog.open(SubscribeDialogComponent, { data: {fund, email: this.email} });
        })


      } else {
        // Abre el diálogo de registro
        this.dialog.open(RegisterComponent, { data: { email: this.email } });
      }
    });
  }

}

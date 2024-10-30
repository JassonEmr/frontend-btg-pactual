import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fund } from 'src/app/models/fund';
import { FundService } from 'src/app/services/fund.service';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';
import { ValidationEmailComponent } from '../validation-email/validation-email.component';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  data:Fund[] = [];

  constructor(private fundService: FundService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.fundService.getFunds().subscribe(
      (response: Fund[]) => {
          this.data = response;
          console.log(this.data)
      },
      (error) => {
        console.log(`se presento el error ${error}`)
      }
    );
  }

  openEmailValidationDialog(fundId: string) {
    this.dialog.open(ValidationEmailComponent, {data:{fundId}});
  }
}

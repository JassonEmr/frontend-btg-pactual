import { Component, ViewChild  } from '@angular/core';
import { User } from 'src/app/models/user';
import { FundService } from 'src/app/services/fund.service';
import { UserService } from 'src/app/services/user.service';

import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-history-funds-user',
  templateUrl: './history-funds-user.component.html',
  styleUrls: ['./history-funds-user.component.css']
})
export class HistoryFundsUserComponent {
  displayedColumns: string[] = ['id', 'fundName', 'transactionType', 'amount', 'date', 'status'];
  email: string = '';
  userId: string = '';
  transactions: any[] = [];
  paginatedTransactions: any[] = [];
  errorMessage: string = '';
  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;



  constructor(private userService: UserService, private fundService: FundService) { }

  getTransactionsByUserId() {
    this.userService.existUser(this.email).subscribe(exist => {
      const user = exist as { id: string };
      this.userId = user.id;

      this.fundService.getTransactionsByUser(user.id).subscribe(transactionsUser => {
        this.transactions = transactionsUser;
        this.length = this.transactions.length;
        this.paginateTransactions();
        this.errorMessage = '';
      }, error => {
        this.transactions = [];
        this.errorMessage = 'Error al cargar las transacciones';
      });
    }, error => {
      this.transactions = [];
      this.errorMessage = 'Usuario no encontrado.';
    });
  }

  paginateTransactions() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedTransactions = this.transactions.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getTransactionsByUserId(); // Reload transactions if needed
  }
}

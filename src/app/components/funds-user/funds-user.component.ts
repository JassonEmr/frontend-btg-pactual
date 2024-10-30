import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundService } from 'src/app/services/fund.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-funds-user',
  templateUrl: './funds-user.component.html',
  styleUrls: ['./funds-user.component.css']
})
export class FundsUserComponent {

  email: string = '';
  userId: string = '';
  funds: any[] = [];
  errorMessage: string = '';
  msgSuccessfull: string = '';

  constructor(private userService: UserService, private fundService: FundService, private snackBar: MatSnackBar) { }

  getFundsByUser() {
    this.userService.existUser(this.email).subscribe(exist => {
      const user = exist as { id: string };
      this.userId = user.id;

      this.fundService.getFundsByUser(this.userId).subscribe(fundsUser => {
        console.log(fundsUser);
        this.funds = fundsUser;
      }, error => {
        this.funds = [];
        this.errorMessage = 'Error al cargar las transacciones';
      })
    }, error => {
      this.funds = [];
      this.errorMessage = 'Usuario no encontrado.';
    })
  }

  cancelSubs(fundId: string){
    this.userService.existUser(this.email).subscribe(exist => {
      const user = exist as { id: string };
      this.userId = user.id;

      this.fundService.cancelSubcription(this.userId, fundId).subscribe(fundsUser => {
        this.openSnackBar(fundsUser.message, 'Cerrar');
      }, error => {
        this.errorMessage = 'Error al cancelar el fondo';
        this.openSnackBar(this.errorMessage, 'Cerrar');
        this.funds = [];
      })
    }, error => {
      this.errorMessage = 'Usuario no encontrado.';
      this.openSnackBar(this.errorMessage, 'Cerrar');
      this.funds = [];
    })

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}

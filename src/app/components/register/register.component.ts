import { Component, EventEmitter,  Inject,  Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  private _snackBar = inject(MatSnackBar);

  user:User = {
    name: '',
    email: '',
    phone: ''
  }

  constructor(public dialogRegister: MatDialogRef<RegisterComponent>, private userService: UserService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { email: string }){}

  onRegister(){

    if (!this.user.phone.startsWith('+57')) {
      this.user.phone = '+57' + this.user.phone;
    }

    this.userService.register(this.user).subscribe(
      response => {
        this.openSnackBar("Usuario creado con exito", "cerrar")
        this.dialogRegister.close();
      },
      error => {
        this.openSnackBar("No se pudo crear el usuario", "cerrar")
        this.dialogRegister.close();
      }
    )
  }

  openSnackBar(message:string, action:string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onNoClick(): void {
    this.dialogRegister.close();
  }

}

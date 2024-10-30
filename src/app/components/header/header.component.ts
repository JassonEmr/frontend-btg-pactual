import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '600px',
      height:'400px',
      maxWidth:'100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
      // Puedes manejar el resultado aquí si lo necesitas
    });
  }

}

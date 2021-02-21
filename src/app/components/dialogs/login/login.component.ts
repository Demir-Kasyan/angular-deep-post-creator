import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../services/account.service';
import {RegisterComponent} from '../register/register.component';
import {RemoveComponent} from "../remove/remove.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpClient]
})
export class LoginComponent {
  idAccount: number;
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>, public ass: AccountService) {
    dialogRef.disableClose = true;
  }

  register(): void {
    this.dialog.open(RegisterComponent, {
      width: '14.5%'
    });
  }
  remove(): void{
    this.dialog.open(RemoveComponent, {
      width: '14.5%'
    });
  }
}

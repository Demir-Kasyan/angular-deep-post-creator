import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(public dialogRef: MatDialogRef<RegisterComponent>, public ass: AccountService){
    dialogRef.disableClose = true;
  }

  createAccount(): boolean {
   return this.ass.register(this.usernameFormControl.value, this.passwordFormControl.value);
  }
}

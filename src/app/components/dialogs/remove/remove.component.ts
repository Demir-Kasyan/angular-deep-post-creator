import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../services/account.service';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent {
  idAccount: number;
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public acs: AccountService) {
  }
}

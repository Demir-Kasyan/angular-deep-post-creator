import {Component, OnInit} from '@angular/core';
import {FileSystemService} from 'src/app/components/services/filesysystem.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../components/dialogs/login/login.component';
import {DiaryComponent} from '../../components/dialogs/diary/diary.component';
import {LibComponent} from '../../components/dialogs/lib/lib.component';
import {AccountService} from "../../components/services/account.service";
import {DiaryService} from "../../components/services/diary.service";

@Component({
  selector: 'main-rout',
  templateUrl: './main.rout.html',
  styleUrls: ['./main.rout.css'],
})
export class MainRout implements OnInit {

  constructor(public dialog: MatDialog, public fs: FileSystemService, public ass: AccountService, private ds: DiaryService) {
    fs.init();
  }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.ngOnInit();
      }
      else {
        this.ds.buildDiary();
      }
    });
  }
  logOut(): void{
    this.ass.logOut();
    this.ngOnInit();
  }
  getDiary(): void {
    this.dialog.open(DiaryComponent, {
      width: '50%'
    });
  }

  getLib(): void {
    this.dialog.open(LibComponent, {
      width: '50%'
    });
  }
}

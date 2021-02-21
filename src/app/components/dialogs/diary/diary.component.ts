import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {DiaryService} from '../../services/diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  constructor(public ass: AccountService, public ds: DiaryService) {
  }

  ngOnInit(): void {
    this.ass.getActiveAccount().diary = this.ds.buildDiary();
  }
}

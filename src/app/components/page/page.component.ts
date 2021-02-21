import {Component, ViewEncapsulation} from '@angular/core';
import {Module} from 'src/app/interfaces/module.interface';
import {FileSystemService} from '../services/filesysystem.service';
import {SubPage} from '../../interfaces/subpage.interface';
import {AccountService} from '../services/account.service';
import {Theme} from '../../interfaces/theme.interface';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent {
  path: string;
  modules: Module[];

  constructor(private fs: FileSystemService, private acc: AccountService) {
    fs.modules.subscribe(value => {
      this.modules = value;
    });
  }

  getTestResult(sub: SubPage, mod: Module, thm: Theme): void {
    let result = sub.pointForTest / sub.content
      .filter(x => 'rightAnswer' in x.inside && x.inside.clientAnswer ===
        x.inside.rightAnswer).length;
    result = result === Infinity ? 1 : result;
    const chapter = this.acc.getActiveAccount().diary.courses
      .filter(course => course.name === mod.title)[0]
      .chapters.filter(chapt => chapt.name === thm.title)[0];
    if (sub.result > 0) {
        chapter.re_points += result;
        chapter.re_result = (chapter.re_points / 200) * 12;
        sub.re_results = result;
        alert('Тест перепройденно на ' + result + ' балів!');
    }
    else {
      chapter.points += result;
      chapter.result = (chapter.points / 200) * 12;
      sub.result = result;
      alert('Тест пройдено на ' + result + ' балів!');
    }
    this.acc.getActiveAccount().diary.courses
      .filter(course => course.name === mod.title)[0]
      .chapters.filter(chapt => chapt.name === thm.title)[0] = chapter;
    this.acc.saveAccounts();
  }
  isRead(thm: Theme, mod: Module): boolean{
    const index = this.acc.getActiveAccount()?.diary?.courses
      .filter(course => course.name === mod.title)[0]
      ?.chapters?.indexOf(this.acc.getActiveAccount()?.diary?.courses
      .filter(course => course.name === mod.title)[0]
      ?.chapters
      ?.filter(chapter => chapter.name === thm.title)[0]);
    return index === 0 ? false :
      this.acc.getActiveAccount()?.diary?.courses
        .filter(course => course.name === mod.title)[0]
        ?.chapters[index - 1]?.points === 0;
  }
}

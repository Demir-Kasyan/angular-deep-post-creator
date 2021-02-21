import {Injectable} from '@angular/core';
import {DiaryInterface} from '../../interfaces/diary.interface';
import {FileSystemService} from './filesysystem.service';
import {AccountService} from './account.service';

@Injectable({
    providedIn: 'root'
  }
)
export class DiaryService {
  constructor(private ass: AccountService, private fs: FileSystemService) {
  }
  buildDiary(): DiaryInterface {
    console.log(this.ass.getActiveAccount().diary);
    this.fs.modules.subscribe(x => {
      x?.filter(module => module.isCourse)
        .filter(module => !this.ass.getActiveAccount().diary.courses.map(course => course.id).includes(module.title, 0))
        .forEach(module => {
          this.ass.getActiveAccount().diary.courses.push({
            id: module.title,
            name: module.title,
            chapters: []
          });
        });
      x?.filter(module => module.isCourse)
        .forEach(module => {
          this.ass.getActiveAccount().diary.courses
            .filter(course => (course.chapters.length < module.themes.length) && (module.title === course.name))
            .map(course => {
              module.themes
                .filter(theme => !course.chapters.map(chapter => chapter.name).includes(theme.title, 0))
                .forEach(theme => {
                  course.chapters.push(
                    {
                      name: theme.title,
                      points: 0,
                      result: 0,
                      re_points: 0,
                      re_result: 0,
                    }
                  );
                });
              return course;
            });
        });
    });
    return this.ass.getActiveAccount().diary;
  }
}

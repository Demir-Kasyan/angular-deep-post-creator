import {ChapterInterface} from './chapter.interface';

export interface DiaryInterface{
  id: number;
  courses?: [{
    id: string;
    name: string;
    chapters?: ChapterInterface[];
  }];
}

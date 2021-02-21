import {DiaryInterface} from './diary.interface';

export interface AccountInterface{
  id: number;
  username: string;
  password: string;
  diary: DiaryInterface;
}

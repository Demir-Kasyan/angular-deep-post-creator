import {Test} from './test.interface';

export interface Content{
    type: string;
    inside: string | Test;
}

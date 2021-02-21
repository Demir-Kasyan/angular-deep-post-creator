import { Content } from './content.interface';

export interface SubPage{
    number: number;
    title: string;
    content: Content[];
    isTestPage: boolean;
    pointForTest?: number;
    result?: number;
    re_results?: number;
}

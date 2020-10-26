import { Theme } from './theme.interface';

export interface Module{
    title: string,
    back: any | string,
    themes: Theme[]
}
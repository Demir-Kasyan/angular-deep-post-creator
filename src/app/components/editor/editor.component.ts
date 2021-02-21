import {HttpClient} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {Module} from 'src/app/interfaces/module.interface';

import {Theme} from 'src/app/interfaces/theme.interface';
import {Page} from 'src/app/interfaces/page.interface';
import {SubPage} from 'src/app/interfaces/subpage.interface';
import {Content} from 'src/app/interfaces/content.interface';
import {FileSystemService} from '../services/filesysystem.service';
import {UnderPage} from 'src/app/interfaces/underpage.interface';
import {Test} from '../../interfaces/test.interface';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [HttpClient]
})
export class EditorComponent {
  path: string;
  mdl: number;
  thm: number;
  pg: number;
  undrpg: number;
  sbpg: number;
  rmmdl: number;
  rmthm: number;
  rmpg: number;
  rmundrpg: number;
  rmsbpg: number;
  newModule: string;
  modules: Module[];
  fs: any;
  newTheme: string;
  newPageTest: boolean;
  newPage: string;
  newUnderPage: string;
  newSubPage: string;
  newContent: string;
  newTestContent: Test = {
    qw: '',
    answA: '',
    answB: '',
    answV: '',
    answG: '',
    rightAnswer: ''
  };
  typeContent: string;
  changedComponents: any[];
  newPageTestPoint: number;
  newModuleCourse: boolean;

  constructor(private fss: FileSystemService) {
    fss.modules.subscribe(value => {
      this.modules = value;
    });
    this.path = fss.path;
  }

  changeComps(comps: any): void {
    this.changedComponents = comps;
  }

  createModule(): void {
    this.modules.push(
      {
        title: this.newModule,
        themes: [],
        isRead: false,
        isCourse: this.newModuleCourse
      } as Module
    );
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removeModule(): void {
    this.modules = this.modules.filter((x, y) => this.rmmdl != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  createTheme(): void {
    this.modules[this.mdl - 1].themes.push(
      {
        title: this.newTheme,
        pages: [],
        isRead: false
      } as Theme
    );
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removeTheme(): void {
    this.modules[this.mdl - 1].themes =
      this.modules[this.mdl - 1].themes.filter((x, y) => this.rmthm != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  createPage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages.push(
      {
        title: this.newPage,
        underpages: []
      } as Page
    );
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removePage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages =
      this.modules[this.mdl - 1].themes[this.thm - 1].pages.filter((x, y) => this.rmpg != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  createUnderpage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages.push(
      {
        title: this.newUnderPage,
        subpages: [],
        isRead: false
      } as UnderPage
    );
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removeUnderPage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages =
      this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages.filter((x, y) => this.rmundrpg != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  createSubPage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages.push(
      {
        title: this.newSubPage,
        number: this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages.length + 1,
        content: [],
        isTestPage: this.newPageTest,
        pointForTest: this.newPageTestPoint
      } as SubPage
    );
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removeSubPage(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages =
      this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages.filter((x, y) => this.rmsbpg != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  createContent(): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages[this.sbpg - 1].content.push(
      {
        type: this.typeContent,
        inside: this.typeContent !== 'test' ? this.newContent : this.newTestContent,
        isRead: false
      } as unknown as Content
    );
    this.newTestContent = {
      qw: '',
      answA: '',
      answB: '',
      answV: '',
      answG: '',
      rightAnswer: ''
    };
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  removeContent(rm: number): void {
    this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages[this.sbpg - 1].content =
      this.modules[this.mdl - 1].themes[this.thm - 1].pages[this.pg - 1].underpages[this.undrpg - 1].subpages[this.sbpg - 1].content.filter((x, y) => rm != y);
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }

  changeContent(): void {
    this.fss.modules.next(this.modules);
    this.fss.saveModules();
  }
}

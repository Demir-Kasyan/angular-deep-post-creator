import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/interfaces/module.interface';

import { ElectronService } from 'ngx-electron';
import { Theme } from 'src/app/interfaces/theme.interface';
import { Page } from 'src/app/interfaces/page.interface';
import { SubPage } from 'src/app/interfaces/subpage.interface';
import { Content } from 'src/app/interfaces/content.interface';
import { FileSystemService } from '../services/filesysystem.service';
import { UnderPage } from 'src/app/interfaces/underpage.interface';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [HttpClient]
})
export class EditorComponent implements OnInit {
  __dirname: string;
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
  newPage: string;
  newUnderPage: string;
  newSubPage: string;
  newContent: any;
  typeContent: string;
  changedComponents: any[];
  constructor(){}
  ngOnInit(): void {
   FileSystemService.modules.subscribe(value=>{
      this.modules = value;
      
   });
   __dirname = FileSystemService.__dirname;
  }
  changeComps(comps: any){
    this.changedComponents = comps;
  }
  createModule(){
    this.modules.push(
      {
        title: this.newModule,
        themes: []
      } as Module
    );
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removeModule(){
    this.modules = this.modules.filter((x,y)=>this.rmmdl!=y);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  createTheme(){
    this.modules[this.mdl-1].themes.push(
      {
        title: this.newTheme,
        pages: []
      } as Theme
    );
    console.log(this.modules);

    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removeTheme(){
    this.modules[this.mdl-1].themes = this.modules[this.mdl-1].themes.filter((x,y)=>this.rmthm!=y);
    console.log(this.rmthm);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  createPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages.push(
      {
        title: this.newPage,
        underpages: []
      } as Page
    );
    console.log(this.modules);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removePage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages = this.modules[this.mdl-1].themes[this.thm-1].pages.filter((x,y)=>this.rmpg!=y);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  createUnderpage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages.push(
      {
        title: this.newUnderPage,
        subpages: []
      } as UnderPage
    );
    console.log(this.modules);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removeUnderPage(){
    console.log(this.modules);
    console.log(this.rmundrpg);
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages = this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages.filter((x,y)=>this.rmundrpg!=y);
    console.log(this.modules);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  createSubPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages.push(
      {
        title: this.newSubPage,
        number: this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages.length+1,
        content: []
      } as SubPage
    );
    console.log(this.modules);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removeSubPage(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages = this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages.filter((x,y)=>this.rmsbpg!=y);
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  createContent(){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages[this.sbpg-1].content.push(
      {
        type: this.typeContent,
        inside: this.newContent
      } as Content
    );
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  removeContent(rm: number){
    this.modules[this.mdl-1].themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages[this.sbpg-1].content = this.modules[this.mdl-1].
        themes[this.thm-1].pages[this.pg-1].underpages[this.undrpg-1].subpages[this.sbpg-1].content.filter((x,y)=>rm!=y);
    FileSystemService.modules.next(this.modules);
        FileSystemService.saveModules();
  }
  changeContent(){
    FileSystemService.modules.next(this.modules);
    FileSystemService.saveModules();
  }
  

}

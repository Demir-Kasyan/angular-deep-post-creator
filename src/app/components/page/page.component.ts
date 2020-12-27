import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Module } from 'src/app/interfaces/module.interface';
import { FileSystemService } from '../services/filesysystem.service';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit {
  __dirname: string;
  modules: Module[];
  constructor(){}
  ngOnInit(): void {
    FileSystemService.modules.subscribe(value=>{
      this.modules = value;
   });
   __dirname = FileSystemService.__dirname;
  }
}

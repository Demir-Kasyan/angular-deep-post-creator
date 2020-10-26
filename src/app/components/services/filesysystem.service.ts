import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject } from 'rxjs';
import { Module } from 'src/app/interfaces/module.interface';

@Injectable()
export class FileSystemService{
    public _ES: ElectronService;
    public _HTTP: HttpClient
    constructor(_http: HttpClient, _electronService: ElectronService){
        this._ES = _electronService;
        this._HTTP = _http; 
    }
    private static fss: FileSystemService;
    private static fs: any;
    static modules = new BehaviorSubject<Module[]>(null);
    static init(fss: FileSystemService){
        this.fss = fss;
        this.fs = this.fss._ES.remote.require('fs');
        this.getModules();
    }
    static saveModules(){
        if (this.fss) return;
        this.fs.writeFile("src/assets/base.json", JSON.stringify(this.modules.getValue()), "utf-8", (error, data) => {
          if (error){
              alert('Somethings wrong with .json base file :(\n Send me logs please:/');
          }
        });
    }
    static getModules(){
        this.fss._HTTP.get("assets/base.json").subscribe((value)=>{
            this.modules.next(value as []);
         });
    }
}
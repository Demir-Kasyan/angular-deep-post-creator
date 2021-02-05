import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BehaviorSubject } from 'rxjs';
import { Module } from 'src/app/interfaces/module.interface';

@Injectable()
export class FileSystemService{
    public _ES: ElectronService;
    public _HTTP: HttpClient;
    constructor(_http: HttpClient, _electronService: ElectronService){
        this._ES = _electronService;
        this._HTTP = _http;
    }
    private static fss: FileSystemService;
    private static fs: any;
    static __dirname: string;
    static modules = new BehaviorSubject<Module[]>(null);
    static init(fss: FileSystemService){
        this.fss = fss;
        this.__dirname = fss._ES.remote.process.resourcesPath;
        this.fs = this.fss._ES.remote.require('fs');
        this.getModules();
    }
    static saveModules(): void{
         this.fs.writeFile('resources/app/src/assets/base.json', JSON.stringify(this.modules.getValue()), "utf-8", (error, data) => {
           if (error){
               alert('Somethings wrong with .json base file :(\n Send me logs please:/');
               console.log(error);
          }
        });
    }
    static getModules(): void{
        this.modules.next([]);
        this.fs.readFile('resources/app/src/assets/base.json', 'utf-8', (err, data) => {
             if (err){
                 alert('Somethings wrong with .json base file :(\n Send me logs please:/');
                 this.modules.next([]);
                 return;
             }
             this.modules.next(JSON.parse(data) as []);
         });
    }
}

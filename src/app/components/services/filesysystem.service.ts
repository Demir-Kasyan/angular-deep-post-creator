import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {BehaviorSubject} from 'rxjs';
import {Module} from 'src/app/interfaces/module.interface';
import {AccountInterface} from '../../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
  }
)
export class FileSystemService {
  path: string;

  constructor(private electronService: ElectronService) {
  }
  private  fs: any;
  modules = new BehaviorSubject<Module[]>(null);
  accounts = new BehaviorSubject<AccountInterface[]>(null);

  init(): void {
    this.fs = this.electronService.remote.require('fs');
    // // this.path =
    this.getModules();
    this.getAccount();
  }

  saveModules(): void {
     this.fs.writeFile('resources/app/src/assets/base.json', JSON.stringify(this.modules.getValue()), 'utf-8', (error, data) => {
       if (error){
           alert('Somethings wrong with .json base file :(\n Send me logs please:/');
           console.log(error);
      }
    });
  }

  getModules(): void {
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
  getAccount(): void {
    this.fs.readFile('resources/app/src/assets/accounts.json', 'utf-8', (err, data) => {
      if (err){
        alert('Somethings wrong with .json base file :(\n Send me logs please:/');
        this.accounts.next([]);
        return;
      }
      this.accounts.next(JSON.parse(data) as []);
    });
  }
  saveAccount(account: AccountInterface[]): void {
    this.fs.writeFile('resources/app/src/assets/accounts.json', JSON.stringify(account), 'utf-8', (error, data) => {
      if (error){
        alert('Somethings wrong with .json base file :(\n Send me logs please:/');
        console.log(error);
      }
    });
  }
}

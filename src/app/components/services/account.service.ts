import {Injectable} from '@angular/core';
import {AccountInterface} from '../../interfaces/account.interface';
import {FileSystemService} from './filesysystem.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: AccountInterface[];
  private active: AccountInterface;

  constructor(private fs: FileSystemService) {
    fs.accounts.subscribe(value => {
      this.accounts = value;
    });
  }

  public getAccounts(): AccountInterface[] {
    return this.accounts;
  }

  public getActiveAccount(): AccountInterface {
    return this.active;
  }

  public logIn(pass: string, account: number): boolean {
    if (pass === undefined || pass === '') {
      return false;
    }
    if (this.accounts?.filter(x => x.id === account)[0]?.password !== pass) {
      return false;
    }
    this.active = this.accounts?.filter(x => x.id === account)[0];
    return true;
  }

  public logOut(): boolean {
    this.accounts.filter(z => z.id === this.active.id)[0] = this.active;
    this.fs.saveAccount(this.accounts);
    return this.active = undefined;
  }

  public register(value: any, pass: any): boolean {
    if (this.accounts.filter(x => x.username === value).length > 0) {
      return false;
    }
    this.accounts.push({
      id: this.accounts.length + 1,
      username: value,
      password: pass,
      // @ts-ignore
      diary: {id: this.accounts.length + 1, courses: []}
    });
  }

  public remove(id: number, password: string): boolean {
    if (this.accounts.filter(x => x.id === id)[0].password === password) {
      this.accounts = this.accounts.filter(x => x.id !== id);
      this.fs.saveAccount(this.accounts);
      return true;
    }
    return false;
  }

  saveAccounts(): void {
    this.accounts.filter(x => x.id === this.active.id)[0] = this.active;
    this.fs.saveAccount(this.accounts);
  }
}

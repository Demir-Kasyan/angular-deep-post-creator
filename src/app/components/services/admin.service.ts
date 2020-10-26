import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AdminService{
    private static password = 'QWERASDZXC';
    static admin = new BehaviorSubject(false);
    static isAdmin(pass: string){
        this.admin.next(this.password===pass);
    }
}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AdminService } from 'src/app/components/services/admin.service';
import { FileSystemService } from 'src/app/components/services/filesysystem.service';

@Component({
  selector: 'main-rout',
  templateUrl: './main.rout.html',
  styleUrls: ['./main.rout.css'],
  providers: [HttpClient,ElectronService, FileSystemService]
})
export class MainRout implements OnInit {
  ispass: string;
  isAdmin: boolean;
  constructor(private http: HttpClient, private _electronService: ElectronService){
    FileSystemService.init(new FileSystemService(http,_electronService));
    AdminService.admin.subscribe(value=>{
      this.isAdmin = value;
    })
  }
  ngOnInit(): void {

  }
  submit(){
    AdminService.isAdmin(this.ispass);
  }
}

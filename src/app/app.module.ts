import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainRout } from './routs/main/main.rout';

import { PageComponent } from './components/page/page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.design';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/editor/editor.component';

import { NgxElectronModule } from 'ngx-electron';
import { LinkPipe } from './components/page/link.pipe';
@NgModule({
  declarations: [
    MainRout, PageComponent, EditorComponent, LinkPipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, CommonModule, NgxElectronModule,
    BrowserAnimationsModule, MaterialModule
  ],
  providers: [],
  bootstrap: [MainRout]
})
export class AppModule { }

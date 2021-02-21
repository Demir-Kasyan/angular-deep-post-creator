import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {MainRout} from './routs/main/main.rout';

import {PageComponent} from './components/page/page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.design';
import {HttpClientModule} from '@angular/common/http';
import {EditorComponent} from './components/editor/editor.component';

import {NgxElectronModule} from 'ngx-electron';
import {LinkPipe} from './components/page/link.pipe';
import {LoginComponent} from './components/dialogs/login/login.component';
import {DiaryComponent} from './components/dialogs/diary/diary.component';
import {LibComponent} from './components/dialogs/lib/lib.component';
import {RegisterComponent} from './components/dialogs/register/register.component';
import {RemoveComponent} from './components/dialogs/remove/remove.component';

@NgModule({
  declarations: [
    MainRout, PageComponent, EditorComponent, LinkPipe,
    LoginComponent, DiaryComponent, LibComponent, RegisterComponent,
    RemoveComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, CommonModule, NgxElectronModule,
    BrowserAnimationsModule, MaterialModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MainRout]
})
export class AppModule {
}


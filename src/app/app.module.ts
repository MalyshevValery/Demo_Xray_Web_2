import 'zone.js';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatDividerModule, MatToolbarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { ImageBrowserComponent } from './image-browser/image-browser.component';
import { ImageAnalyseComponent } from './image-analyse/image-analyse.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageBrowserComponent,
    ImageAnalyseComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatDividerModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

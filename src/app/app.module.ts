import 'zone.js';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatDividerModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

import {ImageBrowserComponent} from './image-browser/image-browser.component';
import {ImageAnalyseComponent} from './image-analyse/image-analyse.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreComponent} from './image-analyse/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageBrowserComponent,
    ImageAnalyseComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
